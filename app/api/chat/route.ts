import { streamText, tool } from "ai";
import { z } from "zod";
import { createResource } from "@/app/actions/resources";
import { chatModel } from "@/app/ai/openai";
import { findRelevantContent } from "@/app/ai/embedding";
import { NextResponse } from "next/server";
import { checkMultipleRateLimits, getClientIP } from "@/app/utils/rate-limit";
import { SYSTEM_PROMPTS } from "./prompts";

// Prompt lines to try
// Only respond to questions using information from tool calls.
// if no relevant information is found in the tool calls, respond, "Sorry, I don't know."
// My Social Media accounts are:
// LinkedIn: https://www.linkedin.com/in/kevgarciaf/
// Twitter: https://twitter.com/optimistic_updt

// TODO - have a secret code to know it's me

const addResourceTool = tool({
  description: `add a resource to your knowledge base.
    If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
  parameters: z.object({
    content: z
      .string()
      .describe("the content or resource to add to the knowledge base"),
  }),
  execute: async ({ content }) => createResource({ content }),
});

const getInformationTool = tool({
  description: `get information from your knowledge base to answer questions.`,
  parameters: z.object({
    question: z.string().describe("the users question"),
  }),
  execute: async ({ question }) => {
    try {
      const result = await Promise.race([
        findRelevantContent(question),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Query timed out")), 10000),
        ),
      ]);
      return result;
    } catch (error) {
      console.error("Error in getInformation tool:", error);
      return [
        {
          name: "Error retrieving information from knowledge base",
          similarity: 0,
        },
      ];
    }
  },
});

export async function POST(req: Request) {
  // Get client IP for rate limiting
  const clientIP = getClientIP(req);

  // Check rate limits (per minute, per hour, and per day)
  const rateLimitCheck = await checkMultipleRateLimits(clientIP, [
    "CHAT_PER_MINUTE",
    "CHAT_PER_HOUR",
    "CHAT_PER_DAY",
  ]);

  if (!rateLimitCheck.allowed) {
    // Find the most restrictive limit that was exceeded
    const exceededLimits = Object.entries(rateLimitCheck.results)
      .filter(([, result]) => !result.allowed)
      .map(([type, result]) => ({
        type,
        resetTime: result.resetTime,
      }));

    const nextReset = exceededLimits.reduce((earliest, current) =>
      current.resetTime < earliest.resetTime ? current : earliest,
    );

    return NextResponse.json(
      {
        error: "Rate limit exceeded. Please try again later.",
        resetTime: nextReset.resetTime.toISOString(),
        type: nextReset.type,
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(
            (nextReset.resetTime.getTime() - Date.now()) / 1000,
          ).toString(),
        },
      },
    );
  }

  const { messages } = await req.json();

  const result = streamText({
    messages,
    model: chatModel,
    system: SYSTEM_PROMPTS.CHAT.v2,
    tools: {
      addResource: addResourceTool,
      getInformation: getInformationTool,
      // TODO apparantly can't web search (either way it's on 4o-mini)
      // web_search_preview: openaiClient.tools.webSearchPreview({
      //   userLocation: {
      //     type: "approximate",
      //     country: "Australia",
      //     city: "Melbourne",
      //     region: "Victoria",
      //   },
      // }),
    },
  });

  return result.toDataStreamResponse();
}

// TODO - search the web or lookup on my social
