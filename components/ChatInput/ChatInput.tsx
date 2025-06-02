"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Paperclip, ArrowUp, Maximize2 } from "lucide-react";

interface IChatInput {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: (e: FormEvent<HTMLButtonElement>) => void
}

export default function ChatInput({ value, onChange, onClick }: IChatInput) {
  const [selectedProject, setSelectedProject] = useState("No project selected");
  const [selectedModel, setSelectedModel] = useState("v0-1.5-md");

  const projects = [
    "No project selected",
    "Project Alpha",
    "Project Beta",
    "Project Gamma",
  ];

  const models = ["v0-1.5-md", "v0-2.0-lg", "v0-1.0-sm"];

  return (
    <div className="w-full p-4">
      <div className="rounded-lg border p-4 bg-[#171717]">
        {/* Input Area */}
        <div className="mb-3">
          <Input
            value={value}
            onChange={onChange}
            className="border-none bg-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            placeholder="Type your message here..."
          />
        </div>

        <div className="flex items-center gap-3">

          {/* Project Dropdown */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800 border-none bg-transparent justify-between min-w-[160px]"
              >
                <span className="text-sm">{selectedProject}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              {projects.map((project) => (
                <DropdownMenuItem
                  key={project}
                  onClick={() => setSelectedProject(project)}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {project}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* Model Dropdown */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800 border-none bg-transparent justify-between min-w-[120px]"
              >
                <span className="text-sm">{selectedModel}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              {models.map((model) => (
                <DropdownMenuItem
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {model}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-80 border cursor-pointer"
              onClick={onClick}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
