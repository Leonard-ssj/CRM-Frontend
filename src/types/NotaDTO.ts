export interface NotaDTO {
    id?: number;
    contenido: string;
    fecha: string; // Fecha como string ISO
    clienteId: number;
    usuarioId: number; // ID del usuario que creó la nota
}
