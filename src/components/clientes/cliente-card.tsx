import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Cliente } from "@/types"
import { formatDate } from "@/lib/utils"
import { Building2, Mail, MapPin, Phone, User } from "lucide-react"

interface ClienteCardProps {
    cliente: Cliente
}

export function ClienteCard({ cliente }: ClienteCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{cliente.nombre}</CardTitle>
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
                            <p className="text-sm text-muted-foreground">{formatDate(cliente.fechaCreacion)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

