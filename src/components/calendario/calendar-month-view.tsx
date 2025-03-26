"use client"

import { useState, useEffect } from "react"
import {
    type CalendarEvent,
    getEventsByMonth,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    getDaysOfWeek,
} from "@/lib/calendarUtils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getEventColor } from "@/lib/calendarUtils"

interface CalendarMonthViewProps {
    events: CalendarEvent[]
    selectedDate: Date
    onDateClick: (date: Date) => void
}

export function CalendarMonthView({ events, selectedDate, onDateClick }: CalendarMonthViewProps) {
    const [monthEvents, setMonthEvents] = useState<CalendarEvent[]>([])
    const [calendarDays, setCalendarDays] = useState<Date[]>([])

    useEffect(() => {
        // Obtener eventos del mes
        const filteredEvents = getEventsByMonth(events, selectedDate)
        setMonthEvents(filteredEvents)

        // Generar los días del calendario
        const firstDay = getFirstDayOfMonth(selectedDate)
        const lastDay = getLastDayOfMonth(selectedDate)

        // Ajustar para mostrar la semana completa
        const startDate = new Date(firstDay)
        startDate.setDate(startDate.getDate() - startDate.getDay())

        const endDate = new Date(lastDay)
        const daysToAdd = 6 - endDate.getDay()
        endDate.setDate(endDate.getDate() + daysToAdd)

        const days = []
        const currentDate = new Date(startDate)

        while (currentDate <= endDate) {
            days.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }

        setCalendarDays(days)
    }, [events, selectedDate])

    // Obtener eventos para un día específico
    const getEventsForDay = (date: Date) => {
        return monthEvents.filter(
            (event) =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear(),
        )
    }

    // Verificar si una fecha es hoy
    const isToday = (date: Date) => {
        const today = new Date()
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }

    // Verificar si una fecha es del mes actual
    const isCurrentMonth = (date: Date) => {
        return date.getMonth() === selectedDate.getMonth()
    }

    // Verificar si una fecha es la seleccionada
    const isSelected = (date: Date) => {
        return (
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
        )
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-7 gap-1 mb-2">
                {getDaysOfWeek().map((day, index) => (
                    <div key={index} className="text-center text-xs font-medium py-1">
                        {day.substring(0, 3)}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                    const dayEvents = getEventsForDay(day)
                    const hasEvents = dayEvents.length > 0

                    return (
                        <div
                            key={index}
                            className={`
                min-h-[100px] border rounded-md p-1 cursor-pointer transition-colors
                ${isCurrentMonth(day) ? "bg-card" : "bg-muted/30 text-muted-foreground"}
                ${isToday(day) ? "border-primary" : "border-border"}
                ${isSelected(day) ? "ring-2 ring-primary" : ""}
                hover:bg-accent
              `}
                            onClick={() => onDateClick(day)}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className={`text-sm font-medium ${isToday(day) ? "text-primary" : ""}`}>{day.getDate()}</span>
                                {hasEvents && (
                                    <Badge variant="outline" className="text-xs">
                                        {dayEvents.length}
                                    </Badge>
                                )}
                            </div>

                            <ScrollArea className="h-[70px]">
                                <div className="space-y-1">
                                    {dayEvents.slice(0, 3).map((event) => (
                                        <div
                                            key={event.id}
                                            className={`${getEventColor(event.type)} text-white text-xs p-1 rounded truncate`}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <div className="text-xs text-muted-foreground text-center">+{dayEvents.length - 3} más</div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

