"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Search, Plus } from "lucide-react"
import type { Cliente } from "@/types"
import { formatDateShort } from "@/lib/utils"

interface ClienteTableProps {
    clientes: Cliente[]
    isLoading?: boolean
}

export function ClienteTable({ clientes, isLoading = false }: ClienteTableProps) {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")

    // Filtrar clientes por término de búsqueda
    const filteredClientes = clientes.filter(
        (cliente) =>
            cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cliente.empresa?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar clientes..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link to="/clientes/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Cliente
                    </Button>
                </Link>
            </div>

            {isLoading ? (
                <div className="w-full h-96 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : filteredClientes.length === 0 ? (
                <div className="w-full h-96 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-lg font-medium">No se encontraron clientes</h3>
                    <p className="text-muted-foreground">
                        {searchTerm
                            ? "No hay resultados para tu búsqueda. Intenta con otros términos."
                            : "Aún no hay clientes registrados. Crea uno nuevo para comenzar."}
                    </p>
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Teléfono</TableHead>
                                <TableHead>Empresa</TableHead>
                                <TableHead>Fecha de creación</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredClientes.map((cliente) => (
                                <TableRow key={cliente.id}>
                                    <TableCell className="font-medium">{cliente.nombre}</TableCell>
                                    <TableCell>{cliente.email}</TableCell>
                                    <TableCell>{cliente.telefono}</TableCell>
                                    <TableCell>{cliente.empresa || "-"}</TableCell>
                                    <TableCell>{formatDateShort(cliente.fechaCreacion)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => navigate(`/clientes/${cliente.id}`)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
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

