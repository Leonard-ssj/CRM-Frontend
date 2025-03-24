import { ContactoTable } from "@/components/contactos/contacto-table"
import { getContactos } from "@/lib/contactosData"

export default function Contactos() {
    const contactos = getContactos()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Contactos</h1>
            </div>
            <ContactoTable contactos={contactos} />
        </div>
    )
}
