// src/pages/NotFound.tsx
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken") // Cambiamos a accessToken

    const handleRedirect = () => {
        if (accessToken) {
            navigate("/dashboard")
        } else {
            navigate("/auth/login")
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Página no encontrada. Parece que te perdiste. 😳
            </p>
            <Button onClick={handleRedirect} className="mt-4">
                {accessToken ? "Ir al Dashboard" : "Ir al Login"} {/* Texto correcto */}
            </Button>
        </div>
    )
}
