import { CalendarDashboard } from "@/components/calendario/calendar-dashboard"


export default function CalendarioPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
            </div>
            <CalendarDashboard />
        </div>
    )
}

