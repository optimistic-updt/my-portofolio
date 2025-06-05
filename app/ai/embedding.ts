import { embed, embedMany } from "ai";
import { sql, cosineDistance, gt, desc } from "drizzle-orm";
import { db } from "../db";
import { embeddings } from "../db/schema/embedding";
import { embeddingModel } from "./openai";

function addOverlapSentenceAware(
  chunks: string[],
  overlapSentences: number = 1,
): string[] {
  if (chunks.length <= 1 || overlapSentences <= 0) {
    return chunks;
  }

  const overlappedChunks: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];

    // Add overlap from previous chunk
    if (i > 0) {
      const prevChunk = chunks[i - 1];
      const prevSentences = extractLastSentences(prevChunk, overlapSentences);
      if (prevSentences) {
        chunk = prevSentences + " " + chunk;
      }
    }

    overlappedChunks.push(chunk);
  }

  return overlappedChunks;
}

function extractLastSentences(text: string, count: number): string {
  const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [];
  if (sentences.length === 0) return "";

  const startIndex = Math.max(0, sentences.length - count);
  return sentences.slice(startIndex).join(" ").trim();
}

type ChunkingOptions = {
  maxChunkSize?: number;
  minChunkSize?: number;
  overlapSize?: number;
};

const generateChunks = (
  text: string,
  options: ChunkingOptions = {},
): string[] => {
  const {
    maxChunkSize = 300,
    minChunkSize = 100,
    overlapSize = 1, // 1 sentence
  } = options;

  // 1. Split by semantic boundaries first
  const sections = text.split(/\n\s*\n|\n---|\n##/); // Double newlines, headers

  const chunks = [];

  // TODO - ⚠️ 2 "for" loop
  for (const section of sections) {
    if (section.length <= maxChunkSize) {
      chunks.push(section.trim());
    } else {
      // 2. Split large sections by sentences
      const sentences = section.match(/[^\.!?]+[\.!?]+/g) || [section];
      let currentChunk = "";

      for (const sentence of sentences) {
        if ((currentChunk + sentence).length <= maxChunkSize) {
          currentChunk += sentence;
        } else {
          if (currentChunk) chunks.push(currentChunk.trim());
          currentChunk = sentence;
        }
      }

      if (currentChunk) chunks.push(currentChunk.trim());
    }
  }

  const overlappedChunks = addOverlapSentenceAware(chunks, overlapSize);

  // 3. Filter out chunks that are too small after overlap
  return overlappedChunks.filter(
    (chunk) => chunk.length >= minChunkSize || chunks.length === overlapSize,
  );
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  return embeddings.map((embedding, index) => ({
    // store the raw chunk
    content: chunks[index],
    // with the corresponding embedding
    embedding,
  }));
};

// ? TODO - why don't we chunk here???
export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  try {
    const userQueryEmbedded = await generateEmbedding(userQuery);

    const similarity = sql<number>`1 - (${cosineDistance(
      embeddings.embedding,
      userQueryEmbedded,
    )})`;

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database query timed out")), 5000),
    );

    const queryPromise = db
      .select({ name: embeddings.content, similarity })
      .from(embeddings)
      .where(gt(similarity, 0.5))
      .orderBy((t) => desc(t.similarity))
      .limit(4);

    const similarGuides = (await Promise.race([
      queryPromise,
      timeoutPromise,
    ])) as Awaited<typeof queryPromise>;

    return similarGuides.length > 0
      ? similarGuides
      : [{ name: "No relevant information found", similarity: 0 }];
  } catch (error) {
    console.error("Error retrieving information:", error);
    return [{ name: "Error retrieving information", similarity: 0 }];
  }
};
