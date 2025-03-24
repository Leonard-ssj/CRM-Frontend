import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Contacto } from "@/types"
import { Mail, Phone, Briefcase, Building2, FileText } from "lucide-react"
import { getClienteNombreById } from "@/lib/contactosData"

interface ContactoDetailCardProps {
    contacto: Contacto
}

export function ContactoDetailCard({ contacto }: ContactoDetailCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{contacto.nombre}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{contacto.email}</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Teléfono</p>
                            <p className="text-sm text-muted-foreground">{contacto.telefono}</p>
                        </div>
                    </div>

                    {contacto.puesto && (
                        <div className="flex items-start">
                            <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Puesto</p>
                                <p className="text-sm text-muted-foreground">{contacto.puesto}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-start">
                        <Building2 className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Cliente</p>
                            <p className="text-sm text-muted-foreground">{getClienteNombreById(contacto.clienteId)}</p>
                        </div>
                    </div>
                </div>

                {contacto.notas && (
                    <div className="pt-4 border-t">
                        <div className="flex items-start">
                            <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Notas</p>
                                <p className="text-sm text-muted-foreground">{contacto.notas}</p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

