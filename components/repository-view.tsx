"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Eye, FileText, ImageIcon, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/lib/app-context"

interface Archivo {
  id: string
  nombre: string
  tipo: string
  tamaño: string
  contexto: "SOLICITUD_TAREA" | "EVIDENCIA_ENTREGA"
  tarea: string
  usuario: string
  fecha: string
}

export function RepositoryView() {
  const { proyectoSeleccionado } = useAppContext()
  const [filtro, setFiltro] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState<"SOLICITUD_TAREA" | "EVIDENCIA_ENTREGA" | "TODOS">("TODOS")

  const archivos: Archivo[] = [
    {
      id: "1",
      nombre: "schema_migration.sql",
      tipo: "sql",
      tamaño: "2.4 MB",
      contexto: "SOLICITUD_TAREA",
      tarea: "#204",
      usuario: "Juan Pérez",
      fecha: "hace 3 días",
    },
    {
      id: "2",
      nombre: "database_backup.zip",
      tipo: "zip",
      tamaño: "125 MB",
      contexto: "EVIDENCIA_ENTREGA",
      tarea: "#204",
      usuario: "Carlos López",
      fecha: "hace 2 días",
    },
    {
      id: "3",
      nombre: "oauth_implementation.pdf",
      tipo: "pdf",
      tamaño: "1.2 MB",
      contexto: "SOLICITUD_TAREA",
      tarea: "#203",
      usuario: "María García",
      fecha: "hace 1 día",
    },
    {
      id: "4",
      nombre: "integration_test_results.png",
      tipo: "image",
      tamaño: "562 KB",
      contexto: "EVIDENCIA_ENTREGA",
      tarea: "#202",
      usuario: "Ana López",
      fecha: "hace 12 horas",
    },
  ]

  const filtrados = archivos.filter((archivo) => {
    const cumpleFiltroTexto =
      archivo.nombre.toLowerCase().includes(filtro.toLowerCase()) || archivo.tarea.includes(filtro)
    const cumpleFiltroTipo = tipoFiltro === "TODOS" || archivo.contexto === tipoFiltro
    return cumpleFiltroTexto && cumpleFiltroTipo
  })

  const getIconoTipo = (tipo: string) => {
    if (tipo === "image") return <ImageIcon className="w-4 h-4" />
    if (tipo === "pdf") return <FileText className="w-4 h-4" />
    if (tipo === "sql" || tipo === "zip") return <File className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar archivos..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          {["TODOS", "SOLICITUD_TAREA", "EVIDENCIA_ENTREGA"].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setTipoFiltro(tipo as any)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                tipoFiltro === tipo
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/30 border-border hover:border-primary/30"
              }`}
            >
              {tipo === "SOLICITUD_TAREA" ? "Solicitudes" : tipo === "EVIDENCIA_ENTREGA" ? "Evidencia" : "Todos"}
            </button>
          ))}
        </div>
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map((archivo) => (
          <Card key={archivo.id} className="cursor-pointer hover:shadow-md transition-all border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {/* Icon and Name */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                    {getIconoTipo(archivo.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-foreground">{archivo.nombre}</p>
                    <p className="text-xs text-muted-foreground">{archivo.tamaño}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-2 border-t pt-3">
                  <div className="flex items-center justify-between">
                    <Badge className="text-xs bg-muted" variant="secondary">
                      {archivo.contexto === "SOLICITUD_TAREA" ? "Solicitud" : "Evidencia"}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">{archivo.tarea}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{archivo.usuario}</p>
                  <p className="text-xs text-muted-foreground">{archivo.fecha}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button size="sm" variant="ghost" className="flex-1 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Ver
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1 text-xs">
                    <Download className="w-3 h-3 mr-1" />
                    Descargar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtrados.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-12 text-center">
            <File className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">No se encontraron archivos</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
