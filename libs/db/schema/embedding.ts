import { index, pgTable, text, varchar, vector } from "drizzle-orm/pg-core";
import { resources } from "./resources";
import { generateId } from "@/libs/utils/id";

export const embeddings = pgTable(
  "embeddings",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => generateId()),
    resourceId: varchar("resource_id", { length: 191 }).references(
      () => resources.id,
      { onDelete: "cascade" },
    ),
    // full text content
    content: text("content").notNull(),
    // vector representation of the `content`
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
  },
  /**
   * To perform similarity search, you also need to include an index (HNSW or IVFFlat) on this column for better performance.
   *
   * @see @link https://github.com/pgvector/pgvector
   */
  (table) => [
    index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  ],
);
