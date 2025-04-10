export interface TareaDTO {
    id?: number;
    titulo: string;
    descripcion?: string;
    fechaLimite: string; // Fecha como string ISO
    horaLimite: string,
    estado: "pendiente" | "en_progreso" | "completada"; // Corregido a "en_progreso"
    clienteId: number;
    asignadoA: number; // ID del usuario asignado

    clienteNombre?: string;
    asignadoANombre?: string;
}
