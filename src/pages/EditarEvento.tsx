import { EventoForm } from "@/components/calendario/evento-form"
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getEventoById } from "@/lib/eventosData"

export default function EditarEvento() {
    const { id } = useParams<{ id: string }>()
    const evento = getEventoById(id || "")

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
                <EventoForm evento={evento} isEditing={true} />
            </div>
        </div>
    )
}
