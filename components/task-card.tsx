"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TaskDetailPanel } from "@/components/task-detail-panel"

interface TaskCardProps {
  task: {
    id: string
    titulo: string
    prioridad: "BAJA" | "MEDIA" | "ALTA" | "CRITICA"
    numero: number
  }
  estado: string
  needsHighlight?: boolean
}

const prioridadConfig = {
  BAJA: { color: "bg-slate-100", textColor: "text-slate-700", label: "Baja" },
  MEDIA: { color: "bg-blue-100", textColor: "text-blue-700", label: "Media" },
  ALTA: { color: "bg-amber-100", textColor: "text-amber-700", label: "Alta" },
  CRITICA: { color: "bg-red-100", textColor: "text-red-700", label: "Crítica" },
}

export function TaskCard({ task, estado, needsHighlight }: TaskCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const prioridad = prioridadConfig[task.prioridad]

  return (
    <>
      <Card
        onClick={() => setIsDetailOpen(true)}
        className={`p-4 cursor-pointer hover:shadow-md transition-all ${
          needsHighlight ? "border-l-4 border-l-destructive animate-pulse" : ""
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-mono text-muted-foreground">#{task.numero}</span>
            <Badge className={`${prioridad.color} ${prioridad.textColor} text-xs font-semibold`}>
              {prioridad.label}
            </Badge>
          </div>
          <h4 className="font-medium text-sm text-foreground leading-snug">{task.titulo}</h4>
          {needsHighlight && <div className="text-xs text-destructive font-semibold">⚠ Requiere Atención</div>}
        </div>
      </Card>

      <TaskDetailPanel
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        taskId={task.id}
        taskNumber={task.numero}
        taskTitle={task.titulo}
        estado={estado}
      />
    </>
  )
}
