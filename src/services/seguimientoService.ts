import api from "@/api/axiosInstance";
import { SeguimientoDTO } from "../types/SeguimientoDTO";

const getSeguimientosByCliente = async (clienteId: number) => {
    const response = await api.get<SeguimientoDTO[]>(`/api/clientes/${clienteId}/seguimientos`);
    return response.data;
};

const createSeguimiento = async (clienteId: number, seguimiento: SeguimientoDTO) => {
    const response = await api.post(`/api/clientes/${clienteId}/seguimientos`, seguimiento);
    return response.data;
};

const updateSeguimiento = async (id: number, seguimiento: SeguimientoDTO) => {
    const response = await api.put(`/api/clientes/${seguimiento.clienteId}/seguimientos/${id}`, seguimiento);
    return response.data;
};

const deleteSeguimiento = async (id: number) => {
    await api.delete(`/api/clientes/${id}/seguimientos/${id}`);
};

export { getSeguimientosByCliente, createSeguimiento, updateSeguimiento, deleteSeguimiento };
