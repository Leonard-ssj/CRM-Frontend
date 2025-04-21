// src/auth/authService.ts
import api from "@/api/axiosInstance"

export const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export async function updatePerfil(data: { nombre: string; apellido: string }) {
    const response = await api.put("/auth/me", data)
    return response.data
}

export async function updatePassword(data: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}) {
    const response = await api.put("/auth/me/password", data)
    return response.data
}