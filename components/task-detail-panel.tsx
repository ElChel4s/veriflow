"use client"

import type React from "react"
import { useState } from "react"
import { useAppContext } from "@/lib/app-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, CheckCircle2, XCircle } from "lucide-react"
import { TaskDetailLeft } from "./task-detail-left"
import { TaskDetailRight } from "./task-detail-right"

interface TaskDetailPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  taskId: string
  taskNumber: number
  taskTitle: string
  estado: string
}

export function TaskDetailPanel({ open, onOpenChange, taskId, taskNumber, taskTitle, estado }: TaskDetailPanelProps) {
  const [activeTab, setActiveTab] = useState("details")
  const { proyectoSeleccionado, rolEnProyecto, actualizarTarea, usuarioActual } = useAppContext()

  const tarea = proyectoSeleccionado?.tareas?.find((t) => t.id === taskId)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl p-0 overflow-y-auto">
        <SheetHeader className="px-6 py-4 border-b sticky top-0 bg-card">
          <SheetTitle>
            <div>
              <p className="text-sm text-muted-foreground">Tarea #{taskNumber}</p>
              <h2 className="text-2xl font-bold mt-1">{taskTitle}</h2>
            </div>
          </SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="action">Acciones</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 py-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <TaskDetailLeft taskId={taskId} taskNumber={taskNumber} estado={estado} />
              </div>
              <div>
                <TaskDetailRight taskId={taskId} estado={estado} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="action" className="py-6">
            <TaskActionPanel taskId={taskId} estado={estado} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

function TaskActionPanel({ taskId, estado }: { taskId: string; estado: string }) {
  const { rolEnProyecto, proyectoSeleccionado, actualizarTarea } = useAppContext()

  // Si es organizador y está en BACKLOG, mostrar asignación
  if (rolEnProyecto === "ORGANIZADOR" && estado === "BACKLOG") {
    return <OrganizerAssignmentForm taskId={taskId} />
  }

  // Si es ejecutor y está en ASIGNADA o EN_PROGRESO, mostrar entrega
  if (rolEnProyecto === "EJECUTOR" && (estado === "ASIGNADA" || estado === "EN_PROGRESO")) {
    return <ExecutorDeliveryForm taskId={taskId} />
  }

  // Si es QA y está en PENDIENTE_QA o EN_REVISION, mostrar revisión
  if (rolEnProyecto === "QA" && (estado === "PENDIENTE_QA" || estado === "EN_REVISION")) {
    return <QAReviewForm taskId={taskId} />
  }

  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No hay acciones disponibles para tu rol en este estado</p>
    </div>
  )
}

function OrganizerAssignmentForm({ taskId }: { taskId: string }) {
  const [ejecutorId, setEjecutorId] = useState("")
  const [qaId, setQaId] = useState("")
  const { proyectoSeleccionado, actualizarTarea } = useAppContext()

  const tarea = proyectoSeleccionado?.tareas?.find((t) => t.id === taskId)
  const miembrosEjecutores = proyectoSeleccionado?.miembros?.filter((m) => m.rol === "EJECUTOR") || []
  const miembrosQA = proyectoSeleccionado?.miembros?.filter((m) => m.rol === "QA") || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ejecutorId || !qaId || !tarea) return

    const tareaActualizada = {
      ...tarea,
      ejecutorId,
      qaId,
      estado: "ASIGNADA" as const,
    }
    actualizarTarea(proyectoSeleccionado!.id, tareaActualizada)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Asignar Tarea</h3>
        <p className="text-sm text-muted-foreground mb-4">Asigna un ejecutor y un revisor QA para esta tarea</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ejecutor">Asignar a Ejecutor</Label>
        <Select value={ejecutorId} onValueChange={setEjecutorId} required>
          <SelectTrigger id="ejecutor">
            <SelectValue placeholder="Selecciona un ejecutor" />
          </SelectTrigger>
          <SelectContent>
            {miembrosEjecutores.map((miembro) => (
              <SelectItem key={miembro.usuarioId} value={miembro.usuarioId}>
                {miembro.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qa">Asignar a Revisor QA</Label>
        <Select value={qaId} onValueChange={setQaId} required>
          <SelectTrigger id="qa">
            <SelectValue placeholder="Selecciona un revisor QA" />
          </SelectTrigger>
          <SelectContent>
            {miembrosQA.map((miembro) => (
              <SelectItem key={miembro.usuarioId} value={miembro.usuarioId}>
                {miembro.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={!ejecutorId || !qaId} className="flex-1">
          Asignar Tarea
        </Button>
      </div>
    </form>
  )
}

function ExecutorDeliveryForm({ taskId }: { taskId: string }) {
  const [resumen, setResumen] = useState("")
  const [metodologia, setMetodologia] = useState("")
  const [archivos, setArchivos] = useState<File[]>([])
  const { proyectoSeleccionado, actualizarTarea } = useAppContext()

  const tarea = proyectoSeleccionado?.tareas?.find((t) => t.id === taskId)

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArchivos([...archivos, ...Array.from(e.target.files)])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!resumen || !metodologia || !tarea) return

    const tareaActualizada = {
      ...tarea,
      estado: "PENDIENTE_QA" as const,
      entrega: {
        id: `entrega-${Date.now()}`,
        resumen,
        metodologia,
        evidencia: archivos.map((file, idx) => ({
          id: `evi-${idx}`,
          nombreArchivo: file.name,
          contexto: "EVIDENCIA_ENTREGA" as const,
          subidoPor: "Ejecutor",
          fechaSubida: new Date().toISOString(),
        })),
        entregadoEn: new Date().toISOString(),
      },
    }
    actualizarTarea(proyectoSeleccionado!.id, tareaActualizada)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Entregar Trabajo</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Envía tu trabajo para revisión de QA. Incluye un resumen y detalles técnicos.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="resumen">Resumen Ejecutivo</Label>
        <Textarea
          id="resumen"
          placeholder="Descripción breve de lo realizado..."
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          rows={4}
          required
        />
        <p className="text-xs text-muted-foreground">Requerido</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metodologia">Detalles Técnicos & Metodología</Label>
        <Textarea
          id="metodologia"
          placeholder="Describe la implementación técnica, decisiones de diseño, enfoque de pruebas..."
          value={metodologia}
          onChange={(e) => setMetodologia(e.target.value)}
          rows={5}
          required
        />
        <p className="text-xs text-muted-foreground">Requerido</p>
      </div>

      <div className="space-y-2">
        <Label>Evidencia de Entrega</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors">
          <input type="file" multiple onChange={handleAddFiles} className="hidden" id="delivery-files" />
          <label htmlFor="delivery-files" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm font-medium">Sube archivos de evidencia</span>
            <span className="text-xs text-muted-foreground">Capturas, logs, resultados de pruebas, etc.</span>
          </label>
        </div>

        {archivos.length > 0 && (
          <div className="space-y-2">
            {archivos.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setArchivos(archivos.filter((_, i) => i !== idx))}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={!resumen || !metodologia}>
          Enviar para Revisión QA
        </Button>
      </div>
    </form>
  )
}

function QAReviewForm({ taskId }: { taskId: string }) {
  const [veredicto, setVeredicto] = useState("")
  const [retroalimentacion, setRetroalimentacion] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const { proyectoSeleccionado, actualizarTarea } = useAppContext()

  const tarea = proyectoSeleccionado?.tareas?.find((t) => t.id === taskId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!veredicto || (veredicto === "RECHAZADO" && !retroalimentacion.trim())) {
      alert("Se requiere retroalimentación al rechazar")
      return
    }

    if (!tarea) return

    const nuevoEstado = veredicto === "APROBADO" ? "COMPLETADA" : "CORRECCION_NECESARIA"

    const tareaActualizada = {
      ...tarea,
      estado: nuevoEstado as const,
      revision: {
        id: `rev-${Date.now()}`,
        veredicto: veredicto as "APROBADO" | "RECHAZADO",
        textoRetroalimentacion: veredicto === "RECHAZADO" ? retroalimentacion : undefined,
        revisadoEn: new Date().toISOString(),
      },
    }
    actualizarTarea(proyectoSeleccionado!.id, tareaActualizada)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Auditoría de Calidad</h3>
        <p className="text-sm text-muted-foreground">Revisa el trabajo entregado y proporciona tu veredicto</p>
      </div>

      {tarea?.entrega && (
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold text-sm">Resumen de Entrega</h4>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{tarea.entrega.resumen}</p>
            <p className="text-sm text-muted-foreground">{tarea.entrega.metodologia}</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Label>Veredicto</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setVeredicto("APROBADO")
              setShowFeedback(false)
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              veredicto === "APROBADO" ? "border-success bg-success/10" : "border-border hover:border-success/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="font-semibold text-sm">Aprobado</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setVeredicto("RECHAZADO")
              setShowFeedback(true)
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              veredicto === "RECHAZADO"
                ? "border-destructive bg-destructive/10"
                : "border-border hover:border-destructive/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="font-semibold text-sm">Rechazado</span>
            </div>
          </button>
        </div>
      </div>

      {showFeedback && (
        <div className="space-y-2 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
          <Label htmlFor="retroalimentacion">Retroalimentación Requerida</Label>
          <Textarea
            id="retroalimentacion"
            placeholder="Explica qué necesita ser corregido..."
            value={retroalimentacion}
            onChange={(e) => setRetroalimentacion(e.target.value)}
            rows={4}
            required
          />
          <p className="text-xs text-destructive font-semibold">Se requiere retroalimentación al rechazar</p>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={!veredicto} className="flex-1">
          {veredicto === "APROBADO" ? "Aprobar & Completar Tarea" : "Rechazar & Solicitar Cambios"}
        </Button>
      </div>
    </form>
  )
}
