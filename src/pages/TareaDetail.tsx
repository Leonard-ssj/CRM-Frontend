"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TareaCard } from "@/components/tareas/tarea-card"
import { TareaForm } from "@/components/tareas/tarea-form"
import { getTareaById, getClienteNombreById, getUsuarioNombreById } from "@/lib/tareasData"
import { ArrowLeft, Edit } from "lucide-react"
import { useParams, useNavigate, Link } from "react-router-dom"

export default function TareaDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const tareaId = params.id as string

    const [tarea, setTarea] = useState(getTareaById(tareaId))
    const [isEditing, setIsEditing] = useState(false)

    // Si no existe la tarea, redirigir a la lista
    useEffect(() => {
        if (!tarea) {
            navigate("/tareas")
        }
    }, [tarea, navigate])

    if (!tarea) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    const clienteNombre = getClienteNombreById(tarea.clienteId)
    const usuarioNombre = getUsuarioNombreById(tarea.asignadoA)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/tareas">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">{tarea.titulo}</h1>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Tarea
                    </Button>
                )}
            </div>

            {isEditing ? (
                <Card>
                    <CardContent className="pt-6">
                        <TareaForm
                            tarea={tarea}
                            clienteId={tarea.clienteId}
                            isEditing={true}
                            onSuccess={() => setIsEditing(false)}
                            onCancel={() => setIsEditing(false)}
                        />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <TareaCard tarea={tarea} showUsuario={true} />
                    </div>
                    <div className="md:col-span-2">
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Descripción</h3>
                                    <p className="text-muted-foreground">{tarea.descripcion}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold">Cliente</h3>
                                        <p className="text-muted-foreground">{clienteNombre}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">Asignado a</h3>
                                        <p className="text-muted-foreground">{usuarioNombre}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}

