import type { Evento } from "@/types"
import { clientes } from "./data"

// Eventos de ejemplo (ya existen en data.ts, pero los replicamos aquí para tener funciones específicas)
export const eventos: Evento[] = [
    {
        id: "1",
        titulo: "Reunión con equipo de ventas",
        fecha: "2025-03-26T09:00:00Z",
        descripcion: "Revisión de objetivos trimestrales",
        tipo: "reunion",
    },
    {
        id: "2",
        titulo: "Llamada con cliente: Tienda XYZ",
        fecha: "2025-03-28T11:30:00Z",
        descripcion: "Seguimiento de implementación",
        tipo: "llamada",
        clienteId: "2",
    },
    {
        id: "3",
        titulo: "Presentación de nuevos productos",
        fecha: "2025-04-02T15:00:00Z",
        descripcion: "Demostración de nuevas funcionalidades",
        tipo: "presentacion",
    },
]

// Función para obtener todos los eventos
export const getEventos = () => eventos

// Función para obtener un evento por ID
export const getEventoById = (id: string) => eventos.find((evento) => evento.id === id)

// Función para obtener eventos por cliente
export const getEventosByClienteId = (clienteId: string) => eventos.filter((evento) => evento.clienteId === clienteId)

// Función para obtener el nombre del cliente por ID
export const getClienteNombreById = (clienteId?: string) => {
    if (!clienteId) return "Sin cliente"
    const cliente = clientes.find((c) => c.id === clienteId)
    return cliente ? cliente.nombre : "Cliente no encontrado"
}

// Función para agregar un nuevo evento (simulada)
export const addEvento = (evento: Omit<Evento, "id">) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la creación de un nuevo ID
    const newId = (eventos.length + 1).toString()
    const newEvento = { ...evento, id: newId }

    // En una aplicación real, esto actualizaría la base de datos
    // Aquí solo simulamos agregando al array en memoria
    eventos.push(newEvento)

    return newEvento
}

// Función para actualizar un evento existente (simulada)
export const updateEvento = (id: string, evento: Omit<Evento, "id">) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la actualización
    const index = eventos.findIndex((e) => e.id === id)

    if (index !== -1) {
        eventos[index] = { ...evento, id }
        return eventos[index]
    }

    return null
}

// Función para eliminar un evento (simulada)
export const deleteEvento = (id: string) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la eliminación
    const index = eventos.findIndex((e) => e.id === id)

    if (index !== -1) {
        const deletedEvento = eventos[index]
        eventos.splice(index, 1)
        return deletedEvento
    }

    return null
}

