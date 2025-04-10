export interface EventoDTO {
    id: number
    titulo: string
    fecha: string // ISO string
    tipo: 'REUNION' | 'PRESENCIAL' | 'PRESENTACION'
    descripcion?: string
    clienteId?: number
    clienteNombre?: string
    usuarioId?: number // nuevo campo en EventoDTO
}
