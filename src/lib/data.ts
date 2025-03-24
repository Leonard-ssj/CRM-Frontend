import type { Cliente, Contacto, Nota, Seguimiento, Tarea, Usuario, DashboardStats, Evento } from "@/types"

// Usuarios de ejemplo
export const usuarios: Usuario[] = [
    {
        id: "1",
        nombre: "Admin Usuario",
        email: "admin@ejemplo.com",
        rol: "ADMIN",
        ultimoAcceso: "2025-03-22T15:30:00Z",
    },
    {
        id: "2",
        nombre: "Vendedor Usuario",
        email: "vendedor@ejemplo.com",
        rol: "VENDEDOR",
        ultimoAcceso: "2025-03-21T10:15:00Z",
    },
]

// Clientes de ejemplo
export const clientes: Cliente[] = [
    {
        id: "1",
        nombre: "Empresa ABC",
        email: "contacto@abc.com",
        telefono: "555-1234",
        empresa: "ABC Inc.",
        ubicacion: "Ciudad de México",
        fechaCreacion: "2023-01-15T10:30:00Z",
        creadoPor: "1",
    },
    {
        id: "2",
        nombre: "Corporación XYZ",
        email: "info@xyz.com",
        telefono: "555-5678",
        empresa: "XYZ Corp",
        ubicacion: "Guadalajara",
        fechaCreacion: "2023-02-20T14:45:00Z",
        creadoPor: "2",
    },
    {
        id: "3",
        nombre: "Industrias 123",
        email: "ventas@123.com",
        telefono: "555-9012",
        empresa: "123 Industries",
        ubicacion: "Monterrey",
        fechaCreacion: "2023-03-10T09:15:00Z",
        creadoPor: "1",
    },
    {
        id: "4",
        nombre: "Grupo Innovación",
        email: "contacto@innovacion.com",
        telefono: "555-3456",
        empresa: "Innovación SA",
        ubicacion: "Puebla",
        fechaCreacion: "2023-04-05T11:20:00Z",
        creadoPor: "2",
    },
    {
        id: "5",
        nombre: "Soluciones Técnicas",
        email: "info@soluciones.com",
        telefono: "555-7890",
        empresa: "Soluciones Tech",
        ubicacion: "Querétaro",
        fechaCreacion: "2023-05-12T16:30:00Z",
        creadoPor: "1",
    },
]

// Contactos de ejemplo
export const contactos: Contacto[] = [
    {
        id: "1",
        nombre: "Juan Pérez",
        email: "juan@abc.com",
        telefono: "555-1111",
        puesto: "Director General",
        clienteId: "1",
        notas: "Contacto principal",
    },
    {
        id: "2",
        nombre: "María López",
        email: "maria@abc.com",
        telefono: "555-2222",
        puesto: "Gerente de Ventas",
        clienteId: "1",
    },
    {
        id: "3",
        nombre: "Carlos Rodríguez",
        email: "carlos@xyz.com",
        telefono: "555-3333",
        puesto: "Director de Operaciones",
        clienteId: "2",
        notas: "Prefiere comunicación por email",
    },
]

// Tareas de ejemplo
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
]

// Seguimientos de ejemplo
export const seguimientos: Seguimiento[] = [
    {
        id: "1",
        tipo: "llamada",
        fecha: "2023-06-10T11:30:00Z",
        comentarios: "Cliente interesado en ampliar servicios. Solicita reunión presencial.",
        clienteId: "1",
        usuarioId: "2",
    },
    {
        id: "2",
        tipo: "correo",
        fecha: "2023-06-12T09:45:00Z",
        comentarios: "Envío de información adicional sobre servicios premium.",
        clienteId: "1",
        usuarioId: "2",
    },
]

// Notas de ejemplo
export const notas: Nota[] = [
    {
        id: "1",
        contenido: "Cliente potencial para expansión de servicios en el próximo trimestre.",
        fecha: "2023-06-08T13:40:00Z",
        clienteId: "1",
        usuarioId: "2",
    },
    {
        id: "2",
        contenido: "Requiere atención especial en temas de soporte técnico.",
        fecha: "2023-06-09T10:25:00Z",
        clienteId: "1",
        usuarioId: "1",
    },
]

// Eventos próximos
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

// Estadísticas para el dashboard
export const dashboardStats: DashboardStats = {
    totalClientes: clientes.length,
    totalContactos: contactos.length,
    totalTareas: tareas.length,
    tareasActivas: tareas.filter((t) => t.estado === "en progreso").length,
    tareasPendientes: tareas.filter((t) => t.estado === "pendiente").length,
    tareasCompletadas: tareas.filter((t) => t.estado === "completada").length,
    seguimientosHoy: 3, // Número ficticio para ejemplo
    ultimoAcceso: usuarios[0].ultimoAcceso,
}

// Función para obtener contactos por cliente
export const getContactosByClienteId = (clienteId: string): Contacto[] => {
    return contactos.filter((contacto) => contacto.clienteId === clienteId)
}

// Función para obtener tareas por cliente
export const getTareasByClienteId = (clienteId: string): Tarea[] => {
    return tareas.filter((tarea) => tarea.clienteId === clienteId)
}

// Función para obtener seguimientos por cliente
export const getSeguimientosByClienteId = (clienteId: string): Seguimiento[] => {
    return seguimientos.filter((seguimiento) => seguimiento.clienteId === clienteId)
}

// Función para obtener notas por cliente
export const getNotasByClienteId = (clienteId: string): Nota[] => {
    return notas.filter((nota) => nota.clienteId === clienteId)
}

// Función para obtener un cliente por ID
export const getClienteById = (id: string): Cliente | undefined => {
    return clientes.find((cliente) => cliente.id === id)
}

// Función para obtener un usuario por ID
export const getUsuarioById = (id: string): Usuario | undefined => {
    return usuarios.find((usuario) => usuario.id === id)
}

// Función para obtener tareas pendientes
export const getTareasPendientes = (): Tarea[] => {
    return tareas
        .filter((tarea) => tarea.estado === "pendiente" || tarea.estado === "en progreso")
        .sort((a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime())
}

// Función para obtener eventos próximos
export const getEventosProximos = (): Evento[] => {
    return eventos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
}

