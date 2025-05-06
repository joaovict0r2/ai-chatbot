"use client"

import { Chat as ChatMessage } from "@/components/Chat/Chat";

export default function Chat() {
  return (
    <div className="h-full py-5 px-5 flex flex-col items-center justify-center">
      <ChatMessage />
    </div>
  );
}
