import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateHashId } from "@/lib/utils/crypto";
import { redirect } from "next/navigation";

export default function Home() {

  // Cria uma hash, atribui a um chat e redireciona para a pagina do chat, com a mensagem ja.
  const action = async () => {
    "use server"
    
    const hash = generateHashId()
    redirect('/chat/' + hash)
  }

  return (
    <div className="h-full py-5 px-5 flex flex-col items-center justify-center">
      <div className="w-full max-w-[48rem]">
      <h1 className="text-center">What can I help with?</h1>

      <form className="flex gap-2" action={action}>
        <Input name="prompt"/>
        <Button>Ok</Button>
      </form>
    </div>
    </div>
  );
}
