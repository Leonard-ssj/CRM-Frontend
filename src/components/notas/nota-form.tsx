"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { Nota } from "@/types"
import { useCurrentUser } from "@/lib/hooks"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Añadir imports necesarios
import { clientes, usuarios } from "@/lib/data"

// Modificar el esquema de validación para incluir hora y campos faltantes
const notaSchema = z.object({
    contenido: z.string().min(5, { message: "El contenido debe tener al menos 5 caracteres" }),
    fecha: z.string().min(1, { message: "La fecha es requerida" }),
    hora: z.string().min(1, { message: "La hora es requerida" }),
    clienteId: z.string().min(1, { message: "Debe seleccionar un cliente" }),
    usuarioId: z.string().min(1, { message: "Debe seleccionar un usuario" }),
})

type NotaFormValues = z.infer<typeof notaSchema>

// Modificar la interfaz para hacer clienteId opcional
interface NotaFormProps {
    clienteId?: string
    nota?: Nota
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function NotaForm({ clienteId, nota, isEditing = false, onSuccess, onCancel }: NotaFormProps) {
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
    const defaultValues: Partial<NotaFormValues> = {
        contenido: nota?.contenido || "",
        fecha: nota?.fecha ? formatDateForInput(nota.fecha) : formatDateForInput(),
        hora: nota?.fecha ? formatTimeForInput(nota.fecha) : formatTimeForInput(),
        clienteId: nota?.clienteId || clienteId || "",
        usuarioId: nota?.usuarioId || user?.id || "",
    }

    const form = useForm<NotaFormValues>({
        resolver: zodResolver(notaSchema),
        defaultValues,
    })

    const usuariosOptions = usuarios.map((usuario) => ({
        value: usuario.id,
        label: usuario.nombre,
    }))

    const clientesOptions = clientes.map((cliente) => ({
        value: cliente.id,
        label: cliente.nombre,
    }))

    // Modificar la función onSubmit para combinar fecha y hora
    async function onSubmit(data: NotaFormValues) {
        setIsSubmitting(true)
        try {
            // Combinar fecha y hora
            const fechaHora = new Date(`${data.fecha}T${data.hora}:00`)

            // Crear objeto de nota con la fecha combinada
            const notaData = {
                ...data,
                fecha: fechaHora.toISOString(),
            }

            // Simulación de envío de datos
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: isEditing ? "Nota actualizada" : "Nota creada",
                description: isEditing ? "La nota ha sido actualizada correctamente." : "La nota ha sido creada correctamente.",
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
                    name="contenido"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contenido</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Escribe tu nota aquí..." className="resize-none" {...field} />
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
                            "Actualizar Nota"
                        ) : (
                            "Crear Nota"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

