import type { Config } from "drizzle-kit";

import { env } from "./app/env.mjs";

if (!process.env.DATABASE_URL_SERVER) {
  throw new Error("DATABASE_URL_SERVER environment variable is not set");
}

export default {
  schema: "./app/db/schema",
  out: "./app/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL_SERVER,
  },
} satisfies Config;
