"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { getClientes } from "@/services/clienteService"
import { createEvento, updateEvento } from "@/services/eventosService"
import { EventoDTO } from "@/types/EventoDTO"

// Validación con Zod
const eventoSchema = z.object({
    titulo: z.string().min(2, { message: "El título debe tener al menos 2 caracteres" }),
    fecha: z.string().min(1, { message: "La fecha es requerida" }),
    hora: z.string().min(1, { message: "La hora es requerida" }),
    tipo: z.enum(["REUNION", "PRESENTACION", "PRESENCIAL"], {
        required_error: "El tipo es requerido",
    }),
    descripcion: z.string().min(1, { message: "La descripción es requerida" }),
    clienteId: z.string().min(1, { message: "Debes seleccionar un cliente" }),
})

type EventoFormValues = z.infer<typeof eventoSchema>

interface EventoFormProps {
    evento?: {
        id: string
        titulo: string
        fecha: string
        tipo: "REUNION" | "PRESENTACION" | "PRESENCIAL"
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
    const [clientes, setClientes] = useState<{ id: string; nombre: string }[]>([])
    const navigate = useNavigate()

    // Cargar clientes desde backend
    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await getClientes()
                setClientes(response.map(c => ({ id: String(c.id), nombre: c.nombre })))
            } catch (error) {
                console.error("Error al cargar clientes", error)
            }
        }
        fetchClientes()
    }, [])

    const formatDateForInput = (dateString?: string) => {
        if (!dateString) return new Date().toISOString().split("T")[0]
        return new Date(dateString).toISOString().split("T")[0]
    }

    const formatTimeForInput = (dateString?: string) => {
        if (!dateString) return "12:00"
        const date = new Date(dateString)
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    const defaultValues: Partial<EventoFormValues> = {
        titulo: evento?.titulo || "",
        fecha: evento?.fecha ? formatDateForInput(evento.fecha) : formatDateForInput(),
        hora: evento?.fecha ? formatTimeForInput(evento.fecha) : formatTimeForInput(),
        tipo: evento?.tipo || "REUNION",
        descripcion: evento?.descripcion || "",
        clienteId: evento?.clienteId || "",
    }

    const form = useForm<EventoFormValues>({
        resolver: zodResolver(eventoSchema),
        defaultValues,
    })

    async function onSubmit(data: EventoFormValues) {
        setIsSubmitting(true);
        try {
            const [year, month, day] = data.fecha.split("-");
            const [hour, minute] = data.hora.split(":");
            const fechaHoraLocal = `${year}-${month}-${day}T${hour}:${minute}:00`;

            const eventoData: Omit<EventoDTO, "clienteNombre"> = {
                id: isEditing && evento ? Number(evento.id) : 0,
                titulo: data.titulo,
                descripcion: data.descripcion,
                fecha: fechaHoraLocal,
                tipo: data.tipo,
                clienteId: data.clienteId !== "none" ? Number(data.clienteId) : undefined,
                usuarioId: undefined,
            };

            if (isEditing && evento) {
                await updateEvento(Number(evento.id), eventoData);
            } else {
                await createEvento(eventoData);
            }

            toast({
                title: isEditing ? "Evento actualizado" : "Evento creado",
                description: isEditing
                    ? "Los datos del evento han sido actualizados correctamente."
                    : "El evento ha sido creado correctamente.",
            });

            if (onSuccess) {
                onSuccess();
            } else {
                navigate("/eventos");
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Ha ocurrido un error. Inténtalo de nuevo.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
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
                                        <SelectItem value="REUNION">Reunión</SelectItem>
                                        <SelectItem value="PRESENTACION">Presentación</SelectItem>
                                        <SelectItem value="PRESENCIAL">Presencial</SelectItem>
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
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => (onCancel ? onCancel() : navigate("/eventos"))}
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
