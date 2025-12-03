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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"
import { useAppContext } from "@/lib/app-context"

interface CreateTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [prioridad, setPrioridad] = useState("MEDIA")
  const [fechaLimite, setFechaLimite] = useState("")
  const [archivos, setArchivos] = useState<File[]>([])

  const { proyectoSeleccionado, agregarTarea, usuarioActual } = useAppContext()

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArchivos([...archivos, ...Array.from(e.target.files)])
    }
  }

  const handleRemoveFile = (index: number) => {
    setArchivos(archivos.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (proyectoSeleccionado) {
      const nuevaTarea = {
        id: `task-${Date.now()}`,
        titulo,
        descripcion,
        prioridad: prioridad as "BAJA" | "MEDIA" | "ALTA" | "CRITICA",
        estado: "BACKLOG" as const,
        solicitanteId: usuarioActual?.id || "system",
        creadoEn: new Date().toISOString(),
        adjuntos: archivos.map((file, idx) => ({
          id: `adj-${idx}`,
          nombreArchivo: file.name,
          contexto: "SOLICITUD_TAREA" as const,
          subidoPor: usuarioActual?.nombre || "Desconocido",
          fechaSubida: new Date().toISOString(),
        })),
      }

      agregarTarea(proyectoSeleccionado.id, nuevaTarea)
    }

    setTitulo("")
    setDescripcion("")
    setPrioridad("MEDIA")
    setFechaLimite("")
    setArchivos([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Tarea</DialogTitle>
          <DialogDescription>Crea una tarea sin asignación. Los organizadores la asignarán después.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título de la Tarea</Label>
            <Input
              id="titulo"
              placeholder="¿Qué necesita hacerse?"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Agrega detalles sobre esta tarea..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prioridad">Prioridad</Label>
            <Select value={prioridad} onValueChange={setPrioridad}>
              <SelectTrigger id="prioridad">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BAJA">Baja</SelectItem>
                <SelectItem value="MEDIA">Media</SelectItem>
                <SelectItem value="ALTA">Alta</SelectItem>
                <SelectItem value="CRITICA">Crítica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fechaLimite">Fecha Límite (Opcional)</Label>
            <Input id="fechaLimite" type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Adjuntos</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors">
              <input type="file" multiple onChange={handleAddFiles} className="hidden" id="file-input" />
              <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm font-medium">Arrastra archivos aquí o haz clic para subir</span>
                <span className="text-xs text-muted-foreground">Soportados: PDF, Imágenes, Documentos</span>
              </label>
            </div>

            {archivos.length > 0 && (
              <div className="space-y-2">
                {archivos.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveFile(idx)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!titulo}>
              Crear Tarea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
