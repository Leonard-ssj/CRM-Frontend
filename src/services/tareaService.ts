import api from "@/api/axiosInstance";
import { TareaDTO } from "../types/TareaDTO";

// Obtener tareas por cliente
const getTareasByCliente = async (clienteId: number) => {
    const response = await api.get<TareaDTO[]>(`/api/clientes/${clienteId}/tareas`);
    return response.data;
};

// Crear nueva tarea
const createTarea = async (clienteId: number, tarea: TareaDTO) => {
    const response = await api.post(`/api/clientes/${clienteId}/tareas`, tarea);
    return response.data;
};

// Actualizar tarea
const updateTarea = async (id: number, tarea: TareaDTO) => {
    const response = await api.put(`/api/clientes/${tarea.clienteId}/tareas/${id}`, tarea);
    return response.data;
};

// Eliminar tarea
const deleteTarea = async (id: number) => {
    await api.delete(`/api/clientes/${id}/tareas/${id}`);
};

export { getTareasByCliente, createTarea, updateTarea, deleteTarea };
