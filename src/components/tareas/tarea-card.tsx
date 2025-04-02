"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TareaDTO } from "@/types/TareaDTO"
import { formatDate, getStatusColor } from "@/lib/utils"
import { Calendar, Edit, Trash, User } from "lucide-react"

interface TareaCardProps {
    tarea: TareaDTO
    onEdit?: (tarea: TareaDTO) => void
    onDelete?: (id: number) => void
    showUsuario?: boolean
}

export function TareaCard({ tarea, onEdit, onDelete, showUsuario = false }: TareaCardProps) {
    // Función para obtener el texto del estado
    const getStatusText = (status: string) => {
        switch (status) {
            case "PENDIENTE":
                return "Pendiente"
            case "EN_PROGRESO":
                return "En Progreso"
            case "COMPLETADA":
                return "Completada"
            default:
                return status
        }
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge className={`${getStatusColor(tarea.estado)} text-white hover:${getStatusColor(tarea.estado)}`}>
                            {getStatusText(tarea.estado)}
                        </Badge>
                        <h3 className="font-semibold text-lg mt-2">{tarea.titulo}</h3>
                    </div>
                    <div className="flex space-x-1">
                        {onEdit && (
                            <Button variant="ghost" size="icon" onClick={() => onEdit(tarea)} className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                        {onDelete && tarea.id !== undefined && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(tarea.id!)} // Aseguramos que no sea undefined
                                className="h-8 w-8 text-destructive"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">{tarea.descripcion}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {tarea.fechaLimite ? formatDate(tarea.fechaLimite) : "Fecha no disponible"}
                </div>
                {showUsuario && tarea.asignadoA !== undefined && (
                    <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {tarea.asignadoA}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
