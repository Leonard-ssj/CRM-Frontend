"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EventoCard } from "@/components/eventos/evento-card"
import { EventoForm } from "@/components/calendario/evento-form"
import { getEventoById } from "@/services/eventosService"
import { EventoDTO } from "@/types/EventoDTO"
import { ArrowLeft, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function EventoDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { toast } = useToast()

    const [evento, setEvento] = useState<EventoDTO | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                if (id) {
                    const data = await getEventoById(Number(id))
                    setEvento(data)
                }
            } catch (error) {
                console.error("Error al obtener evento", error)
                navigate("/eventos")
            } finally {
                setIsLoading(false)
            }
        }

        fetchEvento()
    }, [id, navigate])

    const formatTipo = (tipo: string) => {
        switch (tipo) {
            case "REUNION":
                return "Reunión"
            case "PRESENTACION":
                return "Presentación"
            case "PRESENCIAL":
                return "Presencial"
            default:
                return tipo
        }
    }

    const formatDate = (iso: string) => {
        const date = new Date(iso)
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }

    if (isLoading || !evento) {
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
                            evento={{
                                id: String(evento.id),
                                titulo: evento.titulo,
                                fecha: evento.fecha,
                                tipo: evento.tipo,
                                descripcion: evento.descripcion,
                                clienteId: evento.clienteId ? String(evento.clienteId) : undefined,
                            }}
                            isEditing={true}
                            onSuccess={() => {
                                // Volver a cargar evento después de edición
                                getEventoById(Number(id)).then(setEvento)
                                setIsEditing(false)
                            }}
                            onCancel={() => setIsEditing(false)}
                        />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-1">
                        <EventoCard evento={evento} onEdit={() => setIsEditing(true)} />
                    </div>
                    <div className="md:col-span-1">
                        <Card>
                            <CardContent className="pt-6">
                                <h2 className="text-xl font-semibold mb-4">Detalles del evento</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Tipo</h3>
                                        <p>{formatTipo(evento.tipo)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Fecha y hora</h3>
                                        <p>{formatDate(evento.fecha)}</p>
                                    </div>
                                    {evento.clienteNombre && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                                            <p>{evento.clienteNombre}</p>
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
