"use client"

import { useState, useEffect } from "react"
import { type CalendarEvent, getEventsByWeek, getDaysOfWeek } from "@/lib/calendarUtils"
import { CalendarEventCard } from "./calendar-event-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CalendarWeekViewProps {
    events: CalendarEvent[]
    selectedDate: Date
    onEventClick?: (event: CalendarEvent) => void
}

export function CalendarWeekView({ events, selectedDate, onEventClick }: CalendarWeekViewProps) {
    const [weekEvents, setWeekEvents] = useState<CalendarEvent[]>([])
    const [weekDays, setWeekDays] = useState<Date[]>([])

    useEffect(() => {
        // Obtener eventos de la semana
        const filteredEvents = getEventsByWeek(events, selectedDate)
        setWeekEvents(filteredEvents)

        // Generar los días de la semana
        const startOfWeek = new Date(selectedDate)
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()) // Domingo como inicio de semana

        const days = []
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek)
            day.setDate(startOfWeek.getDate() + i)
            days.push(day)
        }

        setWeekDays(days)
    }, [events, selectedDate])

    // Obtener eventos para un día específico
    const getEventsForDay = (date: Date) => {
        return weekEvents.filter(
            (event) =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear(),
        )
    }

    // Verificar si hay eventos para mostrar
    const hasEvents = weekEvents.length > 0

    if (!hasEvents) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-medium mb-2">No hay actividades para esta semana</h3>
                <p className="text-muted-foreground">
                    No hay tareas, seguimientos, notas o eventos programados para la semana del{" "}
                    {weekDays[0]?.toLocaleDateString("es-ES", { day: "numeric", month: "long" })} al{" "}
                    {weekDays[6]?.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </p>
            </div>
        )
    }

    return (
        <Tabs defaultValue={selectedDate.getDay().toString()} className="w-full">
            <TabsList className="grid grid-cols-7 mb-4">
                {weekDays.map((day, index) => (
                    <TabsTrigger key={index} value={index.toString()} className="text-xs sm:text-sm">
                        <div className="flex flex-col items-center">
                            <span className="hidden sm:block">{getDaysOfWeek()[index].substring(0, 3)}</span>
                            <span className="font-bold">{day.getDate()}</span>
                        </div>
                    </TabsTrigger>
                ))}
            </TabsList>

            {weekDays.map((day, index) => {
                const dayEvents = getEventsForDay(day)

                return (
                    <TabsContent key={index} value={index.toString()} className="mt-0">
                        <ScrollArea className="h-[calc(100vh-300px)]">
                            <div className="space-y-2 p-1">
                                {dayEvents.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                                        <p className="text-muted-foreground">No hay actividades para este día</p>
                                    </div>
                                ) : (
                                    dayEvents.map((event) => <CalendarEventCard key={event.id} event={event} onClick={onEventClick} />)
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                )
            })}
        </Tabs>
    )
}

