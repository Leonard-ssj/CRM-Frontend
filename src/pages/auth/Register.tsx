// src/pages/auth/Register.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/auth/AuthContext"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import api from "@/api/axiosInstance"
import { saveTokens } from "@/auth/authService"

const registerSchema = z.object({
    nombre: z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
        .regex(/^[a-zA-Z]+$/, { message: "El nombre solo debe contener letras" }),
    apellido: z
        .string()
        .min(3, { message: "El apellido debe tener al menos 3 caracteres" })
        .regex(/^[a-zA-Z]+$/, { message: "El apellido solo debe contener letras" }),
    email: z.string().email({ message: "Correo inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function Register() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { nombre: "", apellido: "", email: "", password: "" },
    })

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true)
        try {
            // ✅ Petición al backend para registro
            const response = await api.post("/auth/register", data)
            const { accessToken, refreshToken } = response.data

            // ✅ Guardar tokens
            saveTokens(accessToken, refreshToken)

            // ✅ Obtener datos del usuario después del registro
            const userResponse = await api.get("/auth/me")
            setUser(userResponse.data)

            // ✅ Mostrar mensaje de éxito
            toast({ title: "Registro exitoso", description: "Bienvenido a la plataforma" })
            navigate("/dashboard")
        } catch (error: any) {
            // ⛔️ Manejar errores del backend
            const backendError = error.response?.data?.error || "Ocurrió un error inesperado"
            form.setError("root.backendError", {
                type: "manual",
                message: backendError,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted auth-bg">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Crear cuenta</CardTitle>
                    <CardDescription>Completa los campos para registrarte</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Mostrar errores del backend si hay */}
                            {form.formState.errors.root?.backendError && (
                                <div className="text-red-500 text-sm">
                                    {form.formState.errors.root.backendError.message}
                                </div>
                            )}

                            {/* Campo Nombre */}
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Campo Apellido */}
                            <FormField
                                control={form.control}
                                name="apellido"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellido</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Campo Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Campo Contraseña */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Botón de Registro */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Cargando..." : "Registrarse"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                {/* Pie de página con enlace a login */}
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                    <div>
                        ¿Ya tienes cuenta?{" "}
                        <a href="/auth/login" className="ml-1 text-primary hover:underline">
                            Inicia sesión
                        </a>
                    </div>
                    <ThemeToggle /> {/* <-- Agregamos ThemeToggle aquí */}
                </CardFooter>
            </Card>
        </div>
    )
}
