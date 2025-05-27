import { streamText, tool } from "ai";
import { z } from "zod";
import { createResource } from "@/app/actions/resources";
import { chatModel } from "@/app/ai/openai";
import { findRelevantContent } from "@/app/ai/embedding";

// Prompt lines
// Only respond to questions using information from tool calls.
// if no relevant information is found in the tool calls, respond, "Sorry, I don't know."

// TODO - have a secret code to know it's me

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    messages,
    model: chatModel,
    system: `You are a helpful assistant on Kevin Garcia-Fernandez's website. You are there for people to ask questions about Kevin.
    Check your knowledge base before answering any questions.
    Prefer responding "Sorry, I don't know." than making things up.
    `,
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe("the content or resource to add to the knowledge base"),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
      // TODO - search the web or lookup on my social
    },
  });

  return result.toDataStreamResponse();
}
