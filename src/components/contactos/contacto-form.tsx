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
import type { ContactoDTO } from "@/types/ContactoDTO"
import { getClientes } from "@/services/clienteService"
import { createContacto, updateContacto } from "@/services/contactoService"

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
    contacto?: ContactoDTO
    clienteId?: string
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function ContactoForm({
    contacto,
    clienteId,
    isEditing = false,
    onSuccess,
    onCancel,
}: ContactoFormProps) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [clientes, setClientes] = useState<{ id: string; nombre: string }[]>([])

    // Cargar clientes para el formulario
    useEffect(() => {
        async function fetchClientes() {
            const data = await getClientes();
            setClientes(data.map((c) => ({ id: String(c.id), nombre: c.nombre })));
        }
        fetchClientes();
    }, []);

    const defaultValues: Partial<ContactoFormValues> = {
        nombre: contacto?.nombre || "",
        email: contacto?.email || "",
        telefono: contacto?.telefono || "",
        puesto: contacto?.puesto || "",
        clienteId: String(contacto?.clienteId ?? clienteId ?? ""),
        notas: contacto?.notas || "",
    };


    const form = useForm<ContactoFormValues>({
        resolver: zodResolver(contactoSchema),
        defaultValues,
    })

    async function onSubmit(data: ContactoFormValues) {
        setIsSubmitting(true)
        try {
            if (isEditing && contacto) {
                if (!contacto.id) {
                    throw new Error("No se puede actualizar sin un ID válido.");
                }
                await updateContacto(contacto.id, {
                    ...data,
                    clienteId: Number(data.clienteId),
                });
                toast({ title: "Contacto actualizado", description: "El contacto ha sido actualizado correctamente." });
            } else {
                if (!clienteId) {
                    throw new Error("El clienteId es necesario para crear un contacto.");
                }
                await createContacto(Number(clienteId), {
                    ...data,
                    clienteId: Number(data.clienteId),
                });
                toast({ title: "Contacto creado", description: "El contacto ha sido creado correctamente." });
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Error al guardar el contacto.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <Input placeholder="Puesto del contacto" {...field} />
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
                        <FormItem>
                            <FormLabel>Notas</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Notas adicionales" {...field} />
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
                        {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Contacto" : "Crear Contacto"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
