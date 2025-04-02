"use client"

import { useState, useEffect } from "react"
import type { Usuario, Cliente, Contacto, Tarea, Seguimiento, Nota } from "@/types"
import {
    clientes,
    usuarios,
    getClienteById,
    getContactosByClienteId,
    getTareasByClienteId,
    getSeguimientosByClienteId,
    getNotasByClienteId,
} from "./data"
import { ClienteDTO } from "@/types/ClienteDTO"
import { getClientes } from "@/services/clienteService"

// Hook para obtener el usuario actual
export function useCurrentUser() {
    const [user, setUser] = useState<Usuario | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulación de carga de usuario
        setTimeout(() => {
            setUser(usuarios[0]) // Usuario admin por defecto
            setLoading(false)
        }, 500)
    }, [])

    return { user, loading }
}

// Hook para obtener todos los clientes
export function useClientes() {
    const [clientes, setClientes] = useState<ClienteDTO[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await getClientes()
                setClientes(data)
            } catch (error) {
                console.error("Error al obtener clientes:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchClientes()
    }, [])

    return { clientes, loading }
}

// Hook para obtener un cliente por ID
export function useCliente(id: string) {
    const [cliente, setCliente] = useState<Cliente | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulación de carga de cliente
        setTimeout(() => {
            const foundCliente = getClienteById(id)
            setCliente(foundCliente || null)
            setLoading(false)
        }, 500)
    }, [id])

    return { cliente, loading }
}

// Hook para obtener contactos por cliente
export function useContactos(clienteId: string) {
    const [contactos, setContactos] = useState<Contacto[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulación de carga de contactos
        setTimeout(() => {
            setContactos(getContactosByClienteId(clienteId))
            setLoading(false)
        }, 500)
    }, [clienteId])

    return { contactos, loading }
}

// Hook para obtener tareas por cliente
export function useTareas(clienteId: string) {
    const [tareas, setTareas] = useState<Tarea[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulación de carga de tareas
        setTimeout(() => {
            setTareas(getTareasByClienteId(clienteId))
            setLoading(false)
        }, 500)
    }, [clienteId])

    return { tareas, loading }
}

// Hook para obtener seguimientos por cliente
export function useSeguimientos(clienteId: string) {
    const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulación de carga de seguimientos
        setTimeout(() => {
            setSeguimientos(getSeguimientosByClienteId(clienteId))
            setLoading(false)
        }, 500)
    }, [clienteId])

    return { seguimientos, loading }
}

// Hook para obtener notas por cliente
export function useNotas(clienteId: string) {
    const [notas, setNotas] = useState<Nota[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulación de carga de notas
        setTimeout(() => {
            setNotas(getNotasByClienteId(clienteId))
            setLoading(false)
        }, 500)
    }, [clienteId])

    return { notas, loading }
}

