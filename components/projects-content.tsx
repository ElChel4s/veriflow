"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Plus,
  MoreVertical,
  FolderOpen,
  ArchiveRestore,
  Settings,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { CreateProjectDialog } from "@/components/create-project-dialog"
import { ProjectSettingsDialog } from "@/components/project-settings-dialog"
import { useAppContext } from "@/lib/app-context"
import { useRouter } from "next/navigation"

export function ProjectsContent() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("activos")
  const [filtro, setFiltro] = useState("")
  const { proyectos, setProyectoSeleccionado, setRolEnProyecto, usuarioActual } = useAppContext()
  const router = useRouter()

  const handleEnterProject = (proyecto: any) => {
    const miembro = proyecto.miembros.find((m: any) => m.usuarioId === usuarioActual?.id)
    if (miembro) {
      setProyectoSeleccionado(proyecto)
      setRolEnProyecto(miembro.rol)
      router.push(`/workspace/${proyecto.id}`)
    }
  }

  const proyectosActivos = proyectos.filter((p) => p.estado !== "COMPLETADA")
  const proyectosCompletados = proyectos.filter((p) => p.estado === "COMPLETADA")

  const filtrarProyectos = (lista: any[]) => {
    return lista.filter(
      (p) =>
        p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(filtro.toLowerCase()),
    )
  }

  const historialProyectos = [
    {
      id: "1",
      nombre: "Migración de Base de Datos",
      completado: "hace 2 semanas",
      duracion: "15 días",
      tareas: 24,
      completadas: 24,
      estado: "COMPLETADA",
    },
    {
      id: "2",
      nombre: "Sistema de Autenticación OAuth",
      completado: "hace 1 mes",
      duracion: "10 días",
      tareas: 18,
      completadas: 18,
      estado: "COMPLETADA",
    },
    {
      id: "3",
      nombre: "Integración de Pagos Stripe",
      completado: "hace 2 meses",
      duracion: "12 días",
      tareas: 20,
      completadas: 20,
      estado: "COMPLETADA",
    },
  ]

  const ProjectCard = ({ proyecto }: { proyecto: any }) => {
    const miembro = proyecto.miembros.find((m: any) => m.usuarioId === usuarioActual?.id)
    const progreso = Math.floor(Math.random() * 100)

    return (
      <Card className="hover:shadow-lg transition-all border-0 shadow-sm hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FolderOpen className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground text-lg">{proyecto.nombre}</h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{proyecto.descripcion}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedProject(proyecto)
                    setIsSettingsOpen(true)
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArchiveRestore className="w-4 h-4 mr-2" />
                  Ver Archivos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="gap-1">
              {proyecto.estado === "EN_PROGRESO" ? (
                <>
                  <TrendingUp className="w-3 h-3" />
                  En Progreso
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  Abierto
                </>
              )}
            </Badge>
            {miembro && (
              <Badge variant="outline" className="text-xs">
                Mi Rol: {miembro.rol === "ORGANIZADOR" ? "Organizador" : miembro.rol === "EJECUTOR" ? "Ejecutor" : "QA"}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progreso</span>
              <span className="font-semibold">{progreso}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex -space-x-2">
              {proyecto.miembros.slice(0, 3).map((miembro: any, idx: number) => (
                <Avatar key={idx} className="h-8 w-8 border-2 border-card">
                  <AvatarImage src={miembro.avatar || "/placeholder.svg"} alt={miembro.nombre} />
                  <AvatarFallback className="text-xs">{miembro.nombre[0]}</AvatarFallback>
                </Avatar>
              ))}
              {proyecto.miembros.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-semibold">
                  +{proyecto.miembros.length - 3}
                </div>
              )}
            </div>
            <Button size="sm" onClick={() => handleEnterProject(proyecto)} className="gap-1">
              Entrar
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleReopenProject = (proyecto: any) => {
    const updatedProyectos = proyectos.map((p) => {
      if (p.id === proyecto.id) {
        return { ...p, estado: "EN_PROGRESO" }
      }
      return p
    })
    setProyectoSeleccionado(proyecto)
    setRolEnProyecto(proyecto.miembros.find((m: any) => m.usuarioId === usuarioActual?.id)?.rol)
    router.push(`/workspace/${proyecto.id}`)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Mis Proyectos</h1>
          <p className="text-muted-foreground mt-2">Gestiona y visualiza todos tus proyectos QA</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-fit grid-cols-2 bg-muted/40">
          <TabsTrigger value="activos">Proyectos Activos</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        {/* Active Projects Tab */}
        <TabsContent value="activos" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar proyectos..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtrarProyectos(proyectosActivos).map((proyecto) => (
              <ProjectCard key={proyecto.id} proyecto={proyecto} />
            ))}
          </div>

          {filtrarProyectos(proyectosActivos).length === 0 && (
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-12 text-center">
                <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No se encontraron proyectos activos</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="historial" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en historial..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* History Grid */}
          <div className="space-y-3">
            {historialProyectos
              .filter((p) => p.nombre.toLowerCase().includes(filtro.toLowerCase()))
              .map((proyecto) => (
                <Card key={proyecto.id} className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{proyecto.nombre}</h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Completado {proyecto.completado}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <Badge variant="secondary" className="mb-2 block">
                          {proyecto.estado}
                        </Badge>
                        <p className="text-xs text-muted-foreground font-semibold">
                          {proyecto.completadas}/{proyecto.tareas} tareas
                        </p>
                        <p className="text-xs text-muted-foreground">Duración: {proyecto.duracion}</p>
                        <Button size="sm" onClick={() => handleReopenProject(proyecto)} className="gap-1 mt-2">
                          Reabrir
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Finalización</span>
                        <span className="font-semibold">100%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success w-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {historialProyectos.filter((p) => p.nombre.toLowerCase().includes(filtro.toLowerCase())).length === 0 && (
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-12 text-center">
                <ArchiveRestore className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No hay proyectos en el historial</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <CreateProjectDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      {selectedProject && (
        <ProjectSettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} proyecto={selectedProject} />
      )}
    </div>
  )
}
