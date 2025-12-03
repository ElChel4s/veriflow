"use client"

import { useAppContext } from "@/lib/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Trash2 } from "lucide-react"

export function FilesView() {
  const { proyectoSeleccionado } = useAppContext()

  const allFiles =
    proyectoSeleccionado?.tareas?.flatMap((task) =>
      task.adjuntos.map((file) => ({
        ...file,
        taskId: task.id,
        taskTitle: task.titulo,
      })),
    ) || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Archivos del Proyecto</h2>
      </div>

      {allFiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay archivos adjuntos en este proyecto</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {allFiles.map((file) => (
            <Card key={file.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{file.nombreArchivo}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {file.contexto === "SOLICITUD_TAREA" ? "Solicitud de Tarea" : "Evidencia de Entrega"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {file.subidoPor} • {new Date(file.fechaSubida).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
