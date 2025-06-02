"use client";

import { FormEvent, useState } from "react";
import { AssistantStream } from "openai/lib/AssistantStream";
import { addMessageToDatabase } from "@/app/(internal)/chat/[id]/_actions/addMessageToDatabase.action";
import { Messages } from "../Messages/Messages";
import ChatInput from "../ChatInput/ChatInput";
import { updateMessageInDatabase } from "@/app/(internal)/chat/[id]/_actions/updateMessageInDatabase.action";
import { updateChatTitle } from "@/app/(internal)/chat/[id]/_actions/updateChatTitle.action";

type Message = {
  id: string;
  chatId: string;
  role: "USER" | "ASSISTANT";
  content: string;
  messageId: string | null;
  runId: string | null;
  fileIds: any[];
  createdAt: Date;
};

interface IChatMessage {
  chatId: string | undefined;
  threadId: string | undefined;
  messages: Message[];
}

export function ChatMessage({ chatId, threadId, messages }: IChatMessage) {
  const [prompt, setPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    const { message } = await addMessageToDatabase(chatId!, prompt, "USER");

    const isTheFirstMessage = !chatMessages.some((chatMessage) => chatMessage.id === message?.id)

    if (isTheFirstMessage) {
      console.log('aqui')
      await updateChatTitle(chatId!, prompt)
    }

    setPrompt("");
    setChatMessages((messages: any) => [
      ...messages,
      { id: message?.id, role: "USER", content: prompt },
    ]);

    handleOpenaiThreadRun();
  }

  const handleOpenaiThreadRun = async () => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          content: prompt,
        }),
      }
    );

    const stream = AssistantStream.fromReadableStream(response.body!);
    handleReadableStrem(stream);
  };

  const handleReadableStrem = (stream: AssistantStream) => {
    let message_id: string | null = null;

    stream.on("textCreated", async () => {
      const { message, success } = await addMessageToDatabase(
        chatId!,
        "",
        "ASSISTANT"
      );

      if (success && message) {
        message_id = message.id;

        setChatMessages((prevMessages: any) => [
          ...prevMessages,
          { id: message_id, role: "ASSISTANT", content: "" },
        ]);
      }
    });

    stream.on("textDelta", (delta: any, snapshot: any) => {
      if (message_id && delta.value) {
        const fullText = snapshot.value;

        setChatMessages((prevMessages: any) =>
          prevMessages.map((message: any) =>
            message.id === message_id
              ? { ...message, content: fullText }
              : message
          )
        );
      }
    });

    stream.on("textDone", async (content: any) => {
      if (message_id && content.value) {
        console.log('content:', content)
        await updateMessageInDatabase(message_id, content.value);
        message_id = null;
      }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2.5rem)] w-full max-w-3xl">
      <div className="flex-1 overflow-y-auto p-4 ">
        <Messages messages={chatMessages} />
      </div>

      <div className="sticky bottom-0 bg-background">
        <ChatInput
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
