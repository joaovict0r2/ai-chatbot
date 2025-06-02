import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { newChatAction } from "./_actions/newChat.action";

// TODO
// [x] - Criar chat no banco e redirecionar para chat page com id gerado
// [x] - Mostrar primeira msg no chat page e rodar run para obter resposta
// [x] - Listar chats criados no menu lateral
// [x] - Entrar em um dos chats listados e trazer o historico de conversa
// [x] - Ver se o assistant lembra do contexto, apos navegar e um chat para o outro
// [] - Adicionar loading "Assitant pensando" e ver como lidar com runs longas para nao dar erro
// [] - Sempre que o assitant responder, scrollar a tela para baixo
// [] - Ver como estilizar o retorno das mensagens, formatar, code snippet, etc.
// [] - Voltar a popular estado de messages pelo delta, para ter o efeito de escrita
// [] - Fazer o scroll ficar na lateral da tela e nao na lateral do container principal


export default function Home() {
  return (
    <div className="h-full py-5 px-5 flex flex-col items-center justify-center">
      <div className="w-full max-w-[48rem]">
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-[56px] font-extrabold">CorrigeAI</h1>
          <Button
            variant="outline"
            className="max-w-[190px] cursor-pointer text-[18px] font-extrabold"
            size="lg"
            onClick={newChatAction}
          >
            Start chatting
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
