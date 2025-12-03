"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus } from "lucide-react"

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [miembrosInput, setMiembrosInput] = useState("")
  const [miembros, setMiembros] = useState<Array<{ codigo: string; rol: "ORGANIZADOR" | "EJECUTOR" | "QA" }>>([])

  const handleAddMiembro = () => {
    if (miembrosInput.trim()) {
      setMiembros([...miembros, { codigo: miembrosInput, rol: "EJECUTOR" }])
      setMiembrosInput("")
    }
  }

  const handleRemoveMiembro = (codigo: string) => {
    setMiembros(miembros.filter((m) => m.codigo !== codigo))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ nombre, descripcion, miembros })
    // Reset form
    setNombre("")
    setDescripcion("")
    setMiembros([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Set up a new QA project and add team members</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="nombre">Project Name</Label>
            <Input
              id="nombre"
              placeholder="e.g., Database Migration"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Description</Label>
            <Textarea
              id="descripcion"
              placeholder="Describe your project..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">You'll be set as ORGANIZADOR (Organizer)</p>
          </div>

          {/* Add Members */}
          <div className="space-y-2">
            <Label htmlFor="miembros">Add Team Members</Label>
            <p className="text-xs text-muted-foreground">Add members using their unique user code</p>
            <div className="flex gap-2">
              <Input
                id="miembros"
                placeholder="User code (e.g., USR-1234)"
                value={miembrosInput}
                onChange={(e) => setMiembrosInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddMiembro()
                  }
                }}
              />
              <Button type="button" size="sm" onClick={handleAddMiembro}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Members List */}
            {miembros.length > 0 && (
              <div className="space-y-2">
                {miembros.map((miembro) => (
                  <div key={miembro.codigo} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{miembro.codigo}</p>
                      <p className="text-xs text-muted-foreground">{miembro.rol}</p>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveMiembro(miembro.codigo)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!nombre}>
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
