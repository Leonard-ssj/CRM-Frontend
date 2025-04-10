import api from "@/api/axiosInstance";
import { EventoDTO } from "@/types/EventoDTO";

export const getEventos = async (): Promise<EventoDTO[]> => {
    const response = await api.get("/api/eventos")
    return response.data
}

export const getEventoById = async (id: number): Promise<EventoDTO> => {
    const response = await api.get(`/api/eventos/${id}`)
    return response.data
}

export const deleteEvento = async (id: number): Promise<void> => {
    await api.delete(`/api/eventos/${id}`)
}

export const createEvento = async (evento: Omit<EventoDTO, "id" | "clienteNombre">): Promise<EventoDTO> => {
    const response = await api.post("/api/eventos", evento)
    return response.data
}

export const updateEvento = async (id: number, evento: Omit<EventoDTO, "clienteNombre">): Promise<EventoDTO> => {
    const response = await api.put(`/api/eventos/${id}`, evento)
    return response.data
}
