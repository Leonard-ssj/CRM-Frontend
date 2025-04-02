"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { ClienteDTO } from "@/types/ClienteDTO"
import { createCliente, updateCliente } from "@/services/clienteService"

// ✅ Esquema de validación con Zod
const clienteSchema = z.object({
    nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    telefono: z.string().min(7, { message: "Teléfono inválido" }),
    empresa: z.string().optional(),
    ubicacion: z.string().optional(),
})

type ClienteFormValues = z.infer<typeof clienteSchema>

interface ClienteFormProps {
    cliente?: ClienteDTO
    isEditing?: boolean
}

export function ClienteForm({ cliente, isEditing = false }: ClienteFormProps) {
    const navigate = useNavigate()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // ✅ Valores por defecto para el formulario
    const defaultValues: Partial<ClienteFormValues> = {
        nombre: cliente?.nombre || "",
        email: cliente?.email || "",
        telefono: cliente?.telefono || "",
        empresa: cliente?.empresa || "",
        ubicacion: cliente?.ubicacion || "",
    }

    const form = useForm<ClienteFormValues>({
        resolver: zodResolver(clienteSchema),
        defaultValues,
    })

    // ✅ Función para manejar el envío del formulario
    async function onSubmit(data: ClienteFormValues) {
        setIsSubmitting(true)
        try {
            if (isEditing && cliente?.id) {
                // ✅ Actualizar cliente si estamos editando
                await updateCliente(cliente.id, data)
                toast({
                    title: "Cliente actualizado",
                    description: "Los datos del cliente han sido actualizados correctamente.",
                })
            } else {
                // ✅ Crear nuevo cliente
                await createCliente(data)
                toast({
                    title: "Cliente creado",
                    description: "El cliente ha sido creado correctamente.",
                })
            }

            // ✅ Redireccionar a la lista de clientes
            navigate("/clientes")
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del cliente" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input placeholder="555-1234" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="empresa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Empresa</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre de la empresa (opcional)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ubicacion"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Ubicación</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Dirección o ubicación (opcional)" className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                {isEditing ? "Actualizando..." : "Guardando..."}
                            </>
                        ) : isEditing ? (
                            "Actualizar Cliente"
                        ) : (
                            "Crear Cliente"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
