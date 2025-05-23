import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";

// try out different one
const embeddingModel = openai.embedding("text-embedding-ada-002");

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

  const { embeddings, usage } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  console.log("usage", usage);
  console.log("embeddings", embeddings);

  return embeddings.map((embedding, index) => ({
    // store the raw chunk
    content: chunks[index],
    // with the corresponding embedding
    embedding,
  }));
};
