import { openai } from "@/lib/openai";

const assistantId = process.env.OPENAI_ASSISTANT_ID!

export async function POST(request: any, { params }: { params: any }) {
  const { content } = await request.json()
  const { threadId } = await params

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content
  })

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId
  })

  return new Response(stream.toReadableStream())
}