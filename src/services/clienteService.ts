import api from "@/api/axiosInstance"
import { ClienteDTO } from "@/types/ClienteDTO"

// Obtener todos los clientes
export async function getClientes(): Promise<ClienteDTO[]> {
    const { data } = await api.get("/api/clientes")
    return data
}

// Obtener un cliente por ID
export async function getClienteById(id: number): Promise<ClienteDTO> {
    const { data } = await api.get(`/api/clientes/${id}`)
    return data
}

// Crear nuevo cliente
export async function createCliente(cliente: Omit<ClienteDTO, "id">): Promise<ClienteDTO> {
    const { data } = await api.post("/api/clientes", cliente)
    return data
}

// Actualizar cliente
export async function updateCliente(id: number, cliente: Omit<ClienteDTO, "id">): Promise<ClienteDTO> {
    const { data } = await api.put(`/api/clientes/${id}`, cliente)
    return data
}

// Eliminar cliente
export async function deleteCliente(id: number): Promise<void> {
    await api.delete(`/api/clientes/${id}`)
}
