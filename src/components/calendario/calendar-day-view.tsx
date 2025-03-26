"use client"

import { useState, useEffect } from "react"
import { type CalendarEvent, getEventsByDate, groupEventsByHour } from "@/lib/calendarUtils"
import { CalendarEventCard } from "./calendar-event-card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CalendarDayViewProps {
    events: CalendarEvent[]
    selectedDate: Date
    onEventClick?: (event: CalendarEvent) => void
}

export function CalendarDayView({ events, selectedDate, onEventClick }: CalendarDayViewProps) {
    const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([])
    const [groupedEvents, setGroupedEvents] = useState<Record<string, CalendarEvent[]>>({})

    useEffect(() => {
        const filteredEvents = getEventsByDate(events, selectedDate)
        setDayEvents(filteredEvents)
        setGroupedEvents(groupEventsByHour(filteredEvents))
    }, [events, selectedDate])

    // Generar horas del día (de 00:00 a 23:00)
    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`)

    // Verificar si hay eventos para mostrar
    const hasEvents = Object.keys(groupedEvents).length > 0

    if (!hasEvents) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-medium mb-2">No hay actividades para este día</h3>
                <p className="text-muted-foreground">
                    No hay tareas, seguimientos, notas o eventos programados para el{" "}
                    {selectedDate.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </p>
            </div>
        )
    }

    return (
        <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-4 p-1">
                {hours.map((hour) => {
                    const hourEvents = groupedEvents[hour] || []

                    if (hourEvents.length === 0) {
                        return (
                            <div key={hour} className="flex items-start">
                                <div className="w-16 text-sm text-muted-foreground pt-2">{hour}</div>
                                <div className="flex-1 border-t border-dashed border-border h-8"></div>
                            </div>
                        )
                    }

                    return (
                        <div key={hour} className="flex items-start">
                            <div className="w-16 text-sm text-muted-foreground pt-2">{hour}</div>
                            <div className="flex-1">
                                {hourEvents.map((event) => (
                                    <CalendarEventCard key={event.id} event={event} onClick={onEventClick} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
    )
}

