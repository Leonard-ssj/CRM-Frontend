// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/auth/authService";

interface PrivateRouteProps {
    children: React.ReactElement;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const token = getAccessToken();
    return token ? children : <Navigate to="/auth/login" />;
}
