// src/api/axiosInstance.ts
import axios from "axios";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "@/auth/authService";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// Añadir token a las peticiones si existe
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptar respuestas para refrescar token si expira
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();
                if (refreshToken) {
                    const { data } = await axios.post("http://localhost:8080/auth/refresh", {
                        refreshToken: refreshToken,
                    });

                    // Guardar nuevos tokens
                    saveTokens(data.accessToken, data.refreshToken);
                    originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

                    // Reintentar la petición original
                    return api(originalRequest);
                }
            } catch (err) {
                clearTokens(); // Limpiar tokens si el refreshToken falla
                window.location.href = "/auth/login";
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
