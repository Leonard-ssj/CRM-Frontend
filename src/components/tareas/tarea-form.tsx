"use client"

import { useState } from "react"
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
import { usuarios } from "@/lib/data"

// Esquema de validación
const tareaSchema = z.object({
    titulo: z.string().min(2, { message: "El título debe tener al menos 2 caracteres" }),
    descripcion: z.string().min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
    fechaLimite: z.string().min(1, { message: "La fecha límite es requerida" }),
    estado: z.enum(["pendiente", "en progreso", "completada"], {
        required_error: "El estado es requerido",
    }),
    asignadoA: z.string().min(1, { message: "Debe asignar la tarea a un usuario" }),
})

type TareaFormValues = z.infer<typeof tareaSchema>

interface TareaFormProps {
    clienteId: string
    tarea?: Tarea
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function TareaForm({ clienteId, tarea, isEditing = false, onSuccess, onCancel }: TareaFormProps) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Formatear fecha para input date
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString)
        return date.toISOString().split("T")[0]
    }

    // Valores por defecto
    const defaultValues: Partial<TareaFormValues> = {
        titulo: tarea?.titulo || "",
        descripcion: tarea?.descripcion || "",
        fechaLimite: tarea?.fechaLimite ? formatDateForInput(tarea.fechaLimite) : "",
        estado: tarea?.estado || "pendiente",
        asignadoA: tarea?.asignadoA || "",
    }

    const form = useForm<TareaFormValues>({
        resolver: zodResolver(tareaSchema),
        defaultValues,
    })

    async function onSubmit(data: TareaFormValues) {
        setIsSubmitting(true)
        try {
            // Simulación de envío de datos
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: isEditing ? "Tarea actualizada" : "Tarea creada",
                description: isEditing
                    ? "Los datos de la tarea han sido actualizados correctamente."
                    : "La tarea ha sido creada correctamente.",
            })

            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
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

