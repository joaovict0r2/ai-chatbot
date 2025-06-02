import { AppSidebar } from "@/components/Sidebar/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode } from "react"

interface ILayout {
  children: ReactNode
}

function Layout({ children }: ILayout) {
  return (
    <SidebarProvider>
      <div className="w-full flex h-screen overflow-hidden">
        <AppSidebar/>

        <main className="flex-1 flex flex-col">
          <div className="p-2">
            <SidebarTrigger className="w-8 h-8 cursor-pointer"/>
          </div>

          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout
