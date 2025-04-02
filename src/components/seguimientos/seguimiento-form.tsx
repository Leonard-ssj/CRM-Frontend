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
import type { SeguimientoDTO } from "@/types/SeguimientoDTO"
import { getClientes } from "@/services/clienteService"
import { getUsuarios } from "@/services/usuarioService"
import { createSeguimiento, updateSeguimiento } from "@/services/seguimientoService"

// Esquema de validación
const seguimientoSchema = z.object({
    tipo: z.enum(["llamada", "correo", "reunión"], {
        required_error: "El tipo de seguimiento es requerido",
    }),
    fecha: z.string().min(1, { message: "La fecha es requerida" }),
    comentarios: z.string().min(5, { message: "Los comentarios deben tener al menos 5 caracteres" }),
    clienteId: z.string().min(1, { message: "Debe seleccionar un cliente" }),
    usuarioId: z.string().min(1, { message: "Debe seleccionar un usuario" }),
})

type SeguimientoFormValues = z.infer<typeof seguimientoSchema>

interface SeguimientoFormProps {
    seguimiento?: SeguimientoDTO
    clienteId?: string
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function SeguimientoForm({ seguimiento, clienteId, isEditing = false, onSuccess, onCancel }: SeguimientoFormProps) {
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

    const defaultValues: Partial<SeguimientoFormValues> = {
        tipo: (seguimiento?.tipo as "llamada" | "correo" | "reunión") || "llamada",
        fecha: seguimiento?.fecha?.split("T")[0] || "", // ❗️ Aquí está el error
        comentarios: seguimiento?.comentarios || "",
        clienteId: String(seguimiento?.clienteId ?? clienteId ?? ""),
        usuarioId: String(seguimiento?.usuarioId ?? ""),
    }

    const form = useForm<SeguimientoFormValues>({
        resolver: zodResolver(seguimientoSchema),
        defaultValues,
    })

    async function onSubmit(data: SeguimientoFormValues) {
        setIsSubmitting(true)

        // ✅ Mapear los tipos de seguimiento al formato del enum de Java (sin tildes y en mayúsculas)
        const tipoMap: Record<string, string> = {
            llamada: "LLAMADA",
            correo: "CORREO",
            reunión: "REUNION",
        }

        // ✅ Formatear fecha agregando hora si no tiene
        const formattedFecha = data.fecha.includes("T")
            ? data.fecha
            : `${data.fecha}T12:00:00`

        try {
            if (isEditing && seguimiento) {
                if (!seguimiento.id) {
                    throw new Error("No se puede actualizar sin un ID válido.")
                }

                await updateSeguimiento(seguimiento.id, {
                    ...data,
                    tipo: tipoMap[data.tipo], // ✅ Mapear tipo
                    fecha: formattedFecha,    // ✅ Fecha con hora
                    clienteId: Number(data.clienteId),
                    usuarioId: Number(data.usuarioId),
                })

                toast({
                    title: "Seguimiento actualizado",
                    description: "El seguimiento ha sido actualizado correctamente.",
                })
            } else {
                if (!clienteId) {
                    throw new Error("El clienteId es necesario para crear un seguimiento.")
                }

                await createSeguimiento(Number(clienteId), {
                    ...data,
                    tipo: tipoMap[data.tipo], // ✅ Mapear tipo
                    fecha: formattedFecha,    // ✅ Fecha con hora
                    clienteId: Number(data.clienteId),
                    usuarioId: Number(data.usuarioId),
                })

                toast({
                    title: "Seguimiento creado",
                    description: "El seguimiento ha sido creado correctamente.",
                })
            }

            if (onSuccess) onSuccess()
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Error al guardar el seguimiento.",
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
                    name="tipo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Seguimiento</FormLabel>
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
                    name="comentarios"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comentarios</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Añade comentarios del seguimiento" {...field} />
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
                        {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Seguimiento" : "Crear Seguimiento"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
