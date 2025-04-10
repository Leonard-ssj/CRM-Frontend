import { useEffect, useState } from "react"
import { TareaTable } from "@/components/tareas/tarea-table"
import { getTareasAsignadas } from "@/services/tareaService"
import { TareaDTO } from "@/types/TareaDTO"

export default function Tareas() {
    const [tareas, setTareas] = useState<TareaDTO[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const data = await getTareasAsignadas()
                setTareas(data)
            } catch (error) {
                console.error("Error al obtener tareas asignadas", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTareas()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Mis Tareas Asignadas</h1>
            </div>
            <TareaTable tareas={tareas} isLoading={isLoading} />
        </div>
    )
}
