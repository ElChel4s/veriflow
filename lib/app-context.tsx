"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export type Rol = "ORGANIZADOR" | "EJECUTOR" | "QA"
export type EstadoTarea =
  | "BACKLOG"
  | "ASIGNADA"
  | "EN_PROGRESO"
  | "PENDIENTE_QA"
  | "EN_REVISION"
  | "CORRECCION_NECESARIA"
  | "COMPLETADA"
export type Prioridad = "BAJA" | "MEDIA" | "ALTA" | "CRITICA"

export interface Usuario {
  id: string
  codigo: string
  nombre: string
  email: string
  avatar: string
}

export interface Miembro {
  usuarioId: string
  nombre: string
  email: string
  avatar: string
  rol: Rol
}

export interface Adjunto {
  id: string
  nombreArchivo: string
  contexto: "SOLICITUD_TAREA" | "EVIDENCIA_ENTREGA"
  subidoPor: string
  fechaSubida: string
}

export interface EntregaTarea {
  id: string
  resumen: string
  metodologia: string
  evidencia: Adjunto[]
  entregadoEn: string
}

export interface RevisionQA {
  id: string
  veredicto: "APROBADO" | "RECHAZADO"
  textoRetroalimentacion?: string
  revisadoEn: string
}

export interface Tarea {
  id: string
  titulo: string
  descripcion: string
  prioridad: Prioridad
  estado: EstadoTarea
  ejecutorId?: string
  qaId?: string
  solicitanteId: string
  fechaLimite?: string
  creadoEn: string
  adjuntos: Adjunto[]
  entrega?: EntregaTarea
  revision?: RevisionQA
}

export interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  estado: "ABIERTO" | "EN_PROGRESO" | "COMPLETADO" | "CANCELADO"
  creadorId: string
  miembros: Miembro[]
  tareas: Tarea[]
  creadoEn: string
}

interface AppContextType {
  usuarioActual: Usuario | null
  proyectos: Proyecto[]
  proyectoSeleccionado: Proyecto | null
  rolEnProyecto: Rol | null
  setUsuarioActual: (usuario: Usuario) => void
  setProyectoSeleccionado: (proyecto: Proyecto | null) => void
  setRolEnProyecto: (rol: Rol) => void
  agregarProyecto: (proyecto: Proyecto) => void
  actualizarProyecto: (proyecto: Proyecto) => void
  agregarTarea: (proyectoId: string, tarea: Tarea) => void
  actualizarTarea: (proyectoId: string, tarea: Tarea) => void
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [usuarioActual, setUsuarioActualState] = useState<Usuario | null>({
    id: "user1",
    codigo: "USR001",
    nombre: "Juan Pérez",
    email: "juan@veriflow.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
  })

  const [proyectos, setProyectos] = useState<Proyecto[]>([
    {
      id: "proj1",
      nombre: "Migración Base de Datos",
      descripcion: "Migrar base de datos heredada a PostgreSQL",
      estado: "EN_PROGRESO",
      creadorId: "user1",
      miembros: [
        {
          usuarioId: "user1",
          nombre: "Juan Pérez",
          email: "juan@veriflow.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
          rol: "ORGANIZADOR",
        },
        {
          usuarioId: "user2",
          nombre: "María García",
          email: "maria@veriflow.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
          rol: "EJECUTOR",
        },
        {
          usuarioId: "user3",
          nombre: "Carlos López",
          email: "carlos@veriflow.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3",
          rol: "QA",
        },
      ],
      tareas: [
        {
          id: "task1",
          titulo: "Crear schema inicial",
          descripcion: "Crear el schema de la nueva base de datos PostgreSQL con todas las tablas requeridas",
          prioridad: "ALTA",
          estado: "EN_PROGRESO",
          ejecutorId: "user2",
          qaId: "user3",
          solicitanteId: "user1",
          fechaLimite: "2025-12-15",
          creadoEn: "2025-11-01",
          adjuntos: [],
        },
        {
          id: "task2",
          titulo: "Migrar datos históricos",
          descripcion: "Migrar datos de la base de datos antigua al nuevo sistema",
          prioridad: "CRITICA",
          estado: "BACKLOG",
          solicitanteId: "user1",
          fechaLimite: "2025-12-20",
          creadoEn: "2025-11-01",
          adjuntos: [],
        },
        {
          id: "task3",
          titulo: "Validar integridad de datos",
          descripcion: "Ejecutar validaciones para asegurar que todos los datos se migraron correctamente",
          prioridad: "MEDIA",
          estado: "BACKLOG",
          solicitanteId: "user1",
          fechaLimite: "2025-12-25",
          creadoEn: "2025-11-02",
          adjuntos: [],
        },
      ],
      creadoEn: "2025-10-01",
    },
    {
      id: "proj2",
      nombre: "Sistema de Autenticación",
      descripcion: "Implementar OAuth 2.0 y autenticación multifactor",
      estado: "ABIERTO",
      creadorId: "user1",
      miembros: [
        {
          usuarioId: "user1",
          nombre: "Juan Pérez",
          email: "juan@veriflow.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
          rol: "ORGANIZADOR",
        },
        {
          usuarioId: "user2",
          nombre: "María García",
          email: "maria@veriflow.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
          rol: "EJECUTOR",
        },
      ],
      tareas: [],
      creadoEn: "2025-10-15",
    },
  ])

  const [proyectoSeleccionado, setProyectoSeleccionadoState] = useState<Proyecto | null>(null)
  const [rolEnProyecto, setRolEnProyectoState] = useState<Rol | null>(null)

  const setUsuarioActual = (usuario: Usuario) => {
    setUsuarioActualState(usuario)
  }

  const setProyectoSeleccionado = (proyecto: Proyecto | null) => {
    setProyectoSeleccionadoState(proyecto)
  }

  const setRolEnProyecto = (rol: Rol) => {
    setRolEnProyectoState(rol)
  }

  const logout = () => {
    setUsuarioActualState(null)
    setProyectoSeleccionadoState(null)
    setRolEnProyectoState(null)
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  const agregarProyecto = (proyecto: Proyecto) => {
    setProyectos([...proyectos, proyecto])
  }

  const actualizarProyecto = (proyecto: Proyecto) => {
    setProyectos(proyectos.map((p) => (p.id === proyecto.id ? proyecto : p)))
  }

  const agregarTarea = (proyectoId: string, tarea: Tarea) => {
    setProyectos(proyectos.map((p) => (p.id === proyectoId ? { ...p, tareas: [...p.tareas, tarea] } : p)))
  }

  const actualizarTarea = (proyectoId: string, tarea: Tarea) => {
    setProyectos(
      proyectos.map((p) =>
        p.id === proyectoId ? { ...p, tareas: p.tareas.map((t) => (t.id === tarea.id ? tarea : t)) } : p,
      ),
    )
  }

  return (
    <AppContext.Provider
      value={{
        usuarioActual,
        proyectos,
        proyectoSeleccionado,
        rolEnProyecto,
        setUsuarioActual,
        setProyectoSeleccionado,
        setRolEnProyecto,
        agregarProyecto,
        actualizarProyecto,
        agregarTarea,
        actualizarTarea,
          logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext debe usarse dentro de AppProvider")
  }
  return context
}
