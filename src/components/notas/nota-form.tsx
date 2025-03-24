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

// Esquema de validación
const notaSchema = z.object({
    contenido: z.string().min(5, { message: "El contenido debe tener al menos 5 caracteres" }),
})

type NotaFormValues = z.infer<typeof notaSchema>

interface NotaFormProps {
    clienteId: string
    nota?: Nota
    isEditing?: boolean
    onSuccess?: () => void
    onCancel?: () => void
}

export function NotaForm({ clienteId, nota, isEditing = false, onSuccess, onCancel }: NotaFormProps) {
    const { toast } = useToast()
    const { user } = useCurrentUser()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Valores por defecto
    const defaultValues: Partial<NotaFormValues> = {
        contenido: nota?.contenido || "",
    }

    const form = useForm<NotaFormValues>({
        resolver: zodResolver(notaSchema),
        defaultValues,
    })

    async function onSubmit(data: NotaFormValues) {
        setIsSubmitting(true)
        try {
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

