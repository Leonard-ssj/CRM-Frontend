import { TareaTable } from "@/components/tareas/tarea-table"
import { getTareas } from "@/lib/tareasData"

export default function Tareas() {
    const tareas = getTareas()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Tareas</h1>
            </div>
            <TareaTable tareas={tareas} />
        </div>
    )
}
