"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { useAppContext } from "@/lib/app-context"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { rolEnProyecto, setRolEnProyecto } = useAppContext()

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar currentRole={rolEnProyecto || "ORGANIZADOR"} onRoleChange={setRolEnProyecto} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
