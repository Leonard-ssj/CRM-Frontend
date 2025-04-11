import { CalendarEvent } from "@/lib/calendarUtils"
import { getEventos } from "./eventosService"
import { getTareasAsignadas } from "./tareaService"

export async function fetchAllCalendarEvents(): Promise<CalendarEvent[]> {
    const events: CalendarEvent[] = []

    const [tareas, eventos] = await Promise.all([
        getTareasAsignadas(),
        getEventos(),
    ])

    // Convertir tareas a eventos de calendario
    tareas.forEach((tarea) => {
        events.push({
            id: `tarea-${tarea.id}`,
            title: tarea.titulo,
            date: new Date(tarea.fechaLimite),
            time: tarea.fechaLimite,
            type: "tarea",
            clienteId: String(tarea.clienteId),
            clienteName: tarea.clienteNombre, // ya viene desde el backend
            usuarioId: String(tarea.asignadoA),
            usuarioName: tarea.asignadoANombre, // si lo tienes
            description: tarea.descripcion,
            estado: tarea.estado,
        })
    })

    // Convertir eventos a eventos de calendario
    eventos.forEach((evento) => {
        events.push({
            id: `evento-${evento.id}`,
            title: evento.titulo,
            date: new Date(evento.fecha),
            time: evento.fecha,
            type: "evento",
            clienteId: String(evento.clienteId),
            clienteName: evento.clienteNombre,
            description: evento.descripcion,
        })
    })

    return events
}
