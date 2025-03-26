"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X, CheckSquare, MessageCircle, FileText, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FloatingActionsProps {
    onCreateTarea: () => void
    onCreateSeguimiento: () => void
    onCreateNota: () => void
    onCreateEvento: () => void
}

export function FloatingActions({
    onCreateTarea,
    onCreateSeguimiento,
    onCreateNota,
    onCreateEvento,
}: FloatingActionsProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-6 right-6">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
                        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={onCreateTarea} className="cursor-pointer">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        <span>Nueva Tarea</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onCreateSeguimiento} className="cursor-pointer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Nuevo Seguimiento</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onCreateNota} className="cursor-pointer">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Nueva Nota</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onCreateEvento} className="cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Nuevo Evento</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

