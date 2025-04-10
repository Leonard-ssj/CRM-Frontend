"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { EventoDTO } from "@/types/EventoDTO"
import { formatDate } from "@/lib/utils"
import { Calendar, Edit, Trash, Building2 } from "lucide-react"

interface EventoCardProps {
    evento: EventoDTO
    onEdit?: () => void
    onDelete?: (id: number) => void
}

export function EventoCard({ evento, onEdit, onDelete }: EventoCardProps) {
    const getTipoColor = (tipo: string) => {
        switch (tipo) {
            case "REUNION":
                return "bg-blue-500 hover:bg-blue-500"
            case "PRESENCIAL":
                return "bg-green-500 hover:bg-green-500"
            case "PRESENTACION":
                return "bg-purple-500 hover:bg-purple-500"
            default:
                return "bg-gray-500 hover:bg-gray-500"
        }
    }

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

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge className={`${getTipoColor(evento.tipo)} text-white mb-2`}>
                            {formatTipo(evento.tipo)}
                        </Badge>
                        <h3 className="font-semibold text-lg">{evento.titulo}</h3>
                    </div>
                    <div className="flex space-x-1">
                        {onEdit && (
                            <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(evento.id)}
                                className="h-8 w-8 text-destructive"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                {evento.descripcion && (
                    <p className="text-sm text-muted-foreground mb-4">{evento.descripcion}</p>
                )}

                <div className="flex items-center text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatDate(evento.fecha)}</span>
                </div>

                {evento.clienteNombre && (
                    <div className="flex items-center text-sm">
                        <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{evento.clienteNombre}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="pt-0" />
        </Card>
    )
}
