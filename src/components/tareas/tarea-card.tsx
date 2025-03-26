"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Tarea } from "@/types"
import { formatDate, getStatusColor } from "@/lib/utils"
import { Calendar, Edit, Trash, User } from "lucide-react"
import { getUsuarioNombreById } from "@/lib/tareasData"

interface TareaCardProps {
    tarea: Tarea
    onEdit?: (tarea: Tarea) => void
    onDelete?: (id: string) => void
    showUsuario?: boolean
}

export function TareaCard({ tarea, onEdit, onDelete, showUsuario = false }: TareaCardProps) {
    // Función para obtener el texto del estado
    const getStatusText = (status: string) => {
        switch (status) {
            case "pendiente":
                return "Pendiente"
            case "en progreso":
                return "En Progreso"
            case "completada":
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
                        {onDelete && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(tarea.id)}
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
                    {formatDate(tarea.fechaLimite)}
                </div>
                {showUsuario && (
                    <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {getUsuarioNombreById(tarea.asignadoA)}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

