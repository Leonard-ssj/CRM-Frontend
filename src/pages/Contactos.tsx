"use client"

import { useEffect, useState } from "react"
import { ContactoTable } from "@/components/contactos/contacto-table"
import { getAllContactos } from "@/services/contactoService"
import { ContactoDTO } from "@/types/ContactoDTO"
 
export default function Contactos() {
    const [contactos, setContactos] = useState<ContactoDTO[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const data = await getAllContactos()
                setContactos(data)
            } catch (error) {
                console.error("Error al obtener contactos:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchContactos()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Contactos</h1>
            </div>
            <ContactoTable contactos={contactos} isLoading={loading} />
        </div>
    )
}
