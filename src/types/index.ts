export type Usuario = {
    id: string
    nombre: string
    email: string
    rol: "ADMIN" | "VENDEDOR"
    ultimoAcceso?: string
}

export type Cliente = {
    id: string
    nombre: string
    email: string
    telefono: string
    empresa?: string
    ubicacion?: string
    fechaCreacion: string
    creadoPor: string
}

export type Contacto = {
    id: string
    nombre: string
    email: string
    telefono: string
    puesto?: string
    clienteId: string
    notas?: string
}

export type Tarea = {
    id: string
    titulo: string
    descripcion: string
    fechaLimite: string
    estado: "pendiente" | "en progreso" | "completada"
    clienteId: string
    asignadoA: string
}

export type Seguimiento = {
    id: string
    tipo: "llamada" | "correo" | "reunión"
    fecha: string
    comentarios: string
    clienteId: string
    usuarioId: string
}

export type Nota = {
    id: string
    contenido: string
    fecha: string
    clienteId: string
    usuarioId: string
}

export type Evento = {
    id: string
    titulo: string
    fecha: string
    descripcion?: string
    tipo: "reunion" | "llamada" | "presentacion" | "otro"
    clienteId?: string
}

export type DashboardStats = {
    totalClientes: number
    totalContactos: number
    totalTareas: number
    tareasActivas: number
    tareasPendientes: number
    tareasCompletadas: number
    seguimientosHoy: number
    ultimoAcceso?: string
}

