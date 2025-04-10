import { useEffect, useState } from "react"
import { EventoTable } from "@/components/eventos/evento-table"
import { getEventos, deleteEvento } from "@/services/eventosService"
import { EventoDTO } from "@/types/EventoDTO"

export default function Eventos() {
    const [eventos, setEventos] = useState<EventoDTO[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getEventos()
                setEventos(data)
            } catch (error) {
                console.error("Error al obtener eventos", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchEventos()
    }, [])

    const handleDeleteEvento = async (id: number) => {
        try {
            await deleteEvento(id)
            setEventos((prev) => prev.filter((evento) => evento.id !== id))
        } catch (error) {
            console.error("Error al eliminar evento", error)
        }
    }
    

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
            </div>
            <EventoTable eventos={eventos} isLoading={isLoading} onDelete={handleDeleteEvento} />
        </div>
    )
}
