import type { Contacto } from "@/types"
import { clientes } from "./data"

// Contactos de ejemplo
export const contactos: Contacto[] = [
    {
        id: "1",
        nombre: "Juan Pérez",
        email: "juan@abc.com",
        telefono: "555-1111",
        puesto: "Director General",
        clienteId: "1",
        notas: "Contacto principal para proyectos estratégicos",
    },
    {
        id: "2",
        nombre: "María López",
        email: "maria@abc.com",
        telefono: "555-2222",
        puesto: "Gerente de Ventas",
        clienteId: "1",
        notas: "Prefiere comunicación por teléfono",
    },
    {
        id: "3",
        nombre: "Carlos Rodríguez",
        email: "carlos@xyz.com",
        telefono: "555-3333",
        puesto: "Director de Operaciones",
        clienteId: "2",
        notas: "Disponible principalmente por las mañanas",
    },
    {
        id: "4",
        nombre: "Ana Martínez",
        email: "ana@123.com",
        telefono: "555-4444",
        puesto: "Gerente de Compras",
        clienteId: "3",
        notas: "Contacto para temas de facturación",
    },
    {
        id: "5",
        nombre: "Roberto Sánchez",
        email: "roberto@innovacion.com",
        telefono: "555-5555",
        puesto: "Director de Tecnología",
        clienteId: "4",
        notas: "Interesado en nuevas soluciones tecnológicas",
    },
    {
        id: "6",
        nombre: "Laura Gómez",
        email: "laura@soluciones.com",
        telefono: "555-6666",
        puesto: "Gerente de Marketing",
        clienteId: "5",
        notas: "Coordina campañas promocionales",
    },
]

// Función para obtener contactos
export const getContactos = () => contactos

// Función para obtener un contacto por ID
export const getContactoById = (id: string) => contactos.find((contacto) => contacto.id === id)

// Función para obtener contactos por cliente
export const getContactosByClienteId = (clienteId: string) =>
    contactos.filter((contacto) => contacto.clienteId === clienteId)

// Función para obtener el nombre del cliente por ID
export const getClienteNombreById = (clienteId: string) => {
    const cliente = clientes.find((c) => c.id === clienteId)
    return cliente ? cliente.nombre : "Cliente no encontrado"
}

// Función para agregar un nuevo contacto (simulada)
export const addContacto = (contacto: Omit<Contacto, "id">) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la creación de un nuevo ID
    const newId = (contactos.length + 1).toString()
    const newContacto = { ...contacto, id: newId }

    // En una aplicación real, esto actualizaría la base de datos
    // Aquí solo simulamos agregando al array en memoria
    contactos.push(newContacto)

    return newContacto
}

// Función para actualizar un contacto existente (simulada)
export const updateContacto = (id: string, contacto: Omit<Contacto, "id">) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la actualización
    const index = contactos.findIndex((c) => c.id === id)

    if (index !== -1) {
        contactos[index] = { ...contacto, id }
        return contactos[index]
    }

    return null
}

// Función para eliminar un contacto (simulada)
export const deleteContacto = (id: string) => {
    // En una aplicación real, esto sería una llamada a la API
    // Aquí solo simulamos la eliminación
    const index = contactos.findIndex((c) => c.id === id)

    if (index !== -1) {
        const deletedContacto = contactos[index]
        contactos.splice(index, 1)
        return deletedContacto
    }

    return null
}

