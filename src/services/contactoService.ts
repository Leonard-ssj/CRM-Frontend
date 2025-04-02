import api from "@/api/axiosInstance";
import { ContactoDTO } from "../types/ContactoDTO";

// Obtener contactos por cliente
const getContactosByCliente = async (clienteId: number) => {
    const response = await api.get<ContactoDTO[]>(`/api/clientes/${clienteId}/contactos`);
    return response.data;
};

// Crear nuevo contacto
const createContacto = async (clienteId: number, contacto: ContactoDTO) => {
    const response = await api.post(`/api/clientes/${clienteId}/contactos`, contacto);
    return response.data;
};

// Actualizar contacto
const updateContacto = async (id: number, contacto: ContactoDTO) => {
    const response = await api.put(`/api/clientes/${contacto.clienteId}/contactos/${id}`, contacto);
    return response.data;
};

// Eliminar contacto
const deleteContacto = async (id: number) => {
    await api.delete(`/api/clientes/${id}/contactos/${id}`);
};

// Obtener todos los contactos (de cualquier cliente)
const getAllContactos = async () => {
    const response = await api.get<ContactoDTO[]>("/api/contactos")
    return response.data
}

export { getContactosByCliente, createContacto, updateContacto, deleteContacto, getAllContactos }

