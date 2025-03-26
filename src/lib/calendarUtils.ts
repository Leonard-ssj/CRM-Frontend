import { tareas, seguimientos, notas, eventos, getClienteById, getUsuarioById } from "@/lib/data"
import { formatDate } from "@/lib/utils"

// Tipo para representar un evento en el calendario (unifica los diferentes tipos de datos)
export type CalendarEvent = {
    id: string
    title: string
    date: Date
    time: string
    type: "tarea" | "seguimiento" | "nota" | "evento"
    clienteId?: string
    clienteName?: string
    usuarioId?: string
    usuarioName?: string
    description?: string
    estado?: string
}

// Función para obtener todos los eventos del calendario
export function getAllCalendarEvents(): CalendarEvent[] {
    const calendarEvents: CalendarEvent[] = []

    // Convertir tareas a eventos de calendario
    tareas.forEach((tarea) => {
        const date = new Date(tarea.fechaLimite)
        const cliente = getClienteById(tarea.clienteId)
        const usuario = getUsuarioById(tarea.asignadoA)

        calendarEvents.push({
            id: `tarea-${tarea.id}`,
            title: tarea.titulo,
            date,
            time: formatDate(tarea.fechaLimite),
            type: "tarea",
            clienteId: tarea.clienteId,
            clienteName: cliente?.nombre,
            usuarioId: tarea.asignadoA,
            usuarioName: usuario?.nombre,
            description: tarea.descripcion,
            estado: tarea.estado,
        })
    })

    // Convertir seguimientos a eventos de calendario
    seguimientos.forEach((seguimiento) => {
        const date = new Date(seguimiento.fecha)
        const cliente = getClienteById(seguimiento.clienteId)
        const usuario = getUsuarioById(seguimiento.usuarioId)

        calendarEvents.push({
            id: `seguimiento-${seguimiento.id}`,
            title: `Seguimiento: ${seguimiento.tipo}`,
            date,
            time: formatDate(seguimiento.fecha),
            type: "seguimiento",
            clienteId: seguimiento.clienteId,
            clienteName: cliente?.nombre,
            usuarioId: seguimiento.usuarioId,
            usuarioName: usuario?.nombre,
            description: seguimiento.comentarios,
        })
    })

    // Convertir notas a eventos de calendario
    notas.forEach((nota) => {
        const date = new Date(nota.fecha)
        const cliente = getClienteById(nota.clienteId)
        const usuario = getUsuarioById(nota.usuarioId)

        calendarEvents.push({
            id: `nota-${nota.id}`,
            title: `Nota: ${nota.contenido.substring(0, 30)}${nota.contenido.length > 30 ? "..." : ""}`,
            date,
            time: formatDate(nota.fecha),
            type: "nota",
            clienteId: nota.clienteId,
            clienteName: cliente?.nombre,
            usuarioId: nota.usuarioId,
            usuarioName: usuario?.nombre,
            description: nota.contenido,
        })
    })

    // Convertir eventos a eventos de calendario
    eventos.forEach((evento) => {
        const date = new Date(evento.fecha)
        const cliente = evento.clienteId ? getClienteById(evento.clienteId) : undefined

        calendarEvents.push({
            id: `evento-${evento.id}`,
            title: evento.titulo,
            date,
            time: formatDate(evento.fecha),
            type: "evento",
            clienteId: evento.clienteId,
            clienteName: cliente?.nombre,
            description: evento.descripcion,
        })
    })

    // Ordenar eventos por fecha
    return calendarEvents.sort((a, b) => a.date.getTime() - b.date.getTime())
}

// Función para filtrar eventos por fecha
export function getEventsByDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
    return events.filter((event) => {
        return (
            event.date.getDate() === date.getDate() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getFullYear() === date.getFullYear()
        )
    })
}

// Función para filtrar eventos por semana
export function getEventsByWeek(events: CalendarEvent[], date: Date): CalendarEvent[] {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay()) // Domingo como inicio de semana

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // Sábado como fin de semana

    return events.filter((event) => {
        return event.date >= startOfWeek && event.date <= endOfWeek
    })
}

// Función para filtrar eventos por mes
export function getEventsByMonth(events: CalendarEvent[], date: Date): CalendarEvent[] {
    return events.filter((event) => {
        return event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear()
    })
}

// Función para obtener el primer día del mes
export function getFirstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

// Función para obtener el último día del mes
export function getLastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

// Función para obtener los días de la semana
export function getDaysOfWeek(): string[] {
    return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
}

// Función para obtener los nombres de los meses
export function getMonthNames(): string[] {
    return [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ]
}

// Función para agrupar eventos por hora
export function groupEventsByHour(events: CalendarEvent[]): Record<string, CalendarEvent[]> {
    const groupedEvents: Record<string, CalendarEvent[]> = {}

    events.forEach((event) => {
        const hour = event.date.getHours().toString().padStart(2, "0") + ":00"

        if (!groupedEvents[hour]) {
            groupedEvents[hour] = []
        }

        groupedEvents[hour].push(event)
    })

    return groupedEvents
}

// Función para obtener el color según el tipo de evento
export function getEventColor(type: string): string {
    switch (type) {
        case "evento":
            return "bg-blue-500"
        case "tarea":
            return "bg-yellow-500"
        case "seguimiento":
            return "bg-green-500"
        case "nota":
            return "bg-gray-500"
        default:
            return "bg-primary"
    }
}

// Función para obtener el icono según el tipo de evento
export function getEventIcon(type: string): string {
    switch (type) {
        case "evento":
            return "calendar"
        case "tarea":
            return "check-square"
        case "seguimiento":
            return "message-circle"
        case "nota":
            return "file-text"
        default:
            return "calendar"
    }
}

