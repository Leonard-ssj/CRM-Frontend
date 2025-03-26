import { EventoForm } from "@/components/calendario/evento-form"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"


export default function NuevoEvento() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/eventos">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Nuevo Evento</h1>
                </div>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <EventoForm />
            </div>
        </div>
    )
}

