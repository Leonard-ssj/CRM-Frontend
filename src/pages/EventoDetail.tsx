"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EventoCard } from "@/components/eventos/evento-card"
import { EventoForm } from "@/components/calendario/evento-form"
import { getEventoById, deleteEvento } from "@/lib/eventosData"
import { ArrowLeft, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString()
}

const getClienteNombreById = (id: string) => {
    return "Cliente " + id // Aquí puedes conectar con `getClienteById(id)?.nombre`
}

export default function EventoDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { toast } = useToast()

    const [evento, setEvento] = useState(getEventoById(id || ""))
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (!evento) {
            navigate("/eventos")
        }
    }, [evento, navigate])

    const handleDelete = (id: string) => {
        try {
            deleteEvento(id)
            toast({
                title: "Evento eliminado",
                description: "El evento ha sido eliminado correctamente.",
            })
            navigate("/eventos")
        } catch (error) {
            toast({
                title: "Error",
                description: "Ha ocurrido un error al eliminar el evento.",
                variant: "destructive",
            })
        }
    }

    if (!evento) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/eventos">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">{evento.titulo}</h1>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Evento
                    </Button>
                )}
            </div>

            {isEditing ? (
                <Card>
                    <CardContent className="pt-6">
                        <EventoForm
                            evento={evento}
                            isEditing={true}
                            onSuccess={() => {
                                setEvento(getEventoById(id || ""))
                                setIsEditing(false)
                            }}
                            onCancel={() => setIsEditing(false)}
                        />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-1">
                        <EventoCard evento={evento} onEdit={() => setIsEditing(true)} onDelete={handleDelete} />
                    </div>
                    <div className="md:col-span-1">
                        <Card>
                            <CardContent className="pt-6">
                                <h2 className="text-xl font-semibold mb-4">Detalles del evento</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Tipo</h3>
                                        <p>
                                            {evento.tipo === "reunion"
                                                ? "Reunión"
                                                : evento.tipo === "llamada"
                                                    ? "Llamada"
                                                    : evento.tipo === "presentacion"
                                                        ? "Presentación"
                                                        : "Otro"}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Fecha y hora</h3>
                                        <p>{formatDate(new Date(evento.fecha))}</p>
                                    </div>
                                    {evento.clienteId && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                                            <p>{getClienteNombreById(evento.clienteId)}</p>
                                        </div>
                                    )}
                                    {evento.descripcion && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Descripción</h3>
                                            <p>{evento.descripcion}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
