import { embed, embedMany } from "ai";
import { openaiClient } from "./openai";
import { sql, cosineDistance, gt, desc } from "drizzle-orm";
import { db } from "../db";
import { embeddings } from "../db/schema/embedding";

// try out different one
// TODO track price
const embeddingModel = openaiClient.embedding("text-embedding-ada-002");

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
    model: embeddingModel, //TODO track price
    values: chunks,
  });

  return embeddings.map((embedding, index) => ({
    // store the raw chunk
    content: chunks[index],
    // with the corresponding embedding
    embedding,
  }));
};

// ? TODO - why do we chunk here???
export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);

  // that's a LLM OP move
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded,
  )})`;

  const similarGuides = await db
    .select({ name: embeddings.content, similarity })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(4); // ? i think you can increase the limit by more context
  //

  return similarGuides;
};
