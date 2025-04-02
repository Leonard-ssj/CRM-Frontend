"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { NotaDTO } from "@/types/NotaDTO"
import { getClientes } from "@/services/clienteService"
import { getUsuarios } from "@/services/usuarioService"
import { createNota, updateNota } from "@/services/notaService"

// Esquema de validación
const notaSchema = z.object({
    contenido: z.string().min(5, { message: "El contenido debe tener al menos 5 caracteres" }),
    fecha: z.string().min(1, { message: "La fecha es requerida" }),
    clienteId: z.string().min(1, { message: "Debe seleccionar un cliente" }),
    usuarioId: z.string().min(1, { message: "Debe seleccionar un usuario" }),
})

type NotaFormValues = z.infer<typeof notaSchema>

interface NotaFormProps {
    nota?: NotaDTO
    clienteId?: string
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function NotaForm({ nota, clienteId, isEditing = false, onSuccess, onCancel }: NotaFormProps) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [clientes, setClientes] = useState<{ id: string; nombre: string }[]>([])
    const [usuarios, setUsuarios] = useState<{ id: string; nombre: string }[]>([])

    // Cargar clientes y usuarios
    useEffect(() => {
        async function fetchData() {
            const clientesData = await getClientes()
            const usuariosData = await getUsuarios()
            setClientes(clientesData.map((c) => ({ id: String(c.id), nombre: c.nombre })))
            setUsuarios(usuariosData.map((u) => ({ id: String(u.id), nombre: u.nombre })))
        }
        fetchData()
    }, [])

    const defaultValues: Partial<NotaFormValues> = {
        contenido: nota?.contenido || "",
        fecha: nota?.fecha?.split("T")[0] || new Date().toISOString().split("T")[0],
        clienteId: String(nota?.clienteId ?? clienteId ?? ""),
        usuarioId: String(nota?.usuarioId ?? ""),
    }

    const form = useForm<NotaFormValues>({
        resolver: zodResolver(notaSchema),
        defaultValues,
    })

    async function onSubmit(data: NotaFormValues) {
        setIsSubmitting(true)

        // ✅ Asegurar que la fecha tenga hora para evitar errores de parseo en el backend
        const formattedFecha = data.fecha.includes("T")
            ? data.fecha
            : `${data.fecha}T12:00:00` // puedes cambiar "12:00:00" por cualquier hora por defecto

        const notaPayload: NotaDTO = {
            ...data,
            fecha: formattedFecha,
            clienteId: Number(data.clienteId),
            usuarioId: Number(data.usuarioId),
        }

        try {
            if (isEditing && nota) {
                if (nota.id === undefined) {
                    throw new Error("El ID de la nota no está definido para la actualización.")
                }

                await updateNota(nota.id, notaPayload)
                toast({ title: "Nota actualizada", description: "La nota ha sido actualizada correctamente." })
            } else {
                if (!clienteId) {
                    throw new Error("El clienteId es requerido para crear una nota.")
                }

                await createNota(Number(clienteId), notaPayload)
                toast({ title: "Nota creada", description: "La nota ha sido creada correctamente." })
            }

            if (onSuccess) onSuccess()
        } catch (error) {
            console.error(error)
            toast({ title: "Error", description: "Error al guardar la nota.", variant: "destructive" })
        } finally {
            setIsSubmitting(false)
        }
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="contenido"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contenido</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Escribe tu nota aquí..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                            <FormLabel>Usuario Responsable</FormLabel>
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
                        {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Nota" : "Crear Nota"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
