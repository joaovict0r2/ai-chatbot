import { ChatMessage } from "@/components/ChatMessage/ChatMessage";
import db from "@/lib/db";

interface IChat {
  params: { id: string }
}

export default async function Chat({ params }: IChat) {
  const { id } = await params
  const chat = await db.chat.findUnique({ where: { id } })
  const messages = await db.message.findMany({ where: { chatId: id }})

  return (
    <div className="h-full py-5 px-5 flex flex-col items-center justify-center">
      <ChatMessage
        chatId={id}
        threadId={chat?.threadId}
        messages={messages}
      />
    </div>
  );
}
