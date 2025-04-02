import api from "@/api/axiosInstance";
import { UsuarioDTO } from "../types/UsuarioDTO";

// Obtener todos los usuarios
export async function getUsuarios(): Promise<UsuarioDTO[]> {
    const { data } = await api.get("/api/usuarios");
    return data;
}

// Obtener un usuario por ID
export async function getUsuarioById(id: number): Promise<UsuarioDTO> {
    const { data } = await api.get(`/api/usuarios/${id}`);
    return data;
}
