import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/app/env.mjs";

const client = postgres(env.DATABASE_URL_SERVERLESS, { prepare: false });
export const db = drizzle(client);
