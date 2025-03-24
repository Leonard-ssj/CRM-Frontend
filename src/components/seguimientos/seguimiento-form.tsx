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

// Esquema de validación
const seguimientoSchema = z.object({
    tipo: z.enum(["llamada", "correo", "reunión"], {
        required_error: "El tipo de seguimiento es requerido",
    }),
    comentarios: z.string().min(5, { message: "Los comentarios deben tener al menos 5 caracteres" }),
})

type SeguimientoFormValues = z.infer<typeof seguimientoSchema>

interface SeguimientoFormProps {
    clienteId: string
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

    // Valores por defecto
    const defaultValues: Partial<SeguimientoFormValues> = {
        tipo: seguimiento?.tipo || "llamada",
        comentarios: seguimiento?.comentarios || "",
    }

    const form = useForm<SeguimientoFormValues>({
        resolver: zodResolver(seguimientoSchema),
        defaultValues,
    })

    async function onSubmit(data: SeguimientoFormValues) {
        setIsSubmitting(true)
        try {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

