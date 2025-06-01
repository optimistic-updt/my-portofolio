import {
  pgTable,
  varchar,
  text,
  timestamp,
  index,
  foreignKey,
  vector,
} from "drizzle-orm/pg-core";

export const resources = pgTable("resources", {
  id: varchar({ length: 191 }).primaryKey().notNull(),
  content: text().notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const embeddings = pgTable(
  "embeddings",
  {
    id: varchar({ length: 191 }).primaryKey().notNull(),
    resourceId: varchar("resource_id", { length: 191 }),
    content: text().notNull(),
    embedding: vector({ dimensions: 1536 }).notNull(),
  },
  (table) => [
    index("embeddingIndex").using(
      "hnsw",
      table.embedding.asc().nullsLast().op("vector_cosine_ops"),
    ),
    foreignKey({
      columns: [table.resourceId],
      foreignColumns: [resources.id],
      name: "embeddings_resource_id_resources_id_fk",
    }).onDelete("cascade"),
  ],
);
