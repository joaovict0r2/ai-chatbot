import { AppSidebar } from "@/components/Sidebar/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"

interface ILayout {
  children: ReactNode
}

function Layout({ children }: ILayout) {
  return (
    <SidebarProvider>
      <AppSidebar/>

      <main className="w-full">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  )
}

export default Layout