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
import { clientes } from "@/lib/data"
import { addEvento, updateEvento } from "@/lib/eventosData"

// Esquema de validación
const eventoSchema = z.object({
    titulo: z.string().min(2, { message: "El título debe tener al menos 2 caracteres" }),
    fecha: z.string().min(1, { message: "La fecha es requerida" }),
    hora: z.string().min(1, { message: "La hora es requerida" }),
    tipo: z.enum(["reunion", "llamada", "presentacion", "otro"], {
        required_error: "El tipo es requerido",
    }),
    descripcion: z.string().optional(),
    clienteId: z.string().optional(),
})

type EventoFormValues = z.infer<typeof eventoSchema>

interface EventoFormProps {
    evento?: {
        id: string
        titulo: string
        fecha: string
        tipo: "reunion" | "llamada" | "presentacion" | "otro"
        descripcion?: string
        clienteId?: string
    }
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function EventoForm({ evento, isEditing = false, onSuccess, onCancel }: EventoFormProps) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Formatear fecha y hora para inputs
    const formatDateForInput = (dateString?: string) => {
        if (!dateString) return new Date().toISOString().split("T")[0]
        const date = new Date(dateString)
        return date.toISOString().split("T")[0]
    }

    const formatTimeForInput = (dateString?: string) => {
        if (!dateString) return "12:00"
        const date = new Date(dateString)
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    // Valores por defecto
    const defaultValues: Partial<EventoFormValues> = {
        titulo: evento?.titulo || "",
        fecha: evento?.fecha ? formatDateForInput(evento.fecha) : formatDateForInput(),
        hora: evento?.fecha ? formatTimeForInput(evento.fecha) : formatTimeForInput(),
        tipo: evento?.tipo || "reunion",
        descripcion: evento?.descripcion || "",
        clienteId: evento?.clienteId || "",
    }

    const form = useForm<EventoFormValues>({
        resolver: zodResolver(eventoSchema),
        defaultValues,
    })

    async function onSubmit(data: EventoFormValues) {
        setIsSubmitting(true)
        try {
            // Combinar fecha y hora
            const fechaHora = new Date(`${data.fecha}T${data.hora}:00`)

            // Crear objeto de evento con la fecha combinada
            const eventoData = {
                ...data,
                fecha: fechaHora.toISOString(),
            }

            // Guardar los datos (simulado)
            if (isEditing && evento) {
                updateEvento(evento.id, eventoData)
            } else {
                addEvento(eventoData)
            }

            toast({
                title: isEditing ? "Evento actualizado" : "Evento creado",
                description: isEditing
                    ? "Los datos del evento han sido actualizados correctamente."
                    : "El evento ha sido creado correctamente.",
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
                                <Input placeholder="Título del evento" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="fecha"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="hora"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hora</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tipo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un tipo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="reunion">Reunión</SelectItem>
                                        <SelectItem value="llamada">Llamada</SelectItem>
                                        <SelectItem value="presentacion">Presentación</SelectItem>
                                        <SelectItem value="otro">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="clienteId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cliente (opcional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un cliente" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">Sin cliente</SelectItem>
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
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción (opcional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Descripción del evento" className="resize-none" {...field} />
                            </FormControl>
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
                            "Actualizar Evento"
                        ) : (
                            "Crear Evento"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

