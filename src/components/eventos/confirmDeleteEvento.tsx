import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDeleteEventoProps {
    open: boolean
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmDeleteEvento({ open, onConfirm, onCancel }: ConfirmDeleteEventoProps) {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar evento?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. El evento será eliminado permanentemente del sistema.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Button variant="destructive" onClick={onConfirm}>
                        Eliminar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
