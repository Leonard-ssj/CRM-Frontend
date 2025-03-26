import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { usuarios } from "@/lib/data"
import { Clock, Mail, UserCircle, LogIn } from "lucide-react"

export function ActividadReciente() {
    // Simulamos que el primer usuario está logueado
    const currentUser = usuarios[0]

    // Actividades ficticias para mostrar
    const actividades = [
        {
            id: "1",
            tipo: "login",
            fecha: currentUser.ultimoAcceso || new Date().toISOString(),
            descripcion: "Inicio de sesión",
            icono: LogIn,
        },
        {
            id: "2",
            tipo: "perfil",
            fecha: "2025-03-20T09:15:00Z",
            descripcion: "Actualización de perfil",
            icono: UserCircle,
        },
        {
            id: "3",
            tipo: "email",
            fecha: "2025-03-18T14:30:00Z",
            descripcion: "Cambio de correo electrónico",
            icono: Mail,
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

