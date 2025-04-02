export interface ClienteDTO {
    id?: number;
    nombre: string;
    email: string;
    telefono: string;
    empresa?: string;
    ubicacion?: string;
    fechaCreacion?: string; // Puede ser null o string
}
