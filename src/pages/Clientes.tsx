import { useClientes } from "../lib/hooks"
import { ClienteTable } from "../components/clientes/cliente-table"

export default function Clientes() {
    const { clientes, loading } = useClientes()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
                <ClienteTable clientes={clientes} isLoading={loading} />
        </div>
    )
}
