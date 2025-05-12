"use server"

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { Role } from "@/lib/generated/prisma";
import { redirect } from "next/navigation";

// Cria uma hash, atribui a um chat e redireciona para a pagina do chat, com a mensagem ja.
// Faz request criando um chat na tabale de chats, apos redireciona para a page com o id do chat

const appUrl = process.env.NEXT_PUBLIC_APP_URL

export async function newChatAction(_: any, formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: 'Not authenticated' }
  }

  const userId = session.user.id
  const { prompt } = Object.fromEntries(formData)
  const promptString = String(prompt).trim()

  const thread = await fetch(`${appUrl}/api/assistants/threads`, { method: "POST" });
  const { thread_id } = await thread.json();

  const message = await fetch(`${appUrl}/api/assistants/threads/${thread_id}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      content: promptString
    })
  })
  const { message_id } = await message.json();

  const newChat = await db.chat.create({
    data: {
      userId,
      threadId: thread_id,
      title: promptString,
      messages: {
        create: [{
          role: Role.USER,
          content: promptString,
          messageId: message_id
        }]
      }
    },
    include: { messages: true }
  })

  redirect('/chat/' + newChat.id)
}
