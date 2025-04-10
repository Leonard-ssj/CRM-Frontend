"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Plus, Calendar, Building2, Edit, Trash } from "lucide-react"
import type { EventoDTO } from "@/types/EventoDTO"
import { formatDate } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { ConfirmDeleteEvento } from "./confirmDeleteEvento"


interface EventoTableProps {
    eventos: EventoDTO[]
    isLoading?: boolean
    onDelete?: (id: number) => void // también cambiamos el id a number
}

export function EventoTable({ eventos, isLoading = false, onDelete }: EventoTableProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filtroTipo, setFiltroTipo] = useState<string>("todos")
    const { toast } = useToast()
    const [eventoIdAEliminar, setEventoIdAEliminar] = useState<number | null>(null)

    const getTipoColor = (tipo: string) => {
        switch (tipo) {
            case "REUNION":
                return "bg-blue-500 hover:bg-blue-500"
            case "PRESENCIAL":
                return "bg-green-500 hover:bg-green-500"
            case "PRESENTACION":
                return "bg-purple-500 hover:bg-purple-500"
            default:
                return "bg-gray-500 hover:bg-gray-500"
        }
    }

    const formatTipo = (tipo: string) => {
        switch (tipo) {
            case "REUNION":
                return "Reunión"
            case "PRESENCIAL":
                return "Presencial"
            case "PRESENTACION":
                return "Presentación"
            default:
                return tipo
        }
    }


    // Filtrar eventos por término de búsqueda y tipo
    const filteredEventos = eventos.filter(
        (evento) =>
            (evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                evento.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                evento.clienteNombre?.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filtroTipo === "todos" || evento.tipo === filtroTipo),
    )


    // // Manejar eliminación de evento
    // const handleDelete = (id: number) => {
    //     if (onDelete) {
    //         onDelete(id)
    //         toast({
    //             title: "Evento eliminado",
    //             description: "El evento ha sido eliminado correctamente.",
    //         })
    //     }
    // }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar eventos..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos los tipos</SelectItem>
                            <SelectItem value="REUNION">Reuniones</SelectItem>
                            <SelectItem value="PRESENCIAL">Presenciales</SelectItem>
                            <SelectItem value="PRESENTACION">Presentaciones</SelectItem>
                        </SelectContent>
                    </Select>
                    <Link to="/eventos/new">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo Evento
                        </Button>
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="w-full h-96 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : filteredEventos.length === 0 ? (
                <div className="w-full h-96 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-lg font-medium">No se encontraron eventos</h3>
                    <p className="text-muted-foreground">
                        {searchTerm || filtroTipo !== "todos"
                            ? "No hay resultados para tu búsqueda. Intenta con otros términos o filtros."
                            : "Aún no hay eventos registrados. Crea uno nuevo para comenzar."}
                    </p>
                    {!searchTerm && filtroTipo === "todos" && (
                        <Link to="/eventos/new" className="mt-4">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Crear Evento
                            </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEventos.map((evento) => (
                                <TableRow key={evento.id}>
                                    <TableCell>
                                        <Badge className={`${getTipoColor(evento.tipo)} text-white`}>{formatTipo(evento.tipo)}</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{evento.titulo}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                            {formatDate(evento.fecha)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {evento.clienteNombre ? (
                                            <div className="flex items-center">
                                                <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                                                {evento.clienteNombre}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Link to={`/eventos/${evento.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link to={`/eventos/${evento.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setEventoIdAEliminar(evento.id)}
                                            >
                                                <Trash className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {eventoIdAEliminar !== null && (
                <ConfirmDeleteEvento
                    open={eventoIdAEliminar !== null}
                    onCancel={() => setEventoIdAEliminar(null)}
                    onConfirm={() => {
                        if (onDelete) onDelete(eventoIdAEliminar)
                        setEventoIdAEliminar(null)
                        toast({
                            title: "Evento eliminado",
                            description: "El evento ha sido eliminado correctamente.",
                        })
                    }}
                />
            )}
        </div>
    )
}



