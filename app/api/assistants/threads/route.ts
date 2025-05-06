import { openai } from "@/lib/openai";

export async function POST() {
  const thread = await openai.beta.threads.create()
  return Response.json({ thread_id: thread.id })
}