"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"

import { CalendarHeader } from "./calendar-header"
import { CalendarDayView } from "./calendar-day-view"
import { CalendarWeekView } from "./calendar-week-view"
import { CalendarMonthView } from "./calendar-month-view"
import { FloatingActions } from "./floating-actions"

import { type CalendarEvent } from "@/lib/calendarUtils"
import { fetchAllCalendarEvents } from "@/services/calendarService"


import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TareaForm } from "@/components/tareas/tarea-form"
import { SeguimientoForm } from "@/components/seguimientos/seguimiento-form"
import { NotaForm } from "@/components/notas/nota-form"
import { EventoForm } from "@/components/calendario/evento-form"

import { CalendarEventCard } from "./calendar-event-card"
import { useNavigate } from "react-router-dom"

interface CalendarViewProps {
    refreshKey: number
}

export function CalendarView({ refreshKey }: CalendarViewProps) {
    const navigate = useNavigate()
    const [view, setView] = useState<"day" | "week" | "month">("day")
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [eventType, setEventType] = useState("todos")
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([])

    // Estados para los diálogos
    const [showTareaForm, setShowTareaForm] = useState(false)
    const [showSeguimientoForm, setShowSeguimientoForm] = useState(false)
    const [showNotaForm, setShowNotaForm] = useState(false)
    const [showEventoForm, setShowEventoForm] = useState(false)
    const [showEventDetails, setShowEventDetails] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

    // Cargar eventos
    useEffect(() => {
        async function fetchEvents() {
            const allEvents = await fetchAllCalendarEvents()
            setEvents(allEvents)
        }
        fetchEvents()
    }, [])

    useEffect(() => {
        fetchAllCalendarEvents().then(setEvents)
    }, [refreshKey])


    // Filtrar eventos
    useEffect(() => {
        let filtered = [...events]

        // Filtrar por tipo
        if (eventType !== "todos") {
            filtered = filtered.filter((event) => event.type === eventType)
        }

        // Solo permitir tareas y eventos
        filtered = filtered.filter((event) => event.type === "tarea" || event.type === "evento")

        setFilteredEvents(filtered)
    }, [events, eventType])


    // Manejar clic en un evento
    const handleEventClick = (event: CalendarEvent) => {
        setSelectedEvent(event)
        setShowEventDetails(true)
    }

    // Manejar clic en una fecha (vista de mes)
    const handleDateClick = (date: Date) => {
        setSelectedDate(date)
        setView("day")
    }

    // Manejar creación de nueva tarea
    const handleCreateTarea = () => {
        setShowTareaForm(true)
    }

    // Manejar creación de nuevo seguimiento
    const handleCreateSeguimiento = () => {
        setShowSeguimientoForm(true)
    }

    // Manejar creación de nueva nota
    const handleCreateNota = () => {
        setShowNotaForm(true)
    }

    // Manejar creación de nuevo evento
    const handleCreateEvento = () => {
        setShowEventoForm(true)
    }

    // Manejar éxito en formularios
    const handleFormSuccess = () => {
        // En una aplicación real, aquí recargaríamos los datos
        // Para esta simulación, simplemente cerramos los formularios
        setShowTareaForm(false)
        setShowSeguimientoForm(false)
        setShowNotaForm(false)
        setShowEventoForm(false)

        // Recargar eventos (simulación)
        fetchAllCalendarEvents().then(setEvents)
    }

    // Navegar a la página de detalles según el tipo de evento
    const navigateToDetails = () => {
        if (!selectedEvent) return

        const id = selectedEvent.id.split("-")[1]

        switch (selectedEvent.type) {
            case "tarea":
                navigate(`/tareas/${id}`)
                break
            case "evento":
                // Asumiendo que hay una página de detalles para eventos
                navigate(`/eventos/${id}`)
                break
            case "seguimiento":
                // Para seguimientos y notas, redirigir a la página del cliente
                if (selectedEvent.clienteId) {
                    navigate(`/clientes/${selectedEvent.clienteId}`)
                }
                break
            case "nota":
                if (selectedEvent.clienteId) {
                    navigate(`/clientes/${selectedEvent.clienteId}`)
                }
                break
            default:
                break
        }

        setShowEventDetails(false)
    }

    return (
        <>
            <CalendarHeader
                view={view}
                setView={setView}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                eventType={eventType}
                setEventType={setEventType}
            />

            <div className="bg-card border rounded-lg p-4">
                {view === "day" && (
                    <CalendarDayView events={filteredEvents} selectedDate={selectedDate} onEventClick={handleEventClick} />
                )}

                {view === "week" && (
                    <CalendarWeekView events={filteredEvents} selectedDate={selectedDate} onEventClick={handleEventClick} />
                )}

                {view === "month" && (
                    <CalendarMonthView events={filteredEvents} selectedDate={selectedDate} onDateClick={handleDateClick} />
                )}
            </div>

            <FloatingActions
                onCreateTarea={handleCreateTarea}
                onCreateSeguimiento={handleCreateSeguimiento}
                onCreateNota={handleCreateNota}
                onCreateEvento={handleCreateEvento}
            />

            {/* Diálogo para crear tarea */}
            <Dialog open={showTareaForm} onOpenChange={setShowTareaForm}>
                <DialogContent className="max-w-3xl" aria-describedby="tarea-form-description">
                    <p id="tarea-form-description" className="sr-only">Formulario para crear una nueva tarea</p>
                    <DialogHeader>
                        <DialogTitle>Nueva Tarea</DialogTitle>
                    </DialogHeader>
                    <TareaForm onSuccess={handleFormSuccess} onCancel={() => setShowTareaForm(false)} />
                </DialogContent>
            </Dialog>

            {/* Diálogo para crear seguimiento */}
            <Dialog open={showSeguimientoForm} onOpenChange={setShowSeguimientoForm}>
                <DialogContent className="max-w-3xl" aria-describedby="seguimiento-form-description">
                    <p id="seguimiento-form-description" className="sr-only">Formulario para crear un nuevo seguimiento</p>
                    <DialogHeader>
                        <DialogTitle>Nuevo Seguimiento</DialogTitle>
                    </DialogHeader>
                    <SeguimientoForm onSuccess={handleFormSuccess} onCancel={() => setShowSeguimientoForm(false)} />
                </DialogContent>
            </Dialog>

            {/* Diálogo para crear nota */}
            <Dialog open={showNotaForm} onOpenChange={setShowNotaForm}>
                <DialogContent className="max-w-3xl" aria-describedby="nota-form-description">
                    <p id="nota-form-description" className="sr-only">Formulario para crear una nueva nota</p>
                    <DialogHeader>
                        <DialogTitle>Nueva Nota</DialogTitle>
                    </DialogHeader>
                    <NotaForm onSuccess={handleFormSuccess} onCancel={() => setShowNotaForm(false)} />
                </DialogContent>
            </Dialog>

            {/* Diálogo para crear evento */}
            <Dialog open={showEventoForm} onOpenChange={setShowEventoForm}>
                <DialogContent className="max-w-3xl" aria-describedby="evento-form-description">
                    <p id="evento-form-description" className="sr-only">Formulario para crear un nuevo evento</p>
                    <DialogHeader>
                        <DialogTitle>Nuevo Evento</DialogTitle>
                    </DialogHeader>
                    <EventoForm onSuccess={handleFormSuccess} onCancel={() => setShowEventoForm(false)} />
                </DialogContent>
            </Dialog>


            {/* Diálogo para mostrar detalles del evento */}
            <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Detalles de la Actividad</DialogTitle>
                    </DialogHeader>
                    {selectedEvent && (
                        <div className="space-y-4">
                            <CalendarEventCard event={selectedEvent} />

                            <div className="flex justify-end">
                                <Button onClick={navigateToDetails}>Ver Detalles</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

