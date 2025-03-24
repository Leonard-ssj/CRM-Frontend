"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { clientesPorSector } from "@/lib/chartsData"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Colores para las secciones del gráfico
const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "#0088FE", "#00C49F", "#FFBB28"]

export function ClientesSectorChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Clientes por Sector</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={clientesPorSector}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {clientesPorSector.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

