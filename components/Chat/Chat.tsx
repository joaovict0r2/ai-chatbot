"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AssistantStream } from "openai/lib/AssistantStream";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Chat() {
  const [prompt, setPrompt] = useState("");
  const [threadId, setThreadId] = useState("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
      });

      const data = await res.json();
      setThreadId(data.thread_id);
      // Quando tiver mais chats, tem que verificar sem a threadId, ja existe, se nao, cria.
    };

    createThread();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!prompt.trim()) return;

    setMessages((messages: any) => [
      ...messages,
      { role: "user", text: prompt },
    ]);

    // passar request para um server action. Dar uma limpada e separada no code.
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
  }

  // sus
  const handleReadableStrem = (stream: AssistantStream) => {
    stream.on("textCreated", () =>
      setMessages((messages: any) => [
        ...messages,
        { role: "assistant", text: "" },
      ])
    );
    stream.on("textDelta", appendToLastMessage);
  };

  const appendToLastMessage = (content: any) => {
    setMessages((messages: any) => {
      const lastMessage = messages[messages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + content.value,
      };

      return [...messages.slice(0, -1), updatedLastMessage];
    });
  };
  
  return (
    <div className="w-full max-w-[48rem]">
      <div>
        {messages?.map((message: any, idx: any) => (
          <div key={idx}>
            {message.role === "user" && (
              <p className="block">user: {message.text}</p>
            )}

            {message.role === "assistant" && (
              <p className="block">assistant: {message.text}</p>
            )}
          </div>
        ))}
      </div>

      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          name="prompt"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrompt(e.target.value)
          }
        />
        <Button>Ok</Button>
      </form>
    </div>
  );
}
