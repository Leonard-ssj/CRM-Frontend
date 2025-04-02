// src/pages/auth/Login.tsx
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

const loginSchema = z.object({
    email: z.string().email({ message: "Correo inválido" }),
    password: z.string().min(1, { message: "Ingresa tu contraseña" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    })

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        try {
            // ✅ Petición al backend para login
            const response = await api.post("/auth/login", data)
            const { accessToken, refreshToken } = response.data

            // ✅ Guardar tokens
            saveTokens(accessToken, refreshToken)

            // ✅ Obtener datos del usuario después del login
            const userResponse = await api.get("/auth/me")
            setUser(userResponse.data)

            // ✅ Mostrar mensaje de éxito
            toast({ title: "Login exitoso", description: "Bienvenido de nuevo" })
            navigate("/dashboard")
        } catch (error: any) {
            // ⛔️ Manejar errores del backend
            const backendError = error.response?.data?.error || "Credenciales incorrectas"
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
                    <CardTitle>Iniciar sesión</CardTitle>
                    <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
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

                            {/* Botón de Ingreso */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Cargando..." : "Entrar"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                {/* Pie de página con enlace a registro */}
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                    <div>
                        ¿No tienes cuenta?{" "}
                        <a href="/auth/register" className="ml-1 text-primary hover:underline">
                            Regístrate
                        </a>
                    </div>
                    <ThemeToggle /> {/* <-- Agregamos ThemeToggle aquí */}
                </CardFooter>
            </Card>
        </div>
    )
}
