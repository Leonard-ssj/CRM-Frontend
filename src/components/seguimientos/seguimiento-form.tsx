"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { Seguimiento } from "@/types"
import { useCurrentUser } from "@/lib/hooks"
import { Input } from "@/components/ui/input"

// Añadir imports necesarios
import { clientes, usuarios } from "@/lib/data"

// Modificar el esquema de validación para incluir hora y campos faltantes
const seguimientoSchema = z.object({
    tipo: z.enum(["llamada", "correo", "reunión"], {
        required_error: "El tipo de seguimiento es requerido",
    }),
    fecha: z.string().min(1, { message: "La fecha es requerida" }),
    hora: z.string().min(1, { message: "La hora es requerida" }),
    comentarios: z.string().min(5, { message: "Los comentarios deben tener al menos 5 caracteres" }),
    clienteId: z.string().min(1, { message: "Debe seleccionar un cliente" }),
    usuarioId: z.string().min(1, { message: "Debe seleccionar un usuario" }),
})

type SeguimientoFormValues = z.infer<typeof seguimientoSchema>

// Modificar la interfaz para hacer clienteId opcional
interface SeguimientoFormProps {
    clienteId?: string
    seguimiento?: Seguimiento
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function SeguimientoForm({
    clienteId,
    seguimiento,
    isEditing = false,
    onSuccess,
    onCancel,
}: SeguimientoFormProps) {
    const { toast } = useToast()
    const { user } = useCurrentUser()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Funciones para formatear fecha y hora
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

    // Actualizar los valores por defecto
    const defaultValues: Partial<SeguimientoFormValues> = {
        tipo: seguimiento?.tipo || "llamada",
        fecha: seguimiento?.fecha ? formatDateForInput(seguimiento.fecha) : formatDateForInput(),
        hora: seguimiento?.fecha ? formatTimeForInput(seguimiento.fecha) : formatTimeForInput(),
        comentarios: seguimiento?.comentarios || "",
        clienteId: seguimiento?.clienteId || clienteId || "",
        usuarioId: seguimiento?.usuarioId || user?.id || "",
    }

    const form = useForm<SeguimientoFormValues>({
        resolver: zodResolver(seguimientoSchema),
        defaultValues,
    })

    // Modificar la función onSubmit para combinar fecha y hora
    async function onSubmit(data: SeguimientoFormValues) {
        setIsSubmitting(true)
        try {
            // Combinar fecha y hora
            const fechaHora = new Date(`${data.fecha}T${data.hora}:00`)

            // Crear objeto de seguimiento con la fecha combinada
            const seguimientoData = {
                ...data,
                fecha: fechaHora.toISOString(),
            }

            // Simulación de envío de datos
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: isEditing ? "Seguimiento actualizado" : "Seguimiento creado",
                description: isEditing
                    ? "Los datos del seguimiento han sido actualizados correctamente."
                    : "El seguimiento ha sido creado correctamente.",
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
            {/* Actualizar el formulario para incluir todos los campos necesarios */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                </div>

                <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de seguimiento</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un tipo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="llamada">Llamada</SelectItem>
                                    <SelectItem value="correo">Correo</SelectItem>
                                    <SelectItem value="reunión">Reunión</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                    name="usuarioId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuario</FormLabel>
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

                <FormField
                    control={form.control}
                    name="comentarios"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comentarios</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Detalles del seguimiento" className="resize-none" {...field} />
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
                            "Actualizar Seguimiento"
                        ) : (
                            "Crear Seguimiento"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

