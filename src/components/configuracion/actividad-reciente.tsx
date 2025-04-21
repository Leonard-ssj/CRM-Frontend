import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, UserCircle, Lock, LogIn } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useAuth } from "@/auth/AuthContext"

export function ActividadReciente() {
    const { user } = useAuth()

    const actividades = [
        {
            id: "1",
            tipo: "login",
            fecha: user?.ultimoAcceso || new Date().toISOString(),
            descripcion: "Inicio de sesión",
            icono: LogIn,
        },
        {
            id: "2",
            tipo: "perfil",
            fecha: user?.ultimoCambioPerfil || new Date().toISOString(),
            descripcion: "Actualización de perfil",
            icono: UserCircle,
        },
        {
            id: "3",
            tipo: "password",
            fecha: user?.ultimoCambioPassword || new Date().toISOString(),
            descripcion: "Cambio de contraseña",
            icono: Lock,
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Actividad reciente</CardTitle>
                <CardDescription>Historial de actividades recientes en tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {actividades.map((actividad) => (
                        <div key={actividad.id} className="flex items-start gap-3">
                            <div className="mt-0.5 bg-muted rounded-full p-1.5">
                                <actividad.icono className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{actividad.descripcion}</p>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {formatDate(actividad.fecha)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
