"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle2, AlertCircle, Activity } from "lucide-react"

const taskStatusData = [
  { name: "Completadas", value: 24, fill: "hsl(var(--color-success))" },
  { name: "En Progreso", value: 12, fill: "hsl(var(--color-info))" },
  { name: "Esperando QA", value: 8, fill: "hsl(var(--color-warning))" },
  { name: "Correcciones", value: 3, fill: "hsl(var(--color-destructive))" },
]

const projectMetrics = [
  { project: "Migración BD", completed: 15, pending: 5, inReview: 3 },
  { project: "Sistema Auth", completed: 12, pending: 4, inReview: 2 },
  { project: "Integración API", completed: 10, pending: 6, inReview: 4 },
  { project: "Rediseño UI", completed: 18, pending: 3, inReview: 2 },
]

export function DashboardContent() {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background to-background via-primary/2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Panel General</h1>
          <p className="text-muted-foreground mt-2">Bienvenido. Aquí está tu resumen de proyectos QA</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* KPI Cards - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Tareas Totales</p>
                <p className="text-3xl font-bold mt-2">47</p>
                <p className="text-xs text-muted-foreground mt-1">+5 esta semana</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-7 h-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Completadas</p>
                <p className="text-3xl font-bold mt-2">24</p>
                <p className="text-xs text-muted-foreground mt-1">51% completado</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">En Revisión</p>
                <p className="text-3xl font-bold mt-2">9</p>
                <p className="text-xs text-muted-foreground mt-1">Esperando QA</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Correcciones</p>
                <p className="text-3xl font-bold mt-2">3</p>
                <p className="text-xs text-muted-foreground mt-1">Acción requerida</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Enhanced */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Distribución de Estados</CardTitle>
            <CardDescription>Resumen de todas las tareas por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Métricas por Proyecto</CardTitle>
            <CardDescription>Tareas por proyecto según estado</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis dataKey="project" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="hsl(var(--color-success))" name="Completadas" />
                <Bar dataKey="inReview" stackId="a" fill="hsl(var(--color-info))" name="En Revisión" />
                <Bar dataKey="pending" stackId="a" fill="hsl(var(--color-warning))" name="Pendientes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas actualizaciones de tus proyectos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Tarea completada en Migración de BD", user: "Juan Pérez", time: "hace 2 horas" },
              { action: "Nueva revisión QA iniciada", user: "María García", time: "hace 4 horas" },
              { action: "Proyecto finalizado: Sistema Auth", user: "Carlos López", time: "hace 1 día" },
              { action: "Tareas reaignadas en API Integration", user: "Ana Martínez", time: "hace 1 día" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b last:pb-0 last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    por {item.user} • {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
