"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Search, Plus, Building2 } from "lucide-react"
import type { Contacto } from "@/types"
import { getClienteNombreById } from "@/lib/contactosData"

interface ContactoTableProps {
    contactos: Contacto[]
    isLoading?: boolean
}

export function ContactoTable({ contactos, isLoading = false }: ContactoTableProps) {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")

    // Filtrar contactos por término de búsqueda
    const filteredContactos = contactos.filter(
        (contacto) =>
            contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contacto.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contacto.puesto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            getClienteNombreById(contacto.clienteId).toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar contactos..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link to="/contactos/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Contacto
                    </Button>
                </Link>
            </div>

            {isLoading ? (
                <div className="w-full h-96 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : filteredContactos.length === 0 ? (
                <div className="w-full h-96 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-lg font-medium">No se encontraron contactos</h3>
                    <p className="text-muted-foreground">
                        {searchTerm
                            ? "No hay resultados para tu búsqueda. Intenta con otros términos."
                            : "Aún no hay contactos registrados. Crea uno nuevo para comenzar."}
                    </p>
                    {!searchTerm && (
                        <Link to="/contactos/new" className="mt-4">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Crear Contacto
                            </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Teléfono</TableHead>
                                <TableHead>Puesto</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredContactos.map((contacto) => (
                                <TableRow key={contacto.id}>
                                    <TableCell className="font-medium">{contacto.nombre}</TableCell>
                                    <TableCell>{contacto.email}</TableCell>
                                    <TableCell>{contacto.telefono}</TableCell>
                                    <TableCell>{contacto.puesto || "-"}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                                            {getClienteNombreById(contacto.clienteId)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => navigate(`/contactos/${contacto.id}`)}>
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

