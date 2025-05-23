"use server";

import {
  NewResourceParams,
  createResourceSchema,
  resources as resourcesTable,
} from "@/libs/db/schema/resources";
import { db } from "../db";
import { embeddings as embeddingsTable } from "@/libs/db/schema/embedding";
import { generateEmbeddings } from "@/libs/ai/embedding";

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = createResourceSchema.parse(input);

    // TODO need to add errors

    const [resource] = await db
      .insert(resourcesTable)
      .values({ content })
      .returning();

    console.log("resource", resource);

    const embeddings = await generateEmbeddings(content);

    console.log("generated embeddings", embeddings);

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
