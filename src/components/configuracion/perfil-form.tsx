"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { useAuth } from "@/auth/AuthContext"
import { updatePerfil, updatePassword } from "@/auth/authService"

// Validaciones
const perfilSchema = z.object({
    nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    apellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
})

const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, { message: "Por favor ingresa tu contraseña actual." }),
        newPassword: z.string().min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres." }),
        confirmPassword: z.string().min(6, { message: "Confirma tu nueva contraseña." }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"],
    })

type PerfilFormValues = z.infer<typeof perfilSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

export function PerfilForm() {
    const { user, fetchUser } = useAuth()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    // Formulario perfil
    const perfilForm = useForm<PerfilFormValues>({
        resolver: zodResolver(perfilSchema),
        defaultValues: {
            nombre: user?.nombre || "",
            apellido: user?.apellido || "",
        },
    })

    // Formulario contraseña
    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    // Actualizar nombre y apellido
    const onPerfilSubmit = async (data: PerfilFormValues) => {
        setIsSubmitting(true)
        try {
            await updatePerfil(data)
            await fetchUser() // Refrescar info
            toast({
                title: "Perfil actualizado",
                description: "Tu información fue guardada correctamente.",
            })
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || "No se pudo actualizar el perfil.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Actualizar contraseña
    const onPasswordSubmit = async (data: PasswordFormValues) => {
        setIsSubmitting(true)
        try {
            await updatePassword(data)
            toast({
                title: "Contraseña actualizada",
                description: "Tu contraseña ha sido cambiada con éxito.",
            })
            passwordForm.reset()
            setIsChangingPassword(false)
        } catch (error: any) {
            const message = error?.response?.data?.message || "Error al actualizar contraseña."

            // ✅ Mostrar mensaje si el backend devuelve un error específico
            passwordForm.setError("currentPassword", {
                type: "manual",
                message: message === "La contraseña actual es incorrecta."
                    ? "La contraseña actual es incorrecta."
                    : "Ocurrió un error al validar tu contraseña.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="space-y-6">
            {/* Tarjeta Perfil */}
            <Card>
                <CardHeader>
                    <CardTitle>Información de perfil</CardTitle>
                    <CardDescription>Actualiza tu información personal y de contacto.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.nombre} />
                                <AvatarFallback className="text-lg">
                                    {getInitials(user?.nombre || "U")}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-muted-foreground">
                                {user?.rol === "ADMIN" ? "Administrador" : "Usuario"}
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
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nombre" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={perfilForm.control}
                                        name="apellido"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apellido</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Apellido" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <Input value={user?.email || ""} disabled />
                                    </FormItem> */}
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Guardando..." : "Guardar cambios"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tarjeta Contraseña */}
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
