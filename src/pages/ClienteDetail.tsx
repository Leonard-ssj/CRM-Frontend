"use client"

import { useState } from "react"
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
import { useCliente, useContactos, useTareas, useSeguimientos, useNotas } from "@/lib/hooks"
import type { Contacto, Tarea, Seguimiento, Nota } from "@/types"
import { Plus } from "lucide-react"

export default function ClienteDetail() {
    const params = useParams()
    const clienteId = params.id as string

    // Estados para mostrar/ocultar formularios
    const [showContactoForm, setShowContactoForm] = useState(false)
    const [showTareaForm, setShowTareaForm] = useState(false)
    const [showSeguimientoForm, setShowSeguimientoForm] = useState(false)
    const [showNotaForm, setShowNotaForm] = useState(false)

    // Estados para edición
    const [editingContacto, setEditingContacto] = useState<Contacto | null>(null)
    const [editingTarea, setEditingTarea] = useState<Tarea | null>(null)
    const [editingSeguimiento, setEditingSeguimiento] = useState<Seguimiento | null>(null)
    const [editingNota, setEditingNota] = useState<Nota | null>(null)

    // Obtener datos del cliente y sus relaciones
    const { cliente, loading: loadingCliente } = useCliente(clienteId)
    const { contactos, loading: loadingContactos } = useContactos(clienteId)
    const { tareas, loading: loadingTareas } = useTareas(clienteId)
    const { seguimientos, loading: loadingSeguimientos } = useSeguimientos(clienteId)
    const { notas, loading: loadingNotas } = useNotas(clienteId)

    // Manejadores para edición
    const handleEditContacto = (contacto: Contacto) => {
        setEditingContacto(contacto)
        setShowContactoForm(true)
    }

    const handleEditTarea = (tarea: Tarea) => {
        setEditingTarea(tarea)
        setShowTareaForm(true)
    }

    const handleEditSeguimiento = (seguimiento: Seguimiento) => {
        setEditingSeguimiento(seguimiento)
        setShowSeguimientoForm(true)
    }

    const handleEditNota = (nota: Nota) => {
        setEditingNota(nota)
        setShowNotaForm(true)
    }

    // Manejadores para cancelar formularios
    const handleCancelContactoForm = () => {
        setShowContactoForm(false)
        setEditingContacto(null)
    }

    const handleCancelTareaForm = () => {
        setShowTareaForm(false)
        setEditingTarea(null)
    }

    const handleCancelSeguimientoForm = () => {
        setShowSeguimientoForm(false)
        setEditingSeguimiento(null)
    }

    const handleCancelNotaForm = () => {
        setShowNotaForm(false)
        setEditingNota(null)
    }

    // Manejadores para éxito en formularios
    const handleContactoSuccess = () => {
        setShowContactoForm(false)
        setEditingContacto(null)
    }

    const handleTareaSuccess = () => {
        setShowTareaForm(false)
        setEditingTarea(null)
    }

    const handleSeguimientoSuccess = () => {
        setShowSeguimientoForm(false)
        setEditingSeguimiento(null)
    }

    const handleNotaSuccess = () => {
        setShowNotaForm(false)
        setEditingNota(null)
    }

    // Renderizar estado de carga
    if (loadingCliente) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Renderizar mensaje si no se encuentra el cliente
    if (!cliente) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Cliente no encontrado</h2>
                    <p className="text-muted-foreground">El cliente que estás buscando no existe o ha sido eliminado.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">{cliente.nombre}</h1>
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
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        setEditingContacto(null)
                                        setShowContactoForm(true)
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nuevo Contacto
                                </Button>
                            </div>

                            {showContactoForm && (
                                <div className="border rounded-lg p-4 bg-white mb-4">
                                    <ContactoForm
                                        clienteId={clienteId}
                                        contacto={editingContacto || undefined}
                                        isEditing={!!editingContacto}
                                        onSuccess={handleContactoSuccess}
                                        onCancel={handleCancelContactoForm}
                                    />
                                </div>
                            )}

                            {loadingContactos ? (
                                <div className="h-40 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : contactos.length === 0 ? (
                                <div className="h-40 flex items-center justify-center text-center">
                                    <div>
                                        <p className="text-muted-foreground">No hay contactos registrados.</p>
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setEditingContacto(null)
                                                setShowContactoForm(true)
                                            }}
                                        >
                                            Agregar un contacto
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {contactos.map((contacto) => (
                                        <ContactoCard
                                            key={contacto.id}
                                            contacto={contacto}
                                            onEdit={handleEditContacto}
                                            onDelete={(id) => console.log("Eliminar contacto", id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Tab de Tareas */}
                        <TabsContent value="tareas" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Tareas</h2>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        setEditingTarea(null)
                                        setShowTareaForm(true)
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nueva Tarea
                                </Button>
                            </div>

                            {showTareaForm && (
                                <div className="border rounded-lg p-4 bg-white mb-4">
                                    <TareaForm
                                        clienteId={clienteId}
                                        tarea={editingTarea || undefined}
                                        isEditing={!!editingTarea}
                                        onSuccess={handleTareaSuccess}
                                        onCancel={handleCancelTareaForm}
                                    />
                                </div>
                            )}

                            {loadingTareas ? (
                                <div className="h-40 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : tareas.length === 0 ? (
                                <div className="h-40 flex items-center justify-center text-center">
                                    <div>
                                        <p className="text-muted-foreground">No hay tareas registradas.</p>
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setEditingTarea(null)
                                                setShowTareaForm(true)
                                            }}
                                        >
                                            Agregar una tarea
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tareas.map((tarea) => (
                                        <TareaCard
                                            key={tarea.id}
                                            tarea={tarea}
                                            onEdit={handleEditTarea}
                                            onDelete={(id) => console.log("Eliminar tarea", id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Tab de Seguimientos */}
                        <TabsContent value="seguimientos" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Seguimientos</h2>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        setEditingSeguimiento(null)
                                        setShowSeguimientoForm(true)
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nuevo Seguimiento
                                </Button>
                            </div>

                            {showSeguimientoForm && (
                                <div className="border rounded-lg p-4 bg-white mb-4">
                                    <SeguimientoForm
                                        clienteId={clienteId}
                                        seguimiento={editingSeguimiento || undefined}
                                        isEditing={!!editingSeguimiento}
                                        onSuccess={handleSeguimientoSuccess}
                                        onCancel={handleCancelSeguimientoForm}
                                    />
                                </div>
                            )}

                            {loadingSeguimientos ? (
                                <div className="h-40 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : seguimientos.length === 0 ? (
                                <div className="h-40 flex items-center justify-center text-center">
                                    <div>
                                        <p className="text-muted-foreground">No hay seguimientos registrados.</p>
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setEditingSeguimiento(null)
                                                setShowSeguimientoForm(true)
                                            }}
                                        >
                                            Agregar un seguimiento
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {seguimientos.map((seguimiento) => (
                                        <SeguimientoCard
                                            key={seguimiento.id}
                                            seguimiento={seguimiento}
                                            onEdit={handleEditSeguimiento}
                                            onDelete={(id) => console.log("Eliminar seguimiento", id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Tab de Notas */}
                        <TabsContent value="notas" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Notas</h2>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        setEditingNota(null)
                                        setShowNotaForm(true)
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nueva Nota
                                </Button>
                            </div>

                            {showNotaForm && (
                                <div className="border rounded-lg p-4 bg-white mb-4">
                                    <NotaForm
                                        clienteId={clienteId}
                                        nota={editingNota || undefined}
                                        isEditing={!!editingNota}
                                        onSuccess={handleNotaSuccess}
                                        onCancel={handleCancelNotaForm}
                                    />
                                </div>
                            )}

                            {loadingNotas ? (
                                <div className="h-40 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : notas.length === 0 ? (
                                <div className="h-40 flex items-center justify-center text-center">
                                    <div>
                                        <p className="text-muted-foreground">No hay notas registradas.</p>
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setEditingNota(null)
                                                setShowNotaForm(true)
                                            }}
                                        >
                                            Agregar una nota
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {notas.map((nota) => (
                                        <NotaCard
                                            key={nota.id}
                                            nota={nota}
                                            onEdit={handleEditNota}
                                            onDelete={(id) => console.log("Eliminar nota", id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

