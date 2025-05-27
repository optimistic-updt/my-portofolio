import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { env } from "@/app/env.mjs";
import { PostHog } from "posthog-node";
import { withTracing } from "@posthog/ai";

const phClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: env.NEXT_PUBLIC_POSTHOG_HOST,
});

const openai = createOpenAI({
  compatibility: "strict", // strict mode, enable when using the OpenAI API
  apiKey: env.OPEN_AI_API_KEY,
});

const model = withTracing(openai("gpt-4.1-mini"), phClient, {
  // posthogDistinctId: "user_123", // optional
  // posthogTraceId: "trace_123", // optional
  // posthogProperties: { conversation_id: "abc123", paid: true }, // optional
});

phClient.shutdown();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Prompt lines
// Only respond to questions using information from tool calls.
// if no relevant information is found in the tool calls, respond, "Sorry, I don't know."

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    system: `You are a helpful assistant on Kevin Garcia-Fernandez's website. You are there for people to ask questions about Kevin.
    Check your knowledge base before answering any questions.
    Prefer responding "Sorry, I don't know." than making things up.
    `,
    messages,
  });

  return result.toDataStreamResponse();
}
