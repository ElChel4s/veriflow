"use client"
import { useAppContext } from "@/lib/app-context"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, FileText } from "lucide-react"

interface TaskDetailLeftProps {
  taskId: string
  taskNumber: number
  estado: string
}

export function TaskDetailLeft({ taskId, taskNumber, estado }: TaskDetailLeftProps) {
  const { proyectoSeleccionado } = useAppContext()

  const tarea = proyectoSeleccionado?.tareas?.find((t) => t.id === taskId)

  const taskData = {
    descripcion: tarea?.descripcion || "Sin descripción",
    fechaLimite: tarea?.fechaLimite || "No especificada",
    solicitante: tarea?.solicitante || "Solicitante",
    ejecutor: tarea?.ejecutor || "Sin asignar",
    qa: tarea?.qa || "Sin asignar",
  }

  const historial = [
    { evento: "Tarea Creada", fecha: tarea?.creadoEn || "2024-01-10", usuario: "Sistema" },
    { evento: "Estado Actual", fecha: new Date().toISOString(), usuario: "Sistema" },
  ]

  const archivosRelacionados = tarea?.adjuntos || []

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Descripción</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{taskData.descripcion}</p>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Fecha Límite</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            {taskData.fechaLimite !== "No especificada"
              ? new Date(taskData.fechaLimite).toLocaleDateString("es-ES")
              : "No especificada"}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Solicitante</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="w-4 h-4" />
            {taskData.solicitante}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Ejecutor</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="w-4 h-4" />
            {taskData.ejecutor}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">QA</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="w-4 h-4" />
            {taskData.qa}
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4">Historial de Actividad</h3>
        <div className="space-y-4">
          {historial.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-primary mt-2"></div>
                {idx < historial.length - 1 && <div className="absolute left-1.5 top-5 w-0.5 h-12 bg-border"></div>}
              </div>
              <div>
                <p className="font-medium text-sm">{item.evento}</p>
                <p className="text-xs text-muted-foreground">
                  {item.usuario} • {new Date(item.fecha).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Archivos Relacionados */}
      <div>
        <h3 className="font-semibold mb-4">Archivos Relacionados</h3>
        {archivosRelacionados.length > 0 ? (
          <div className="space-y-2">
            {archivosRelacionados.map((archivo, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{archivo.nombreArchivo}</p>
                  <p className="text-xs text-muted-foreground">{archivo.contexto}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Sin archivos adjuntos</p>
        )}
      </div>
    </div>
  )
}
