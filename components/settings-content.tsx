"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { Copy, Check, Palette, Moon } from "lucide-react"

export function SettingsContent() {
  const { theme, setTheme, darkMode, setDarkMode, isDark } = useTheme()
  const [copied, setCopied] = useState(false)
  const userCode = "USR-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  const handleCopyUserCode = () => {
    navigator.clipboard.writeText(userCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground mt-2">Gestiona tus preferencias y cuenta</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-fit">
          <TabsTrigger value="account">Cuenta</TabsTrigger>
          <TabsTrigger value="theme">Tema</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Tu Perfil</CardTitle>
              <CardDescription>Gestiona tu información de cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" value="Juan Pérez" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" value="juan@ejemplo.com" readOnly />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Tu Código de Usuario</CardTitle>
              <CardDescription>Comparte este código con organizadores para que te agreguen a proyectos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm border border-border">{userCode}</div>
                <Button variant="outline" size="sm" onClick={handleCopyUserCode} className="px-3 bg-transparent">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Este código único permite que los organizadores te agreguen a proyectos
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Tema de Color
              </CardTitle>
              <CardDescription>Elige tu color de acento preferido para la interfaz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "default", label: "Neutro", preview: "bg-slate-900" },
                  { id: "blue", label: "Azul Corporativo", preview: "bg-blue-600" },
                  { id: "forest", label: "Verde Bosque", preview: "bg-green-700" },
                  { id: "violet", label: "Violeta", preview: "bg-violet-600" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id as any)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      theme === option.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-8 h-8 ${option.preview} rounded-lg mb-2`}></div>
                    <p className="font-semibold text-sm">{option.label}</p>
                    {theme === option.id && (
                      <Badge className="mt-2" variant="secondary">
                        Actual
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Modo Oscuro
              </CardTitle>
              <CardDescription>Elige cómo deseas que se vea la interfaz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", label: "Claro", desc: "Siempre claro" },
                  { id: "system", label: "Sistema", desc: "Según preferencias" },
                  { id: "dark", label: "Oscuro", desc: "Siempre oscuro" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setDarkMode(option.id as any)}
                    className={`p-3 rounded-lg border-2 transition-all text-center text-sm ${
                      darkMode === option.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.desc}</p>
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-muted/30 rounded-lg text-sm">
                <p className="text-muted-foreground">
                  Modo actual: <span className="font-semibold">{isDark ? "Oscuro" : "Claro"}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Notificaciones por Correo</CardTitle>
              <CardDescription>Controla cuándo recibes notificaciones por correo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Asignación de Tareas</p>
                  <p className="text-xs text-muted-foreground">Cuando se te asigna una tarea</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Revisiones QA</p>
                  <p className="text-xs text-muted-foreground">Cuando tu trabajo es revisado</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Actualizaciones de Proyecto</p>
                  <p className="text-xs text-muted-foreground">Cambios en el estado del proyecto</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Notificaciones en la Aplicación</CardTitle>
              <CardDescription>Notificaciones en tiempo real dentro de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Correcciones Necesarias</p>
                  <p className="text-xs text-muted-foreground">Alertas críticas cuando se solicitan cambios</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
