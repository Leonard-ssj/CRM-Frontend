"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContactoDetailCard } from "@/components/contactos/contacto-detail-card"
import { ContactoForm } from "@/components/contactos/contacto-form"
import { getContactoById } from "@/services/contactoService" // ✅ ya no desde lib
import { ArrowLeft, Edit } from "lucide-react"
import type { ContactoDTO } from "@/types/ContactoDTO"


export default function ContactoDetail() {
    const params = useParams()
    const router = useNavigate()
    const contactoId = params.id as string

    const [contacto, setContacto] = useState<ContactoDTO | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContacto = async () => {
            try {
                const data = await getContactoById(Number(contactoId))
                setContacto(data)
            } catch (error) {
                console.error("Contacto no encontrado:", error)
                router("/contactos")
            } finally {
                setLoading(false)
            }
        }

        fetchContacto()
    }, [contactoId, router])

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!contacto) {
        return null
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
                    <h1 className="text-3xl font-bold tracking-tight"> Contacto de "{contacto.clienteNombre}"</h1>
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
                            onSuccess={() => {
                                setIsEditing(false)
                                // Recargar el contacto actualizado
                                getContactoById(Number(contactoId)).then(setContacto)
                            }}
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
