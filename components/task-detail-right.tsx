"use client"

import { useAppContext } from "@/lib/app-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, Tag } from "lucide-react"

interface TaskDetailRightProps {
  taskId: string
  estado: string
}

const estadoConfig: Record<string, { label: string; color: string; icon: string }> = {
  BACKLOG: { label: "Pendiente", color: "bg-slate-100", icon: "📋" },
  ASIGNADA: { label: "Asignada", color: "bg-blue-100", icon: "🔵" },
  EN_PROGRESO: { label: "En Progreso", color: "bg-blue-200", icon: "⚙️" },
  PENDIENTE_QA: { label: "Esperando QA", color: "bg-amber-100", icon: "⏳" },
  EN_REVISION: { label: "En Revisión", color: "bg-purple-100", icon: "👁️" },
  CORRECCION_NECESARIA: { label: "Requiere Correcciones", color: "bg-red-100", icon: "⚠️" },
  COMPLETADA: { label: "Completada", color: "bg-emerald-100", icon: "✅" },
}

const prioridadConfig: Record<string, { label: string; color: string }> = {
  BAJA: { label: "Baja", color: "bg-slate-100" },
  MEDIA: { label: "Media", color: "bg-blue-100" },
  ALTA: { label: "Alta", color: "bg-amber-100" },
  CRITICA: { label: "Crítica", color: "bg-red-100" },
}

export function TaskDetailRight({ taskId, estado }: TaskDetailRightProps) {
  const { proyectoSeleccionado } = useAppContext()

  const tarea = proyectoSeleccionado?.tareas?.find((t) => t.id === taskId)
  const config = estadoConfig[estado as keyof typeof estadoConfig]
  const prioridadInfo = prioridadConfig[tarea?.prioridad as keyof typeof prioridadConfig] || prioridadConfig.MEDIA

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Card className="p-4">
        <p className="text-xs text-muted-foreground mb-2">Estado</p>
        <Badge className={`${config.color} text-foreground`}>
          {config.icon} {config.label}
        </Badge>
      </Card>

      {/* Priority Card */}
      <Card className="p-4">
        <p className="text-xs text-muted-foreground mb-2">Prioridad</p>
        <Badge className={`${prioridadInfo.color} text-foreground`}>{prioridadInfo.label}</Badge>
      </Card>

      {/* Time Estimate */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Tiempo Invertido</p>
        </div>
        <p className="text-sm font-semibold">Pendiente de registrar</p>
      </Card>

      {/* Task ID */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">ID de Tarea</p>
        </div>
        <p className="text-sm font-mono text-foreground">#{taskId}</p>
      </Card>

      {/* Correction Alert */}
      {estado === "CORRECCION_NECESARIA" && (
        <Card className="p-4 border-destructive bg-destructive/5">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-destructive mb-1">Cambios Solicitados</p>
              <p className="text-xs text-destructive/80">
                QA ha solicitado correcciones. Revisa la retroalimentación en la pestaña Acciones.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="pt-4 space-y-2">
        <Button variant="outline" className="w-full bg-transparent" size="sm">
          Ver Historial
        </Button>
      </div>
    </div>
  )
}
