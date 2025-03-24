import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Tarea } from "@/types"
import { formatDateShort } from "@/lib/utils"
import { getUsuarioById } from "@/lib/data"

interface TareasRecientesProps {
    tareas: Tarea[]
}

export function TareasRecientes({ tareas }: TareasRecientesProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "pendiente":
                return "bg-yellow-500 hover:bg-yellow-500"
            case "en progreso":
                return "bg-blue-500 hover:bg-blue-500"
            case "completada":
                return "bg-green-500 hover:bg-green-500"
            default:
                return "bg-gray-500 hover:bg-gray-500"
        }
    }

    const formatStatus = (status: string) => {
        switch (status) {
            case "pendiente":
                return "Pendiente"
            case "en progreso":
                return "En proceso"
            case "completada":
                return "Completada"
            default:
                return status
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tareas recientes / pendientes</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tarea</TableHead>
                            <TableHead>Responsable</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha límite</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tareas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No hay tareas pendientes
                                </TableCell>
                            </TableRow>
                        ) : (
                            tareas.map((tarea) => {
                                const usuario = getUsuarioById(tarea.asignadoA)
                                return (
                                    <TableRow key={tarea.id}>
                                        <TableCell className="font-medium">{tarea.titulo}</TableCell>
                                        <TableCell>{usuario?.nombre || "Sin asignar"}</TableCell>
                                        <TableCell>
                                            <Badge className={`${getStatusColor(tarea.estado)} text-white`}>
                                                {formatStatus(tarea.estado)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{formatDateShort(tarea.fechaLimite)}</TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}