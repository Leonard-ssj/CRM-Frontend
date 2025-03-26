import { EventoTable } from "@/components/eventos/evento-table"
import { getEventos } from "@/lib/eventosData"


export default function Eventos() {
    const eventos = getEventos()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
            </div>
            <EventoTable eventos={eventos} />
        </div>
    )
}

