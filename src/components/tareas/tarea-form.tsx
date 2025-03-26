"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { Tarea } from "@/types"
import { usuarios, clientes } from "@/lib/data"
import { addTarea, updateTarea } from "@/lib/tareasData"

// Modificar el esquema de validación para incluir hora
const tareaSchema = z.object({
    titulo: z.string().min(2, { message: "El título debe tener al menos 2 caracteres" }),
    descripcion: z.string().min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
    fechaLimite: z.string().min(1, { message: "La fecha límite es requerida" }),
    horaLimite: z.string().min(1, { message: "La hora límite es requerida" }),
    estado: z.enum(["pendiente", "en progreso", "completada"], {
        required_error: "El estado es requerido",
    }),
    clienteId: z.string().min(1, { message: "Debe seleccionar un cliente" }),
    asignadoA: z.string().min(1, { message: "Debe asignar la tarea a un usuario" }),
})

type TareaFormValues = z.infer<typeof tareaSchema>

interface TareaFormProps {
    tarea?: Tarea
    clienteId?: string
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function TareaForm({ tarea, clienteId, isEditing = false, onSuccess, onCancel }: TareaFormProps) {
    const navigate = useNavigate()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Modificar la función formatDateForInput para separar fecha y hora
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString)
        return date.toISOString().split("T")[0]
    }

    const formatTimeForInput = (dateString: string) => {
        const date = new Date(dateString)
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    // Actualizar los valores por defecto para incluir horaLimite
    const defaultValues: Partial<TareaFormValues> = {
        titulo: tarea?.titulo || "",
        descripcion: tarea?.descripcion || "",
        fechaLimite: tarea?.fechaLimite ? formatDateForInput(tarea.fechaLimite) : new Date().toISOString().split("T")[0],
        horaLimite: tarea?.fechaLimite ? formatTimeForInput(tarea.fechaLimite) : "12:00",
        estado: tarea?.estado || "pendiente",
        clienteId: tarea?.clienteId || clienteId || "",
        asignadoA: tarea?.asignadoA || usuarios[0]?.id || "",
    }

    const form = useForm<TareaFormValues>({
        resolver: zodResolver(tareaSchema),
        defaultValues,
    })

    // Modificar la función onSubmit para combinar fecha y hora
    async function onSubmit(data: TareaFormValues) {
        setIsSubmitting(true)
        try {
            // Combinar fecha y hora
            const fechaHora = new Date(`${data.fechaLimite}T${data.horaLimite}:00`)

            // Crear objeto de tarea con la fecha combinada
            const tareaData = {
                ...data,
                fechaLimite: fechaHora.toISOString(),
            }

            // Simulación de envío de datos
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Guardar los datos (simulado)
            if (isEditing && tarea) {
                updateTarea(tarea.id, tareaData)
            } else {
                addTarea(tareaData)
            }

            // Mostrar mensaje de éxito
            toast({
                title: isEditing ? "Tarea actualizada" : "Tarea creada",
                description: isEditing
                    ? "Los datos de la tarea han sido actualizados correctamente."
                    : "La tarea ha sido creada correctamente.",
            })

            // Si hay una función de éxito personalizada, la llamamos
            if (onSuccess) {
                onSuccess()
            } else {
                // Si no, redirigimos a la lista de tareas
                navigate("/tareas")
            }
        } catch (error) {
            console.error("Error al guardar la tarea:", error)
            toast({
                title: "Error",
                description: "Ha ocurrido un error. Inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="Título de la tarea" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Descripción detallada de la tarea" className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="fechaLimite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha límite</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="horaLimite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hora límite</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un estado" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="pendiente">Pendiente</SelectItem>
                                        <SelectItem value="en progreso">En progreso</SelectItem>
                                        <SelectItem value="completada">Completada</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="clienteId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cliente</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un cliente" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {clientes.map((cliente) => (
                                            <SelectItem key={cliente.id} value={cliente.id}>
                                                {cliente.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="asignadoA"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Asignado a</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un usuario" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {usuarios.map((usuario) => (
                                            <SelectItem key={usuario.id} value={usuario.id}>
                                                {usuario.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel ? onCancel : () => navigate(-1)}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                {isEditing ? "Actualizando..." : "Guardando..."}
                            </>
                        ) : isEditing ? (
                            "Actualizar Tarea"
                        ) : (
                            "Crear Tarea"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

