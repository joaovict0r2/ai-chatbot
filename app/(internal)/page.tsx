"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { completion } from "./actions";

export default function Home() {
  const [, action] = useActionState(completion, { message: null, data: undefined })

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
