"use server"

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateChatTitle(
  chatId: string,
  content: string
) {
  try {
    await db.chat.update({
      where: { id: chatId },
      data: { title: content }
    })

    revalidatePath(`/chat/${chatId}`, "page")

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: "Failed to update chat title"
    };
  }
}
