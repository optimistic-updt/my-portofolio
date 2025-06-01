import { createOpenAI } from "@ai-sdk/openai";
import { env } from "@/app/env.mjs";
import { PostHog } from "posthog-node";
import { withTracing } from "@posthog/ai";

const phClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: env.NEXT_PUBLIC_POSTHOG_HOST,
});

export const openaiClient = createOpenAI({
  compatibility: "strict", // strict mode, enable when using the OpenAI API
  apiKey: env.OPEN_AI_API_KEY,
});

export const chatModel = withTracing(
  openaiClient("o4-mini"),
  // openaiClient("gpt-4.1-mini"),
  phClient,
  {},
);

/**
 * MAKE SURE YOU USE AN EMBEDDING MODEL WITH 1536 DIMENSIONS not more nor less
 */
export const embeddingModel = openaiClient.embedding("text-embedding-3-small");
