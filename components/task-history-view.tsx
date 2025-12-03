"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download } from "lucide-react"
import { useAppContext } from "@/lib/app-context"

export function TaskHistoryView() {
  const { proyectoSeleccionado } = useAppContext()
  const [filtro, setFiltro] = useState("")

  const historialTareas = [
    {
      id: "204",
      titulo: "Migración de Base de Datos",
      estado: "COMPLETADA",
      fecha: "hace 2 horas",
      archivos: 5,
    },
    {
      id: "203",
      titulo: "Autenticación con OAuth",
      estado: "COMPLETADA",
      fecha: "hace 1 día",
      archivos: 3,
    },
    {
      id: "202",
      titulo: "Integración de Pagos",
      estado: "EN_REVISION",
      fecha: "hace 2 días",
      archivos: 7,
    },
  ]

  const filtrados = historialTareas.filter(
    (t) => t.titulo.toLowerCase().includes(filtro.toLowerCase()) || t.id.includes(filtro),
  )

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar tareas completadas..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filtrados.map((tarea) => (
          <Card key={tarea.id} className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-sm text-foreground">#{tarea.id}</p>
                    <Badge className="text-xs bg-success/20 text-success-foreground dark:bg-success/30">
                      {tarea.estado === "COMPLETADA" ? "Completada" : "En Revisión"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{tarea.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-2">{tarea.fecha}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <FileText className="w-4 h-4 text-muted-foreground mb-1 mx-auto" />
                    <p className="text-xs font-semibold">{tarea.archivos}</p>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
