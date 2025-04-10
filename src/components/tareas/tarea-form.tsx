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
import type { TareaDTO } from "@/types/TareaDTO"
import { getClientes } from "@/services/clienteService"
import { getUsuarios } from "@/services/usuarioService"
import { createTarea, updateTarea } from "@/services/tareaService"

// Esquema de validación
const tareaSchema = z.object({
    titulo: z.string().min(2, { message: "El título debe tener al menos 2 caracteres" }),
    descripcion: z.string().min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
    fechaLimite: z.string().min(1, { message: "La fecha límite es requerida" }),
    horaLimite: z.string().min(1, { message: "La hora límite es requerida" }), // ✅ Añadir horaLimite
    estado: z.enum(["pendiente", "en_progreso", "completada"], {
        required_error: "El estado es requerido",
    }),
    clienteId: z.string().min(1, { message: "Debe seleccionar un cliente" }),
    asignadoA: z.string().min(1, { message: "Debe seleccionar un usuario asignado" }),
});


type TareaFormValues = z.infer<typeof tareaSchema>

interface TareaFormProps {
    tarea?: TareaDTO
    clienteId?: string
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function TareaForm({ tarea, clienteId, isEditing = false, onSuccess, onCancel }: TareaFormProps) {
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

    // Función para normalizar el estado desde el backend a frontend
    // ✅ Mapear el estado para mostrar correctamente en el formulario
    const mapEstadoToForm = (estado?: string): "pendiente" | "en_progreso" | "completada" => {
        if (!estado) return "pendiente";
        switch (estado.toLowerCase()) {
            case "en progreso":
            case "en_progreso":
                return "en_progreso";
            case "pendiente":
                return "pendiente";
            case "completada":
                return "completada";
            default:
                return "pendiente";
        }
    };


    const defaultValues: Partial<TareaFormValues> = {
        titulo: tarea?.titulo || "",
        descripcion: tarea?.descripcion || "",
        fechaLimite: tarea?.fechaLimite?.split("T")[0] || "", // Mantener formato de fecha
        horaLimite: tarea?.horaLimite || "09:00:00", // ✅ Añadir hora por defecto si no existe
        estado: mapEstadoToForm(tarea?.estado),
        clienteId: String(tarea?.clienteId ?? clienteId ?? ""),
        asignadoA: String(tarea?.asignadoA ?? ""),
    };






    const form = useForm<TareaFormValues>({
        resolver: zodResolver(tareaSchema),
        defaultValues,
    })

    // Función para normalizar el estado del formulario al formato del backend
    // ✅ Corregido: Devuelve solo valores válidos para TareaDTO.estado
    const mapEstadoToBackend = (estado: "pendiente" | "en_progreso" | "completada"): "pendiente" | "en_progreso" | "completada" => {
        switch (estado) {
            case "en_progreso":
                return "en_progreso";
            case "pendiente":
                return "pendiente";
            case "completada":
                return "completada";
            default:
                return "pendiente"; // Valor por defecto para evitar errores
        }
    };


    async function onSubmit(data: TareaFormValues) {
        setIsSubmitting(true);

        // ✅ Normalizar estado para el backend
        const normalizedEstado = mapEstadoToBackend(data.estado);

        // CORRECTO: Añadir ":00" si la hora no tiene segundos
        const formattedFechaLimite = `${data.fechaLimite}T${data.horaLimite.length === 5 ? data.horaLimite + ":00" : data.horaLimite}`;




        try {
            if (isEditing && tarea) {
                if (!tarea.id) {
                    throw new Error("No se puede actualizar sin un ID válido.");
                }
                await updateTarea(tarea.id, {
                    ...data,
                    fechaLimite: formattedFechaLimite, // ✅ Combinar fecha y hora
                    estado: normalizedEstado,
                    clienteId: Number(data.clienteId),
                    asignadoA: Number(data.asignadoA),
                });
                toast({
                    title: "Tarea actualizada",
                    description: "La tarea ha sido actualizada correctamente.",
                });
            } else {
                // ✅ Obtener el clienteId ya sea desde prop o desde el campo del formulario
                const clienteIdFinal = tarea?.clienteId ?? Number(data.clienteId);
                if (!clienteIdFinal || isNaN(clienteIdFinal)) {
                    throw new Error("El clienteId es necesario para crear una tarea.");
                }

                await createTarea(clienteIdFinal, {
                    ...data,
                    clienteId: clienteIdFinal,
                    fechaLimite: formattedFechaLimite,
                    estado: normalizedEstado,
                    asignadoA: Number(data.asignadoA),
                });
                
                toast({
                    title: "Tarea creada",
                    description: "La tarea ha sido creada correctamente.",
                });
            }

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Error al guardar la tarea.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
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
                                <Textarea placeholder="Descripción de la tarea" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fechaLimite"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha Límite</FormLabel>
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
                            <FormLabel>Hora Límite</FormLabel>
                            <FormControl>
                                {/* ❗️ SOLO UN HIJO AQUÍ */}
                                <Input type="time" {...field} />
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
                                    <SelectItem value="en_progreso">En Progreso</SelectItem>
                                    <SelectItem value="completada">Completada</SelectItem>
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
                        {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Tarea" : "Crear Tarea"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
