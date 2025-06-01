import { embed, embedMany } from "ai";
import { sql, cosineDistance, gt, desc } from "drizzle-orm";
import { db } from "../db";
import { embeddings } from "../db/schema/embedding";
import { embeddingModel } from "./openai";

/**
 * todo - experiment with different chunking strategies
 */
const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((entry) => entry !== "");
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
  console.warn("userQuery", userQuery);
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
    ])) as any;

    console.warn("similar guides", similarGuides);
    return similarGuides.length > 0
      ? similarGuides
      : [{ name: "No relevant information found", similarity: 0 }];
  } catch (error) {
    console.error("Error retrieving information:", error);
    return [{ name: "Error retrieving information", similarity: 0 }];
  }
};
