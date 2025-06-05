"use server";

import {
  NewResourceParams,
  createResourceSchema,
  resources as resourcesTable,
} from "@/app/db/schema/resources";
import { db } from "../db";
import { embeddings as embeddingsTable } from "@/app/db/schema/embedding";
import { generateEmbeddings } from "@/app/ai/embedding";

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = createResourceSchema.parse(input);

    const [resource] = await db
      .insert(resourcesTable)
      .values({ content })
      .returning();

    const embeddings = await generateEmbeddings(content);

    await db.insert(embeddingsTable).values(
      embeddings.map((embedding) => ({
        resourceId: resource.id,
        ...embedding,
      })),
    );

    return "Resource successfully created.";
  } catch (e) {
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : "Error, please try again.";
  }
};
