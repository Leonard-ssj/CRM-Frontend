export interface SeguimientoDTO {
    id?: number;
    tipo: string; // Puede ser 'LLAMADA', 'EMAIL', 'REUNION'
    fecha: string; // Fecha como string ISO
    comentarios?: string;
    clienteId: number;
    usuarioId: number;
}
