import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventoForm } from "@/components/calendario/evento-form"
import { getEventoById } from "@/services/eventosService"
import { EventoDTO } from "@/types/EventoDTO"

export default function EditarEvento() {
    const { id } = useParams<{ id: string }>()
    const [evento, setEvento] = useState<EventoDTO | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        const fetchEvento = async () => {
            try {
                const data = await getEventoById(Number(id))
                setEvento(data)
            } catch (error) {
                console.error("Error al obtener el evento:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvento()
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <p>Cargando evento...</p>
            </div>
        )
    }

    if (!evento) {
        return (
            <div className="flex items-center justify-center h-96">
                <p>Evento no encontrado</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to={`/eventos/${id}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Editar Evento</h1>
                </div>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <EventoForm
                    evento={{
                        id: String(evento.id),
                        titulo: evento.titulo,
                        fecha: evento.fecha,
                        tipo: evento.tipo as "REUNION" | "PRESENTACION" | "PRESENCIAL",
                        descripcion: evento.descripcion,
                        clienteId: evento.clienteId ? String(evento.clienteId) : undefined,
                    }}
                    isEditing={true}
                />
            </div>
        </div>
    )
}
