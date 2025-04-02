"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ClienteDTO } from "@/types/ClienteDTO"
import { formatDate } from "@/lib/utils"
import { Building2, Mail, MapPin, Phone, User, Edit, Trash } from "lucide-react"

interface ClienteCardProps {
    cliente: ClienteDTO
    onEdit?: (cliente: ClienteDTO) => void
    onDelete?: (id: number) => void
}

export function ClienteCard({ cliente, onEdit, onDelete }: ClienteCardProps) {
    return (
        <Card>
            <CardHeader className="flex justify-between items-start">
                <CardTitle>{cliente.nombre}</CardTitle>
                <div className="flex space-x-2">
                    {onEdit && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(cliente)}
                            className="h-8 w-8"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                    )}
                    {onDelete && cliente.id && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(cliente.id as number)}
                            className="h-8 w-8 text-destructive"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{cliente.email}</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Teléfono</p>
                            <p className="text-sm text-muted-foreground">{cliente.telefono}</p>
                        </div>
                    </div>

                    {cliente.empresa && (
                        <div className="flex items-start">
                            <Building2 className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Empresa</p>
                                <p className="text-sm text-muted-foreground">{cliente.empresa}</p>
                            </div>
                        </div>
                    )}

                    {cliente.ubicacion && (
                        <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Ubicación</p>
                                <p className="text-sm text-muted-foreground">{cliente.ubicacion}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-start">
                        <User className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Creado</p>
                            <p className="text-sm text-muted-foreground">
                                {cliente.fechaCreacion ? formatDate(cliente.fechaCreacion) : "Sin fecha"}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
