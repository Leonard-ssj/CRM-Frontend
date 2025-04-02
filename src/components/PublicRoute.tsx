// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom"

interface PublicRouteProps {
    children: React.ReactElement
}

export function PublicRoute({ children }: PublicRouteProps) {
    const token = localStorage.getItem("token")
    return token ? <Navigate to="/dashboard" /> : children
}
