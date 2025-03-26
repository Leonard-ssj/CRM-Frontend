import type { Tarea } from "@/types"
import { clientes, usuarios } from "./data"

// Tareas de ejemplo (ya existen en data.ts, pero las replicamos aquí para tener funciones específicas)
export const tareas: Tarea[] = [
    {
        id: "1",
        titulo: "Presentar propuesta comercial",
        descripcion: "Preparar y enviar propuesta comercial para nuevo proyecto",
        fechaLimite: "2023-06-15T17:00:00Z",
        estado: "completada",
        clienteId: "1",
        asignadoA: "2",
    },
    {
        id: "2",
        titulo: "Llamada de seguimiento",
        descripcion: "Realizar llamada para dar seguimiento a la propuesta enviada",
        fechaLimite: "2025-03-25T10:00:00Z",
        estado: "pendiente",
        clienteId: "1",
        asignadoA: "2",
    },
    {
        id: "3",
        titulo: "Reunión Zoom",
        descripcion: "Reunión virtual para presentar nuevos servicios",
        fechaLimite: "2025-03-26T14:00:00Z",
        estado: "en progreso",
        clienteId: "2",
        asignadoA: "1",
    },
    {
        id: "4",
        titulo: "Enviar cotización",
        descripcion: "Preparar y enviar cotización para servicios solicitados",
        fechaLimite: "2025-03-27T12:00:00Z",
        estado: "pendiente",
        clienteId: "3",
        asignadoA: "2",
    },
    {
        id: "5",
        titulo: "Actualizar datos de cliente",
        descripcion: "Verificar y actualizar información de contacto",
        fechaLimite: "2025-03-24T16:00:00Z",
        estado: "en progreso",
        clienteId: "4",
        asignadoA: "1",
    },
    {
        id: "6",
        titulo: "Preparar presentación de ventas",
        descripcion: "Crear presentación para reunión con cliente potencial",
        fechaLimite: "2025-03-29T09:00:00Z",
        estado: "pendiente",
        clienteId: "5",
        asignadoA: "2",
    },
    {
        id: "7",
        titulo: "Revisar contrato",
        descripcion: "Revisar términos del contrato con departamento legal",
        fechaLimite: "2025-03-30T11:00:00Z",
        estado: "en progreso",
        clienteId: "2",
        asignadoA: "1",
    },
]

// Función para obtener todas las tareas
export const getTareas = () => tareas

// Función para obtener una tarea por ID
export const getTareaById = (id: string) => tareas.find((tarea) => tarea.id === id)

// Función para obtener tareas por cliente
export const getTareasByClienteId = (clienteId: string) => tareas.filter((tarea) => tarea.clienteId === clienteId)

// Función para obtener tareas por usuario asignado
export const getTareasByUsuarioId = (usuarioId: string) => tareas.filter((tarea) => tarea.asignadoA === usuarioId)

// Función para obtener tareas por estado
export const getTareasByEstado = (estado: "pendiente" | "en progreso" | "completada") =>
    tareas.filter((tarea) => tarea.estado === estado)

// Función para obtener el nombre del cliente por ID
export const getClienteNombreById = (clienteId: string) => {
    const cliente = clientes.find((c) => c.id === clienteId)
    return cliente ? cliente.nombre : "Cliente no encontrado"
}

// Función para obtener el nombre del usuario por ID
export const getUsuarioNombreById = (usuarioId: string) => {
    const usuario = usuarios.find((u) => u.id === usuarioId)
    return usuario ? usuario.nombre : "Usuario no encontrado"
}

// Función para agregar una nueva tarea (simulada)
export const addTarea = (tarea: Omit<Tarea, "id">) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la creación de un nuevo ID
    const newId = (tareas.length + 1).toString()
    const newTarea = { ...tarea, id: newId }

    // En una aplicación real, esto actualizaría la base de datos
    // Aquí solo simulamos agregando al array en memoria
    tareas.push(newTarea)

    return newTarea
}

// Función para actualizar una tarea existente (simulada)
export const updateTarea = (id: string, tarea: Omit<Tarea, "id">) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la actualización
    const index = tareas.findIndex((t) => t.id === id)

    if (index !== -1) {
        tareas[index] = { ...tarea, id }
        return tareas[index]
    }

    return null
}

// Función para eliminar una tarea (simulada)
export const deleteTarea = (id: string) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la eliminación
    const index = tareas.findIndex((t) => t.id === id)

    if (index !== -1) {
        const deletedTarea = tareas[index]
        tareas.splice(index, 1)
        return deletedTarea
    }

    return null
}

