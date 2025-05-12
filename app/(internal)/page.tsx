'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newChatAction } from "./_actions/newChat.action";
import { useActionState } from "react";

// TODO
// [x] - Criar chat no banco e redirecionar para chat page com id gerado
// [] - Mostrar primeira msg no chat page e rodar run para obter resposta
// [] - Listar chats criados no menu lateral
// [] - Entrar em um dos chats listados e trazer o historico de conversa

export default function Home() {
  const [, dispatchAction, isPending] = useActionState(newChatAction, null);

  return (
    <div className="h-full py-5 px-5 flex flex-col items-center justify-center">
      <div className="w-full max-w-[48rem]">
      <h1 className="text-center">What can I help with?</h1>

      {isPending && (
        <p>Pensando...</p>
      )}

      <form className="flex gap-2" action={dispatchAction}>
        <Input name="prompt"/>
        <Button>Ok</Button>
      </form>
    </div>
    </div>
  );
}
