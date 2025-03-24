"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { seguimientosPorTipo } from "@/lib/chartsData"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function SeguimientosChart() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Seguimientos por Tipo</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={seguimientosPorTipo}
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
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="llamadas" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="correos" stroke="#0088FE" />
                        <Line type="monotone" dataKey="reuniones" stroke="#00C49F" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

