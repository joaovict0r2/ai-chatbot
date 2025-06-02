"use server"

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { Role } from "@/lib/generated/prisma";
import { redirect } from "next/navigation";
import { addMessageToDatabase } from "../chat/[id]/_actions/addMessageToDatabase.action";

const appUrl = process.env.NEXT_PUBLIC_APP_URL

export async function newChatAction() {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: 'Not authenticated' }
  }

  const userId = session.user.id

  const thread = await fetch(`${appUrl}/api/assistants/threads`, { method: "POST" });
  const { thread_id } = await thread.json();

  const newChat = await db.chat.create({
    data: {
      userId,
      threadId: thread_id,
      title: 'New Chat',
    }
  })

  redirect('/chat/' + newChat.id)
}
