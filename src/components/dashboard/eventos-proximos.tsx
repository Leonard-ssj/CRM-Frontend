import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Evento } from "@/types"
import { formatDateShort } from "@/lib/utils"
import { Calendar, Phone, Presentation } from "lucide-react"

interface EventosProximosProps {
    eventos: Evento[]
}

export function EventosProximos({ eventos }: EventosProximosProps) {
    const getEventIcon = (tipo: string) => {
        switch (tipo) {
            case "reunion":
                return <Calendar className="h-4 w-4 text-blue-500" />
            case "llamada":
                return <Phone className="h-4 w-4 text-green-500" />
            case "presentacion":
                return <Presentation className="h-4 w-4 text-purple-500" />
            default:
                return <Calendar className="h-4 w-4 text-gray-500" />
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Eventos importantes / calendario</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {eventos.length === 0 ? (
                        <p className="text-center text-muted-foreground">No hay eventos próximos</p>
                    ) : (
                        eventos.map((evento) => (
                            <div key={evento.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                                <div className="mt-0.5">{getEventIcon(evento.tipo)}</div>
                                <div>
                                    <p className="font-medium">
                                        {formatDateShort(evento.fecha)} - {evento.titulo}
                                    </p>
                                    {evento.descripcion && (
                                        <p className="text-sm text-muted-foreground">{evento.descripcion}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}