"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ContactoDTO } from "@/types/ContactoDTO"
import { Mail, Phone, Briefcase, Edit, Trash } from "lucide-react"

interface ContactoCardProps {
    contacto: ContactoDTO
    onEdit?: (contacto: ContactoDTO) => void
    onDelete?: (id: number) => void
}

export function ContactoCard({ contacto, onEdit, onDelete }: ContactoCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{contacto.nombre}</CardTitle>
                    <div className="flex space-x-1">
                        {onEdit && (
                            <Button variant="ghost" size="icon" onClick={() => onEdit(contacto)} className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                        {onDelete && contacto.id !== undefined && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(contacto.id!)} // Aseguramos que no sea undefined
                                className="h-8 w-8 text-destructive"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
                <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{contacto.email}</span>
                </div>
                <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{contacto.telefono}</span>
                </div>
                {contacto.puesto && (
                    <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{contacto.puesto}</span>
                    </div>
                )}
                {contacto.notas && (
                    <div className="mt-2 pt-2 border-t">
                        <p className="text-sm text-muted-foreground">{contacto.notas}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
