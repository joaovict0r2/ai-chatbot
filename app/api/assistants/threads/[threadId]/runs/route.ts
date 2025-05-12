import { openai } from "@/lib/openai";

const assistantId = process.env.OPENAI_ASSISTANT_ID!

export async function POST(request: any, { params }: { params: any }) {
  const { threadId } = await params

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId
  })

  return new Response(stream.toReadableStream())
}
