"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { usuarios } from "@/lib/data"

// Esquema de validación para el formulario de perfil
const perfilSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor ingresa un correo electrónico válido.",
    }),
})

// Esquema de validación para el formulario de cambio de contraseña
const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, {
            message: "Por favor ingresa tu contraseña actual.",
        }),
        newPassword: z.string().min(8, {
            message: "La nueva contraseña debe tener al menos 8 caracteres.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Por favor confirma tu nueva contraseña.",
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"],
    })

type PerfilFormValues = z.infer<typeof perfilSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

export function PerfilForm() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    // Simulamos que el primer usuario está logueado
    const currentUser = usuarios[0]

    // Formulario de perfil
    const perfilForm = useForm<PerfilFormValues>({
        resolver: zodResolver(perfilSchema),
        defaultValues: {
            nombre: currentUser.nombre,
            email: currentUser.email,
        },
    })

    // Formulario de cambio de contraseña
    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    // Manejar envío del formulario de perfil
    async function onPerfilSubmit(data: PerfilFormValues) {
        setIsSubmitting(true)
        try {
            // Simulación de envío de datos
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: "Perfil actualizado",
                description: "Tu información de perfil ha sido actualizada correctamente.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Ha ocurrido un error al actualizar tu perfil.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Manejar envío del formulario de cambio de contraseña
    async function onPasswordSubmit(data: PasswordFormValues) {
        setIsSubmitting(true)
        try {
            // Simulación de envío de datos
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: "Contraseña actualizada",
                description: "Tu contraseña ha sido actualizada correctamente.",
            })

            // Resetear el formulario
            passwordForm.reset({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })

            // Ocultar el formulario de cambio de contraseña
            setIsChangingPassword(false)
        } catch (error) {
            toast({
                title: "Error",
                description: "Ha ocurrido un error al actualizar tu contraseña.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Tarjeta de perfil */}
            <Card>
                <CardHeader>
                    <CardTitle>Información de perfil</CardTitle>
                    <CardDescription>Actualiza tu información personal y de contacto.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={currentUser.nombre} />
                                <AvatarFallback className="text-lg">{getInitials(currentUser.nombre)}</AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-muted-foreground">
                                {currentUser.rol === "ADMIN" ? "Administrador" : "Vendedor"}
                            </p>
                        </div>
                        <div className="flex-1">
                            <Form {...perfilForm}>
                                <form onSubmit={perfilForm.handleSubmit(onPerfilSubmit)} className="space-y-4">
                                    <FormField
                                        control={perfilForm.control}
                                        name="nombre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre completo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Tu nombre completo" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={perfilForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo electrónico</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="tu@ejemplo.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Guardando..." : "Guardar cambios"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tarjeta de cambio de contraseña */}
            <Card>
                <CardHeader>
                    <CardTitle>Cambiar contraseña</CardTitle>
                    <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!isChangingPassword ? (
                        <Button onClick={() => setIsChangingPassword(true)}>Cambiar contraseña</Button>
                    ) : (
                        <Form {...passwordForm}>
                            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                                <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contraseña actual</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nueva contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormDescription>La contraseña debe tener al menos 8 caracteres.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirmar nueva contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Guardando..." : "Actualizar contraseña"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsChangingPassword(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

