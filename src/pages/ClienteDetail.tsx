"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ClienteCard } from "@/components/clientes/cliente-card"

import { ContactoCard } from "@/components/contactos/contacto-card"
import { ContactoForm } from "@/components/contactos/contacto-form"

import { TareaCard } from "@/components/tareas/tarea-card"
import { TareaForm } from "@/components/tareas/tarea-form"

import { SeguimientoCard } from "@/components/seguimientos/seguimiento-card"
import { SeguimientoForm } from "@/components/seguimientos/seguimiento-form"

import { NotaCard } from "@/components/notas/nota-card"
import { NotaForm } from "@/components/notas/nota-form"

import { getClienteById } from "@/services/clienteService"
import {
    getContactosByCliente,
    deleteContacto,
} from "@/services/contactoService"
import { getTareasByCliente, deleteTarea } from "@/services/tareaService"
import {
    getSeguimientosByCliente,
    deleteSeguimiento,
} from "@/services/seguimientoService"
import { getNotasByCliente, deleteNota } from "@/services/notaService"
import type { ContactoDTO } from "@/types/ContactoDTO"
import type { TareaDTO } from "@/types/TareaDTO"
import type { SeguimientoDTO } from "@/types/SeguimientoDTO"
import type { NotaDTO } from "@/types/NotaDTO"
import type { ClienteDTO } from "@/types/ClienteDTO"
import { Plus } from "lucide-react"

export default function ClienteDetallePage() {
    const params = useParams()
    const clienteId = params.id as string

    // ✅ Estados para datos del cliente y relaciones
    const [cliente, setCliente] = useState<ClienteDTO | null>(null)
    const [contactos, setContactos] = useState<ContactoDTO[]>([])
    const [tareas, setTareas] = useState<TareaDTO[]>([])
    const [seguimientos, setSeguimientos] = useState<SeguimientoDTO[]>([])
    const [notas, setNotas] = useState<NotaDTO[]>([])
    const [loading, setLoading] = useState(true)

    // ✅ Estados para formularios
    const [showContactoForm, setShowContactoForm] = useState(false)
    const [showTareaForm, setShowTareaForm] = useState(false)
    const [showSeguimientoForm, setShowSeguimientoForm] = useState(false)
    const [showNotaForm, setShowNotaForm] = useState(false)

    // ✅ Estados para edición
    const [editingContacto, setEditingContacto] = useState<ContactoDTO | null>(null)
    const [editingTarea, setEditingTarea] = useState<TareaDTO | null>(null)
    const [editingSeguimiento, setEditingSeguimiento] = useState<SeguimientoDTO | null>(null)
    const [editingNota, setEditingNota] = useState<NotaDTO | null>(null)

    // 🎯 Obtener datos del cliente y sus relaciones
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const clienteData = await getClienteById(Number(clienteId))
                const contactosData = await getContactosByCliente(Number(clienteId))
                const tareasData = await getTareasByCliente(Number(clienteId))
                const seguimientosData = await getSeguimientosByCliente(Number(clienteId))
                const notasData = await getNotasByCliente(Number(clienteId))

                setCliente(clienteData)
                setContactos(contactosData)
                setTareas(tareasData)
                setSeguimientos(seguimientosData)
                setNotas(notasData)
            } catch (error) {
                console.error("Error al obtener los datos del cliente:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [clienteId])

    // ✅ Sincronizar datos después de éxito en formularios
    const refreshData = async () => {
        const contactosData = await getContactosByCliente(Number(clienteId))
        const tareasData = await getTareasByCliente(Number(clienteId))
        const seguimientosData = await getSeguimientosByCliente(Number(clienteId))
        const notasData = await getNotasByCliente(Number(clienteId))

        setContactos(contactosData)
        setTareas(tareasData)
        setSeguimientos(seguimientosData)
        setNotas(notasData)
    }

    // ✅ Eliminar contacto
    const handleDeleteContacto = async (id: number) => {
        await deleteContacto(id)
        refreshData()
    }

    // ✅ Eliminar tarea
    const handleDeleteTarea = async (id: number) => {
        await deleteTarea(id)
        refreshData()
    }

    // ✅ Eliminar seguimiento
    const handleDeleteSeguimiento = async (id: number) => {
        await deleteSeguimiento(id)
        refreshData()
    }

    // ✅ Eliminar nota
    const handleDeleteNota = async (id: number) => {
        await deleteNota(id)
        refreshData()
    }

    // ✅ Renderizar estado de carga
    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    // ✅ Renderizar mensaje si no se encuentra el cliente
    if (!cliente) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Cliente no encontrado</h2>
                    <p className="text-muted-foreground">
                        El cliente que buscas no existe o fue eliminado.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {cliente.nombre}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <ClienteCard cliente={cliente} />
                </div>

                <div className="md:col-span-2">
                    <Tabs defaultValue="contactos">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="contactos">Contactos</TabsTrigger>
                            <TabsTrigger value="tareas">Tareas</TabsTrigger>
                            <TabsTrigger value="seguimientos">Seguimientos</TabsTrigger>
                            <TabsTrigger value="notas">Notas</TabsTrigger>
                        </TabsList>

                        {/* Tab de Contactos */}
                        <TabsContent value="contactos" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Contactos</h2>
                                <Button size="sm" onClick={() => setShowContactoForm(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nuevo Contacto
                                </Button>
                            </div>

                            {showContactoForm && (
                                <ContactoForm
                                    clienteId={clienteId}
                                    contacto={editingContacto || undefined}
                                    isEditing={!!editingContacto}
                                    onSuccess={() => {
                                        setShowContactoForm(false)
                                        setEditingContacto(null)
                                        refreshData()
                                    }}
                                    onCancel={() => {
                                        setShowContactoForm(false)
                                        setEditingContacto(null)
                                    }}
                                />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {contactos.map((contacto) => (
                                    <ContactoCard
                                        key={contacto.id}
                                        contacto={contacto}
                                        onEdit={(contacto) => {
                                            setEditingContacto(contacto)
                                            setShowContactoForm(true)
                                        }}
                                        onDelete={handleDeleteContacto}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Tab de Tareas */}
                        <TabsContent value="tareas" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Tareas</h2>
                                <Button size="sm" onClick={() => setShowTareaForm(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nueva Tarea
                                </Button>
                            </div>

                            {showTareaForm && (
                                <TareaForm
                                    clienteId={clienteId}
                                    tarea={editingTarea || undefined}
                                    isEditing={!!editingTarea}
                                    onSuccess={() => {
                                        setShowTareaForm(false)
                                        setEditingTarea(null)
                                        refreshData()
                                    }}
                                    onCancel={() => {
                                        setShowTareaForm(false)
                                        setEditingTarea(null)
                                    }}
                                />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tareas.map((tarea) => (
                                    <TareaCard
                                        key={tarea.id}
                                        tarea={tarea}
                                        onEdit={(tarea) => {
                                            setEditingTarea(tarea)
                                            setShowTareaForm(true)
                                        }}
                                        onDelete={handleDeleteTarea}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Tab de Seguimientos */}
                        <TabsContent value="seguimientos" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Seguimientos</h2>
                                <Button size="sm" onClick={() => setShowSeguimientoForm(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nuevo Seguimiento
                                </Button>
                            </div>

                            {showSeguimientoForm && (
                                <SeguimientoForm
                                    clienteId={clienteId}
                                    seguimiento={editingSeguimiento || undefined}
                                    isEditing={!!editingSeguimiento}
                                    onSuccess={() => {
                                        setShowSeguimientoForm(false)
                                        setEditingSeguimiento(null)
                                        refreshData()
                                    }}
                                    onCancel={() => {
                                        setShowSeguimientoForm(false)
                                        setEditingSeguimiento(null)
                                    }}
                                />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {seguimientos.map((seguimiento) => (
                                    <SeguimientoCard
                                        key={seguimiento.id}
                                        seguimiento={seguimiento}
                                        onEdit={(seguimiento) => {
                                            setEditingSeguimiento(seguimiento)
                                            setShowSeguimientoForm(true)
                                        }}
                                        onDelete={handleDeleteSeguimiento}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Tab de Notas */}
                        <TabsContent value="notas" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Notas</h2>
                                <Button size="sm" onClick={() => setShowNotaForm(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nueva Nota
                                </Button>
                            </div>

                            {showNotaForm && (
                                <NotaForm
                                    clienteId={clienteId}
                                    nota={editingNota || undefined}
                                    isEditing={!!editingNota}
                                    onSuccess={() => {
                                        setShowNotaForm(false)
                                        setEditingNota(null)
                                        refreshData()
                                    }}
                                    onCancel={() => {
                                        setShowNotaForm(false)
                                        setEditingNota(null)
                                    }}
                                />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {notas.map((nota) => (
                                    <NotaCard
                                        key={nota.id}
                                        nota={nota}
                                        onEdit={(nota) => {
                                            setEditingNota(nota)
                                            setShowNotaForm(true)
                                        }}
                                        onDelete={handleDeleteNota}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
