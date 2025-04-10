"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Eye, Search, Plus, Calendar, User } from "lucide-react"
import type { TareaDTO } from "@/types/TareaDTO"
import { formatDateShort } from "@/lib/utils"

interface TareaTableProps {
    tareas: TareaDTO[]
    isLoading?: boolean
}

export function TareaTable({ tareas, isLoading = false }: TareaTableProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filtroEstado, setFiltroEstado] = useState<string>("todos")

    const getStatusColor = (status: string) => {
        const normalized = status.toLowerCase().replace("_", " ");
        switch (normalized) {
            case "pendiente":
                return "bg-yellow-500 hover:bg-yellow-500";
            case "en progreso":
                return "bg-blue-500 hover:bg-blue-500";
            case "completada":
                return "bg-green-500 hover:bg-green-500";
            default:
                return "bg-gray-500 hover:bg-gray-500";
        }
    }

    const formatStatus = (status: string) => {
        const normalized = status.toLowerCase().replace("_", " ");
        switch (normalized) {
            case "pendiente":
                return "Pendiente";
            case "en progreso":
                return "En progreso";
            case "completada":
                return "Completada";
            default:
                return normalized;
        }
    }


    const filteredTareas = tareas.filter(
        (tarea) =>
            (tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tarea.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tarea.clienteNombre?.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filtroEstado === "todos" || tarea.estado === filtroEstado)
    )
    

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar tareas..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos los estados</SelectItem>
                            <SelectItem value="pendiente">Pendientes</SelectItem>
                            <SelectItem value="en progreso">En progreso</SelectItem>
                            <SelectItem value="completada">Completadas</SelectItem>
                        </SelectContent>
                    </Select>
                    <Link to="/tareas/new">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Nueva Tarea
                        </Button>
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="w-full h-96 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : filteredTareas.length === 0 ? (
                <div className="w-full h-96 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-lg font-medium">No se encontraron tareas</h3>
                    <p className="text-muted-foreground">
                        {searchTerm || filtroEstado !== "todos"
                            ? "No hay resultados para tu búsqueda. Intenta con otros términos o filtros."
                            : "Aún no hay tareas registradas. Crea una nueva para comenzar."}
                    </p>
                    {!searchTerm && filtroEstado === "todos" && (
                        <Link to="/tareas/new" className="mt-4">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Crear Tarea
                            </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Estado</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Asignado a</TableHead>
                                <TableHead>Fecha límite</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTareas.map((tarea) => (
                                <TableRow key={tarea.id}>
                                    <TableCell>
                                        <Badge className={`${getStatusColor(tarea.estado)} text-white`}>
                                            {formatStatus(tarea.estado)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{tarea.titulo}</TableCell>
                                    <TableCell>{tarea.clienteNombre ?? "Cliente no encontrado"}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                            {tarea.asignadoANombre ?? "Usuario no encontrado"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                            {formatDateShort(tarea.fechaLimite)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link to={`/tareas/${tarea.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}
