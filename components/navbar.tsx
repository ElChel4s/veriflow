"use client"

import { useState } from "react"
import { Search, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  currentRole: "ORGANIZADOR" | "EJECUTOR" | "QA"
  onRoleChange: (role: "ORGANIZADOR" | "EJECUTOR" | "QA") => void
}

export function Navbar({ currentRole, onRoleChange }: NavbarProps) {
  const [hasNotifications, setHasNotifications] = useState(true)

  const roleLabels = {
    ORGANIZADOR: "📋 Organizador",
    EJECUTOR: "⚙️ Ejecutor",
    QA: "✓ Aseguranza",
  }

  return (
    <header className="h-16 border-b border-border bg-card glass-effect sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar... (Ctrl+K)"
              className="pl-10 bg-muted/50 border-0 focus:bg-background"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs font-semibold">
                {roleLabels[currentRole]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={currentRole} onValueChange={(val) => onRoleChange(val as any)}>
                <DropdownMenuRadioItem value="ORGANIZADOR">📋 Organizador</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="EJECUTOR">⚙️ Ejecutor</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="QA">✓ Aseguranza QA</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
            )}
          </Button>

          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
