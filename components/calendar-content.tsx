"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1))

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = currentDate.toLocaleString("es-ES", { month: "long", year: "numeric" })
  const days = Array.from({ length: daysInMonth(currentDate) }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth(currentDate) }, (_, i) => i)

  const upcomingDates = [
    { day: 15, title: "Límite Migración BD", priority: "ALTA" },
    { day: 20, title: "Reunión de Revisión API", priority: "MEDIA" },
    { day: 25, title: "Cierre de Proyecto", priority: "CRITICA" },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Calendario</h1>
        <p className="text-muted-foreground mt-2">Visualiza tus límites de tareas y cronograma del proyecto</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 p-8 border-0 shadow-sm">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold capitalize">{monthName}</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}
              {days.map((day) => {
                const dateEvent = upcomingDates.find((d) => d.day === day)
                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-lg border p-1 flex items-center justify-center cursor-pointer transition-all font-medium ${
                      dateEvent
                        ? "border-primary bg-primary/5 text-foreground hover:bg-primary/10"
                        : "border-border hover:border-primary/30 hover:bg-muted/20"
                    }`}
                    title={dateEvent?.title}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-8 border-0 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Próximos Límites</h3>
          <div className="space-y-3">
            {upcomingDates.map((event, idx) => (
              <div
                key={idx}
                className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-semibold text-sm">Ene {event.day}</span>
                  <Badge variant="secondary" className="text-xs">
                    {event.priority === "ALTA" ? "Alta" : event.priority === "CRITICA" ? "Crítica" : "Media"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.title}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
