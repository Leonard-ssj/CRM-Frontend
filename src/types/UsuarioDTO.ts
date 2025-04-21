export interface UsuarioDTO {
    id: number
    nombre: string
    email: string
    rol: string
    createdAt?: string
    updatedAt?: string
    ultimoAcceso?: string
    ultimoCambioPerfil?: string
    ultimoCambioPassword?: string
}
