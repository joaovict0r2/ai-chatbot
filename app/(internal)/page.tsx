"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { completion } from "./actions";

export default function Home() {
  const [state, action] = useActionState(completion, { message: null, data: undefined })
  console.log(state)

  return (
    <div className="h-full py-5 px-5 flex flex-col items-center justify-center">
      <p>Response:</p>
      { state.data ?? state.message }

      <form className="w-full flex gap-2" action={action}>
        <Input name="prompt"/>
        <Button>Ok</Button>
      </form>
    </div>
  );
}
