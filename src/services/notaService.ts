import api from "@/api/axiosInstance"
import { NotaDTO } from "../types/NotaDTO"

// Obtener notas por cliente
const getNotasByCliente = async (clienteId: number) => {
    const response = await api.get<NotaDTO[]>(`/api/clientes/${clienteId}/notas`)
    return response.data
}

// Crear nueva nota (clienteId + nota)
const createNota = async (clienteId: number, nota: NotaDTO) => {
    const response = await api.post(`/api/clientes/${clienteId}/notas`, nota)
    return response.data
}

// Actualizar nota (id + nota)
const updateNota = async (id: number, nota: NotaDTO) => {
    const response = await api.put(`/api/clientes/${nota.clienteId}/notas/${id}`, nota)
    return response.data
}

// Eliminar nota
const deleteNota = async (id: number) => {
    await api.delete(`/api/clientes/${id}/notas/${id}`)
}

export { getNotasByCliente, createNota, updateNota, deleteNota }
