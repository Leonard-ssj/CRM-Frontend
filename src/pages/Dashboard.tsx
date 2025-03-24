import { dashboardStats, getEventosProximos, getTareasPendientes } from "@/lib/data"
import { StatsCard } from "@/components/dashboard/stats-card"
import { TareasRecientes } from "@/components/dashboard/tareas-recientes"
import { EventosProximos } from "@/components/dashboard/eventos-proximos"
import { Users, CheckSquare, User, FileText } from "lucide-react"
import { formatDate } from "@/lib/utils"

// 👉 Gráficos
import { VentasChart } from "@/components/dashboard/ventas-chart"
import { ClientesSectorChart } from "@/components/dashboard/clientes-sector-chart"
import { SeguimientosChart } from "@/components/dashboard/seguimientos-chart"

export default function Dashboard() {
    const tareasPendientes = getTareasPendientes().slice(0, 5)
    const eventosProximos = getEventosProximos().slice(0, 5)

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            {/* Estadísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total de clientes"
                    value={dashboardStats.totalClientes}
                    icon={Users}
                    iconColor="text-blue-500"
                    description="Clientes registrados"
                />
                <StatsCard
                    title="Contactos agregados"
                    value={dashboardStats.totalContactos}
                    icon={FileText}
                    iconColor="text-green-500"
                    description="Contactos en sistema"
                />
                <StatsCard
                    title="Tareas activas"
                    value={`${dashboardStats.tareasActivas} en progreso`}
                    icon={CheckSquare}
                    iconColor="text-yellow-500"
                    description="Requieren atención"
                />
                <StatsCard
                    title="Último acceso"
                    value="👤 Tú"
                    icon={User}
                    iconColor="text-purple-500"
                    description={
                        dashboardStats.ultimoAcceso
                            ? formatDate(dashboardStats.ultimoAcceso)
                            : "Fecha no disponible"
                    }
                />
            </div>

            {/* Tareas y eventos */}
            <div className="grid gap-6 md:grid-cols-2">
                <TareasRecientes tareas={tareasPendientes} />
                <EventosProximos eventos={eventosProximos} />
            </div>

            {/* Gráficos */}
            <h2 className="text-2xl font-semibold mt-6">Análisis y Estadísticas</h2>

            <div className="grid gap-6 md:grid-cols-3 mt-4">
                <VentasChart />
                <ClientesSectorChart />
            </div>

            <div className="mt-6">
                <SeguimientosChart />
            </div>
        </div>
    )
}
