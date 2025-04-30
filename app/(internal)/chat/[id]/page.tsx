"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chat() {
  return (
    <div className="h-full py-5 px-5 flex flex-col items-center justify-center">
      <div className="w-full max-w-[48rem]">
        <h1 className="text-center">What can I help with?</h1>

        <form className="flex gap-2">
          <Input name="prompt"/>
          <Button>Ok</Button>
        </form>
      </div>
    </div>
  );
}
