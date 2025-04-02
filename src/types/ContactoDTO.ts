export interface ContactoDTO {
    id?: number;
    nombre: string;
    email: string;
    telefono: string;
    puesto?: string;
    notas?: string;
    clienteId: number;
    clienteNombre: string;
}
