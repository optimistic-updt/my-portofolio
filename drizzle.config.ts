import type { Config } from "drizzle-kit";

import { env } from "./libs/env.mjs";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export default {
  schema: "./libs/db/schema",
  out: "./libs/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
