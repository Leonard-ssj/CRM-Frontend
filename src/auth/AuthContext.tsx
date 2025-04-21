// src/auth/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "@/api/axiosInstance";
import { clearTokens, getAccessToken, saveTokens } from "@/auth/authService";
import { useNavigate } from "react-router-dom";

interface User {
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
    ultimoAcceso?: string;
    ultimoCambioPerfil?: string;
    ultimoCambioPassword?: string;
}


interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    fetchUser: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // Obtener datos del usuario desde /auth/me
    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            console.error("Error al obtener datos del usuario", error);
            logout();
        }
    };

    // Cerrar sesión
    const logout = () => {
        clearTokens();
        setUser(null);
        navigate("/auth/login");
    };

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            fetchUser();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro de AuthProvider");
    }
    return context;
};
