"use server"

import db from "@/lib/db";

export async function updateMessageInDatabase(
  messageId: string,
  content: string
) {
  try {
    await db.message.update({
      where: { id: messageId },
      data: { content }
    })

    return { success: true}
  } catch (error) {
    return {
      success: false,
      error: "Failed to update message"
    };
  }
}
