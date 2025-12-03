"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Plus } from "lucide-react"
import { useAppContext } from "@/lib/app-context"

interface Message {
  id: string
  usuario: string
  contenido: string
  timestamp: string
  avatar: string
}

export function ProjectChat() {
  const { proyectoSeleccionado } = useAppContext()
  const [mensaje, setMensaje] = useState("")
  const [mensajes, setMensajes] = useState<Message[]>([
    {
      id: "1",
      usuario: "Juan Pérez",
      contenido: "¿Alguien puede revisar la entrega de la migración de BD?",
      timestamp: "hace 2 horas",
      avatar: "JP",
    },
    {
      id: "2",
      usuario: "María García",
      contenido: "Ya la estoy revisando, encontré algunos problemas menores",
      timestamp: "hace 1 hora",
      avatar: "MG",
    },
  ])

  const handleEnviar = () => {
    if (mensaje.trim()) {
      setMensajes([
        ...mensajes,
        {
          id: (mensajes.length + 1).toString(),
          usuario: "Tú",
          contenido: mensaje,
          timestamp: "ahora",
          avatar: "TÚ",
        },
      ])
      setMensaje("")
    }
  }

  return (
    <Card className="h-full flex flex-col border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Chat del Proyecto</CardTitle>
        <CardDescription>Comunicación en tiempo real del equipo</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-96 px-2">
          {mensajes.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{msg.usuario}</p>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground break-words">{msg.contenido}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Escribe un mensaje..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleEnviar()}
              className="text-sm"
            />
            <Button size="sm" onClick={handleEnviar} className="px-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
            <Plus className="w-3 h-3 mr-1" />
            Adjuntar archivo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
