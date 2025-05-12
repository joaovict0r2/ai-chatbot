import { openai } from "@/lib/openai";

export async function POST(request: any, { params }: { params: any }) {
  const { content } = await request.json()
  const { threadId } = await params

  const message = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content
  })

  return Response.json({ message_id: message.id })
}
