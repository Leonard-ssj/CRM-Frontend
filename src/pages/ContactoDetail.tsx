"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContactoDetailCard } from "@/components/contactos/contacto-detail-card"
import { ContactoForm } from "@/components/contactos/contacto-form"
import { getContactoById } from "@/lib/contactosData"
import { ArrowLeft, Edit } from "lucide-react"
import { Link } from "react-router-dom"

export default function ContactoDetail() {
    const params = useParams()
    const router = useNavigate()
    const contactoId = params.id as string

    const [contacto, setContacto] = useState(getContactoById(contactoId))
    const [isEditing, setIsEditing] = useState(false)

    // Si no existe el contacto, redirigir a la lista
    useEffect(() => {
        if (!contacto) {
            router("/contactos")
        }
    }, [contacto, router])

    if (!contacto) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/contactos">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">{contacto.nombre}</h1>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Contacto
                    </Button>
                )}
            </div>

            {isEditing ? (
                <Card>
                    <CardContent className="pt-6">
                        <ContactoForm
                            contacto={contacto}
                            isEditing={true}
                            onSuccess={() => setIsEditing(false)}
                            onCancel={() => setIsEditing(false)}
                        />
                    </CardContent>
                </Card>
            ) : (
                <ContactoDetailCard contacto={contacto} />
            )}
        </div>
    )
}

