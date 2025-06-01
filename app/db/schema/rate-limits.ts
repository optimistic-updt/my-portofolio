import { sql } from "drizzle-orm";
import {
  varchar,
  integer,
  timestamp,
  pgTable,
  index,
} from "drizzle-orm/pg-core";
import { generateId } from "@/app/utils/id";

export const rateLimits = pgTable(
  "rate_limits",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => generateId()),

    // Identifier for the rate limit (IP address, user ID, etc.)
    identifier: varchar("identifier", { length: 255 }).notNull(),

    // Type of rate limit (e.g., 'chat_per_minute', 'chat_per_hour', 'chat_per_day')
    limitType: varchar("limit_type", { length: 100 }).notNull(),

    // Current count of requests
    requestCount: integer("request_count").notNull().default(1),

    // Window start time for this rate limit period
    windowStart: timestamp("window_start")
      .notNull()
      .default(sql`now()`),

    // When this record was created
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),

    // When this record was last updated
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    // Index for efficient lookups by identifier and limit type
    index("rate_limits_identifier_type_idx").on(
      table.identifier,
      table.limitType,
    ),
    // Index for cleanup of old records
    index("rate_limits_window_start_idx").on(table.windowStart),
  ],
);

export type RateLimit = typeof rateLimits.$inferSelect;
export type NewRateLimit = typeof rateLimits.$inferInsert;
