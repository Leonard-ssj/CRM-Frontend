"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Nota } from "@/types"
import { formatDate } from "@/lib/utils"
import { Calendar, Edit, Trash, User } from "lucide-react"

interface NotaCardProps {
    nota: Nota
    onEdit?: (nota: Nota) => void
    onDelete?: (id: string) => void
    showUsuario?: boolean
}

export function NotaCard({ nota, onEdit, onDelete, showUsuario = false }: NotaCardProps) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-end mb-2">
                    <div className="flex space-x-1">
                        {onEdit && (
                            <Button variant="ghost" size="icon" onClick={() => onEdit(nota)} className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(nota.id)}
                                className="h-8 w-8 text-destructive"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
                <p className="text-sm">{nota.contenido}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(nota.fecha)}
                </div>
                {showUsuario && (
                    <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {nota.usuarioId}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

