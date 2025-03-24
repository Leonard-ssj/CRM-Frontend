"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Seguimiento } from "@/types"
import { formatDate } from "@/lib/utils"
import { Calendar, Edit, MessageSquare, Phone, Mail, Trash, User } from "lucide-react"

interface SeguimientoCardProps {
    seguimiento: Seguimiento
    onEdit?: (seguimiento: Seguimiento) => void
    onDelete?: (id: string) => void
    showUsuario?: boolean
}

export function SeguimientoCard({ seguimiento, onEdit, onDelete, showUsuario = false }: SeguimientoCardProps) {
    // Función para obtener el icono según el tipo
    const getIcon = (tipo: string) => {
        switch (tipo) {
            case "llamada":
                return <Phone className="h-4 w-4" />
            case "correo":
                return <Mail className="h-4 w-4" />
            case "reunión":
                return <Calendar className="h-4 w-4" />
            default:
                return <MessageSquare className="h-4 w-4" />
        }
    }

    // Función para obtener el texto del tipo
    const getTipoText = (tipo: string) => {
        switch (tipo) {
            case "llamada":
                return "Llamada"
            case "correo":
                return "Correo"
            case "reunión":
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
                        {onDelete && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(seguimiento.id)}
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
                    {formatDate(seguimiento.fecha)}
                </div>
                {showUsuario && (
                    <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {seguimiento.usuarioId}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

