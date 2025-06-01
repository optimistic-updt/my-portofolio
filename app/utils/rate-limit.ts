import { db } from "@/app/db";
import { rateLimits } from "@/app/db/schema/rate-limits";
import { and, eq, lt, sql } from "drizzle-orm";
import posthog from "posthog-js";

// Rate limit configurations
export const RATE_LIMIT_CONFIGS = {
  CHAT_PER_MINUTE: {
    type: "chat_per_minute",
    limit: 10,
    windowMs: 60 * 1000, // 1 minute
  },
  CHAT_PER_HOUR: {
    type: "chat_per_hour",
    limit: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  CHAT_PER_DAY: {
    type: "chat_per_day",
    limit: 500,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
  },
} as const;

export type RateLimitType = keyof typeof RATE_LIMIT_CONFIGS;

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: Date;
}

/**
 * Check if a request is within rate limits
 * @param identifier - Unique identifier (usually IP address)
 * @param limitType - Type of rate limit to check
 * @returns Promise<RateLimitResult>
 */
export async function checkRateLimit(
  identifier: string,
  limitType: RateLimitType,
): Promise<RateLimitResult> {
  const config = RATE_LIMIT_CONFIGS[limitType];
  const now = new Date();
  const windowStart = new Date(now.getTime() - config.windowMs);

  try {
    // Clean up old records first (optional optimization)
    await db
      .delete(rateLimits)
      .where(
        and(
          eq(rateLimits.limitType, config.type),
          lt(rateLimits.windowStart, windowStart),
        ),
      );

    // Find existing rate limit record for this identifier and type
    const existingRecord = await db
      .select()
      .from(rateLimits)
      .where(
        and(
          eq(rateLimits.identifier, identifier),
          eq(rateLimits.limitType, config.type),
        ),
      )
      .limit(1);

    let currentCount = 0;
    let recordWindowStart = now;

    if (existingRecord.length > 0) {
      const record = existingRecord[0];
      const recordAge = now.getTime() - record.windowStart.getTime();

      if (recordAge < config.windowMs) {
        // Within the current window, increment count
        currentCount = record.requestCount + 1;
        recordWindowStart = record.windowStart;

        await db
          .update(rateLimits)
          .set({
            requestCount: currentCount,
            updatedAt: now,
          })
          .where(eq(rateLimits.id, record.id));
      } else {
        // Outside window, reset count
        currentCount = 1;
        recordWindowStart = now;

        await db
          .update(rateLimits)
          .set({
            requestCount: 1,
            windowStart: now,
            updatedAt: now,
          })
          .where(eq(rateLimits.id, record.id));
      }
    } else {
      // No existing record, create new one
      currentCount = 1;
      recordWindowStart = now;

      await db.insert(rateLimits).values({
        identifier,
        limitType: config.type,
        requestCount: 1,
        windowStart: now,
      });
    }

    const allowed = currentCount <= config.limit;
    const remaining = Math.max(0, config.limit - currentCount);
    const resetTime = new Date(recordWindowStart.getTime() + config.windowMs);

    return {
      allowed,
      limit: config.limit,
      remaining,
      resetTime,
    };
  } catch (error) {
    console.error("Rate limit check failed:", error);

    posthog.capture("rate_limit_error", {
      error: (error as Error).message,
      identifier,
      limitType,
    });

    // In case of database error, allow the request but log the error
    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetTime: new Date(now.getTime() + config.windowMs),
    };
  }
}

/**
 * Get client IP address from request headers
 * @param request - The incoming request
 * @returns string - IP address
 */
export function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  return "127.0.0.1"; // fallback for development
}

/**
 * Check multiple rate limits at once
 * @param identifier - Unique identifier
 * @param limitTypes - Array of rate limit types to check
 * @returns Promise<{ allowed: boolean; results: Record<string, RateLimitResult> }>
 */
export async function checkMultipleRateLimits(
  identifier: string,
  limitTypes: RateLimitType[],
): Promise<{ allowed: boolean; results: Record<string, RateLimitResult> }> {
  const results: Record<string, RateLimitResult> = {};
  let allowed = true;

  for (const limitType of limitTypes) {
    const result = await checkRateLimit(identifier, limitType);
    results[limitType] = result;

    if (!result.allowed) {
      allowed = false;
    }
  }

  return { allowed, results };
}
