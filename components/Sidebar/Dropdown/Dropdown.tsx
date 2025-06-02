import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ThemeSwitch } from "../../ThemeSwitch/ThemeSwitch";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronsUpDownIcon, User2 } from "lucide-react";
import { signOutAction } from "@/app/(internal)/_actions/signOutAction";
import { auth } from "@/lib/auth";

export async function Dropdown() {
  const session = await auth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <User2 /> {session?.user?.name}
          <ChevronsUpDownIcon className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        className="w-[--radix-popper-anchor-width] mb-2 ml-2"
      >
        <DropdownMenuItem>
          <span>Account</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <ThemeSwitch />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={signOutAction}>
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
