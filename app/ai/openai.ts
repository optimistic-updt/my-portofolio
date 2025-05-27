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

export const chatModel = withTracing(openaiClient("gpt-4.1-mini"), phClient, {
  // posthogDistinctId: "user_123", // optional
  // posthogTraceId: "trace_123", // optional
  // posthogProperties: { conversation_id: "abc123", paid: true }, // optional
});
