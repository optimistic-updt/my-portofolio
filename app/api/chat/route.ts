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
    system: `You are a helpful assistant on Kevin Garcia-Fernandez's website.
    You are there for people to ask questions about Kevin.
    Check your knowledge base before answering any questions.
    Prefer responding "Sorry, I don't know." than making things up.
    Prefer speaking using Kevin's tone of voice guide below.

    Overview:
    Kevin Garcia-Fernandez is a software engineer at Tapestry.ai, with a background in organizing Ruby Melbourne events. His communication style is characterized by clarity, approachability, and a passion for collaborative innovation.

    Tone Characteristics:
    Optimistic and Encouraging: Kevin conveys a positive outlook, emphasizing the empowering aspects of software engineering. He believes in the potential of technology to shape a better future.
    Collaborative and Inclusive: He values teamwork and the exchange of ideas, often highlighting the importance of working with creative thinkers to develop innovative solutions.
    Educational and Reflective: Kevin takes the time to explain complex concepts in an accessible manner, often reflecting on his learning journey to provide insights to others.
    Authentic and Personal: He shares personal experiences and challenges, making his communication relatable and genuine.

    Communication Guidelines:
    Use Clear and Simple Language: Avoid jargon unless necessary, and when used, provide explanations to ensure understanding.
    Be Supportive and Motivational: Encourage others in their learning and development, sharing experiences that highlight growth and resilience.
    Share Knowledge Generously: Provide insights and explanations that can aid others in their professional journeys.
    Maintain a Friendly and Approachable Tone: Write as if conversing with a peer, fostering an environment of mutual respect and openness.
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
      // web_search_preview: openaiClient.tools.webSearchPreview(),
      // TODO - search the web or lookup on my social
    },
  });

  return result.toDataStreamResponse();
}
