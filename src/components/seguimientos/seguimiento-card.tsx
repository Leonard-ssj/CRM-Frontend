"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SeguimientoDTO } from "@/types/SeguimientoDTO"
import { formatDate } from "@/lib/utils"
import { Calendar, Edit, Mail, MessageSquare, Phone, Trash, User } from "lucide-react"
import { Badge } from "../ui/badge"

interface SeguimientoCardProps {
    seguimiento: SeguimientoDTO
    onEdit?: (seguimiento: SeguimientoDTO) => void
    onDelete?: (id: number) => void
    showUsuario?: boolean
}

export function SeguimientoCard({ seguimiento, onEdit, onDelete, showUsuario = false }: SeguimientoCardProps) {
    const getIcon = (tipo: string) => {
        switch (tipo) {
            case "LLAMADA":
                return <Phone className="h-4 w-4" />
            case "CORREO":
                return <Mail className="h-4 w-4" />
            case "REUNION":
                return <Calendar className="h-4 w-4" />
            default:
                return <MessageSquare className="h-4 w-4" />
        }
    }

    const getTipoText = (tipo: string) => {
        switch (tipo) {
            case "LLAMADA":
                return "Llamada"
            case "CORREO":
                return "Correo"
            case "REUNION":
                return "Reunión"
            default:
                return tipo
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">

                    <Badge variant="outline" className="flex items-center gap-1">
                        {getIcon(seguimiento.tipo)}
                        <span>{getTipoText(seguimiento.tipo)}</span>
                    </Badge>

                    <div className="flex space-x-1">
                        {onEdit && (
                            <Button variant="ghost" size="icon" onClick={() => onEdit(seguimiento)} className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                        {onDelete && seguimiento.id !== undefined && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(seguimiento.id!)} // Aseguramos que no sea undefined
                                className="h-8 w-8 text-destructive"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
                <p className="text-sm">{seguimiento.comentarios}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {seguimiento.fecha ? formatDate(seguimiento.fecha) : "Fecha no disponible"}
                </div>
                {showUsuario && seguimiento.usuarioId !== undefined && (
                    <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {seguimiento.usuarioId}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
