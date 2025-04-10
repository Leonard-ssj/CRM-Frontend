import { TareaForm } from "@/components/tareas/tarea-form"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"



export default function NuevaTareaPage() {
    const navigate = useNavigate()
    
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/tareas">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Nueva Tarea</h1>
                </div>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <TareaForm
                    onSuccess={() => navigate("/tareas")}
                    onCancel={() => navigate("/tareas")}
                />
            </div>
        </div>
    )
}

