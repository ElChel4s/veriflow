"use client"

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
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"

interface ProjectSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  proyecto: any
}

export function ProjectSettingsDialog({ open, onOpenChange, proyecto }: ProjectSettingsDialogProps) {
  const [miembros, setMiembros] = useState(
    proyecto?.miembros || [
      { codigo: "USR-001", rol: "ORGANIZADOR" },
      { codigo: "USR-002", rol: "EJECUTOR" },
      { codigo: "USR-003", rol: "QA" },
    ],
  )
  const [nuevoMiembro, setNuevoMiembro] = useState("")

  const handleAddMiembro = () => {
    if (nuevoMiembro.trim()) {
      setMiembros([...miembros, { codigo: nuevoMiembro, rol: "EJECUTOR" }])
      setNuevoMiembro("")
    }
  }

  const handleRemoveMiembro = (codigo: string) => {
    setMiembros(miembros.filter((m) => m.codigo !== codigo))
  }

  const handleChangeRol = (codigo: string, newRol: string) => {
    setMiembros(miembros.map((m) => (m.codigo === codigo ? { ...m, rol: newRol as any } : m)))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configuración del Proyecto</DialogTitle>
          <DialogDescription>Configura {proyecto?.nombre} - roles y miembros del equipo</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Información del Proyecto</h3>
            <div className="space-y-2">
              <Label>Nombre del Proyecto</Label>
              <Input value={proyecto?.nombre} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Badge>{proyecto?.estado}</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Miembros del Equipo</h3>

            <div className="flex gap-2">
              <Input
                placeholder="Código de usuario (ej. USR-1234)"
                value={nuevoMiembro}
                onChange={(e) => setNuevoMiembro(e.target.value)}
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

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {miembros.map((miembro) => (
                <div key={miembro.codigo} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <p className="font-medium text-sm">{miembro.codigo}</p>
                  <div className="flex items-center gap-2">
                    <Select value={miembro.rol} onValueChange={(value) => handleChangeRol(miembro.codigo, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ORGANIZADOR">Organizador</SelectItem>
                        <SelectItem value="EJECUTOR">Ejecutor</SelectItem>
                        <SelectItem value="QA">QA</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveMiembro(miembro.codigo)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button type="submit">Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
