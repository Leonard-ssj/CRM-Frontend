"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ventasPorMes } from "@/lib/chartsData"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function VentasChart() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Ventas por Mes</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={ventasPorMes}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, "Ventas"]} labelFormatter={(label) => `Mes: ${label}`} />
                        <Bar dataKey="ventas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

