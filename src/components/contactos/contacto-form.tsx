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
import type { Contacto } from "@/types"
import { clientes } from "@/lib/data"
import { addContacto, updateContacto } from "@/lib/contactosData"

// Esquema de validación
const contactoSchema = z.object({
    nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    telefono: z.string().min(7, { message: "Teléfono inválido" }),
    puesto: z.string().optional(),
    clienteId: z.string().min(1, { message: "Debe seleccionar un cliente" }),
    notas: z.string().optional(),
})

type ContactoFormValues = z.infer<typeof contactoSchema>

interface ContactoFormProps {
    contacto?: Contacto
    clienteId?: string // Añadimos esta propiedad para permitir preseleccionar un cliente
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function ContactoForm({ contacto, clienteId, isEditing = false, onSuccess, onCancel }: ContactoFormProps) {
    const naviagte = useNavigate()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Valores por defecto
    const defaultValues: Partial<ContactoFormValues> = {
        nombre: contacto?.nombre || "",
        email: contacto?.email || "",
        telefono: contacto?.telefono || "",
        puesto: contacto?.puesto || "",
        clienteId: contacto?.clienteId || clienteId || "", // Usamos clienteId si está disponible
        notas: contacto?.notas || "",
    }

    const form = useForm<ContactoFormValues>({
        resolver: zodResolver(contactoSchema),
        defaultValues,
    })

    async function onSubmit(data: ContactoFormValues) {
        setIsSubmitting(true)
        try {
            // Simulación de envío de datos
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Guardar los datos (simulado)
            if (isEditing && contacto) {
                updateContacto(contacto.id, data)
            } else {
                addContacto(data)
            }

            // Mostrar mensaje de éxito
            toast({
                title: isEditing ? "Contacto actualizado" : "Contacto creado",
                description: isEditing
                    ? "Los datos del contacto han sido actualizados correctamente."
                    : "El contacto ha sido creado correctamente.",
            })

            // Si hay una función de éxito personalizada, la llamamos
            if (onSuccess) {
                onSuccess()
            } else {
                // Si no, redirigimos a la lista de contactos
                naviagte("/contactos")
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del contacto" {...field} />
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
                        name="puesto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Puesto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Puesto o cargo (opcional)" {...field} />
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
                        name="notas"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Notas</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Notas adicionales (opcional)" className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel ? onCancel : () => naviagte(-1)}
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
                            "Actualizar Contacto"
                        ) : (
                            "Crear Contacto"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

