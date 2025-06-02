"use server"

import db from "@/lib/db";

export async function addMessageToDatabase(
  chatId: string,
  content: string,
  role: 'USER' | 'ASSISTANT'
) {
  try {
    const newMessage = await db.message.create({
      data: {
        chatId,
        content,
        role
      },
    });

    return {
      success: true,
      message: newMessage
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to add message"
    };
  }
}
