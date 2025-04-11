"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CalendarEventCard } from "./calendar-event-card"

import { fetchAllCalendarEvents } from "@/services/calendarService"
import { getEventsByDate, CalendarEvent } from "@/lib/calendarUtils"

import { CalendarView } from "./calendar-view"

import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EventoForm } from "@/components/calendario/evento-form"
import { Link, useNavigate } from "react-router-dom"

export function CalendarDashboard() {
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([])
    const [showEventoForm, setShowEventoForm] = useState(false)

    // Cargar eventos
    useEffect(() => {
        async function fetchEvents() {
            const allEvents = await fetchAllCalendarEvents()
            setEvents(allEvents)
        }

        fetchEvents()
    }, [])



    // Filtrar eventos por fecha seleccionada
    useEffect(() => {
        const filteredEvents = getEventsByDate(events, selectedDate)
        setDayEvents(filteredEvents)
    }, [events, selectedDate])

    // Manejar éxito en formulario
    const handleFormSuccess = () => {
        setShowEventoForm(false)
        fetchAllCalendarEvents().then(setEvents)
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna izquierda: Mini calendario y eventos del día */}
            <div className="md:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Calendario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => date && setSelectedDate(date)}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Eventos del día</CardTitle>
                        <Button size="sm" onClick={() => setShowEventoForm(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {dayEvents.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-muted-foreground">No hay eventos para este día</p>
                                <Button variant="link" onClick={() => setShowEventoForm(true)}>
                                    Agregar evento
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {dayEvents.map((event) => (
                                    <CalendarEventCard
                                        key={event.id}
                                        event={event}
                                        onClick={() => {
                                            const id = event.id.split("-")[1]
                                            if (event.type === "evento") {
                                                navigate(`/eventos/${id}`)
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Columna derecha: Vista de calendario completa */}
            <div className="md:col-span-2">
                <Tabs defaultValue="calendar">
                    <TabsList className="mb-4">
                        <TabsTrigger value="calendar">Calendario</TabsTrigger>
                        <TabsTrigger value="events">Lista de Eventos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="calendar">
                        <Card>
                            <CardContent className="p-4">
                                <CalendarView refreshKey={events.length} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="events">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle>Próximos Eventos</CardTitle>
                                <Link to="/eventos">
                                    <Button variant="outline" size="sm">
                                        Ver todos
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {events
                                        .filter((event) => event.type === "evento")
                                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                                        .slice(0, 5)
                                        .map((event) => (
                                            <CalendarEventCard
                                                key={event.id}
                                                event={event}
                                                onClick={() => {
                                                    const id = event.id.split("-")[1]
                                                    navigate(`/eventos/${id}`)
                                                }}
                                            />
                                        ))}
                                    <div className="text-center pt-2">
                                        <Link to="/eventos/new">
                                            <Button>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Nuevo Evento
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Diálogo para crear evento */}
            <Dialog open={showEventoForm} onOpenChange={setShowEventoForm}>
                <DialogContent className="max-w-3xl" aria-describedby="evento-dashboard-form-description">
                    <p id="evento-dashboard-form-description" className="sr-only">
                        Formulario para crear un nuevo evento desde el calendario principal
                    </p>
                    <DialogHeader>
                        <DialogTitle>Nuevo Evento</DialogTitle>
                    </DialogHeader>
                    <EventoForm onSuccess={handleFormSuccess} onCancel={() => setShowEventoForm(false)} />
                </DialogContent>
            </Dialog>

        </div>
    )
}

