"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { getMonthNames } from "@/lib/calendarUtils"
import { usuarios } from "@/lib/data"

interface CalendarHeaderProps {
    view: "day" | "week" | "month"
    setView: (view: "day" | "week" | "month") => void
    selectedDate: Date
    setSelectedDate: (date: Date) => void
    eventType: string
    setEventType: (type: string) => void
    usuarioId: string
    setUsuarioId: (id: string) => void
}

export function CalendarHeader({
    view,
    setView,
    selectedDate,
    setSelectedDate,
    eventType,
    setEventType,
    usuarioId,
    setUsuarioId,
}: CalendarHeaderProps) {
    // Función para ir al día actual
    const goToToday = () => {
        setSelectedDate(new Date())
    }

    // Función para ir al día/semana/mes anterior
    const goToPrevious = () => {
        const newDate = new Date(selectedDate)

        if (view === "day") {
            newDate.setDate(newDate.getDate() - 1)
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() - 7)
        } else if (view === "month") {
            newDate.setMonth(newDate.getMonth() - 1)
        }

        setSelectedDate(newDate)
    }

    // Función para ir al día/semana/mes siguiente
    const goToNext = () => {
        const newDate = new Date(selectedDate)

        if (view === "day") {
            newDate.setDate(newDate.getDate() + 1)
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() + 7)
        } else if (view === "month") {
            newDate.setMonth(newDate.getMonth() + 1)
        }

        setSelectedDate(newDate)
    }

    // Formatear la fecha según la vista
    const getFormattedDate = () => {
        if (view === "day") {
            return format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
        } else if (view === "week") {
            const startOfWeek = new Date(selectedDate)
            startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())

            const endOfWeek = new Date(startOfWeek)
            endOfWeek.setDate(startOfWeek.getDate() + 6)

            if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
                return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} de ${getMonthNames()[startOfWeek.getMonth()]} de ${startOfWeek.getFullYear()}`
            } else if (startOfWeek.getFullYear() === endOfWeek.getFullYear()) {
                return `${startOfWeek.getDate()} de ${getMonthNames()[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} de ${getMonthNames()[endOfWeek.getMonth()]} de ${startOfWeek.getFullYear()}`
            } else {
                return `${startOfWeek.getDate()} de ${getMonthNames()[startOfWeek.getMonth()]} de ${startOfWeek.getFullYear()} - ${endOfWeek.getDate()} de ${getMonthNames()[endOfWeek.getMonth()]} de ${endOfWeek.getFullYear()}`
            }
        } else if (view === "month") {
            return `${getMonthNames()[selectedDate.getMonth()]} de ${selectedDate.getFullYear()}`
        }

        return ""
    }

    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Select value={view} onValueChange={(value) => setView(value as "day" | "week" | "month")}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Vista" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Día</SelectItem>
                            <SelectItem value="week">Semana</SelectItem>
                            <SelectItem value="month">Mes</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={goToToday}>
                        Hoy
                    </Button>

                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={goToPrevious}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={goToNext}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span className="hidden sm:inline">{getFormattedDate()}</span>
                                <span className="sm:hidden">Fecha</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center gap-2">
                    <Select value={eventType} onValueChange={setEventType}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Tipo de actividad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="tarea">Tareas</SelectItem>
                            <SelectItem value="seguimiento">Seguimientos</SelectItem>
                            <SelectItem value="nota">Notas</SelectItem>
                            <SelectItem value="evento">Eventos</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={usuarioId} onValueChange={setUsuarioId}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Usuario" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            {usuarios.map((usuario) => (
                                <SelectItem key={usuario.id} value={usuario.id}>
                                    {usuario.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

