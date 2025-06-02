type Message = {
  id: string
  chatId: string
  role: 'USER' | 'ASSISTANT'
  content: string
  messageId: string | null
  runId: string | null
  fileIds: any[]
  createdAt: Date
}

interface IMessages {
  messages: Message[]
}

export function Messages({ messages }: IMessages) {
  return (
    <>
      {messages?.map((message: Message, idx: number) => (
        <div key={idx} className="mb-4">
          {message.role === "USER" && (
            <div className="flex justify-end">
              <p className="bg-[#3b3b3b66] text-white p-3 rounded-lg max-w-[80%] break-words">
                {message.content}
              </p>
            </div>
          )}
          {message.role === "ASSISTANT" && (
            <div className="flex justify-start">
              <p className="text-white p-3 rounded-lg max-w-[80%] break-words">
                {message.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
