// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "@/pages/Dashboard"
import Clientes from "@/pages/Clientes"
import Contactos from "@/pages/Contactos"
import NuevoCliente from "@/pages/NuevoCliente"
import ClienteDetail from "@/pages/ClienteDetail"
import NuevoContacto from "@/pages/NuevoContacto"
import ContactoDetail from "@/pages/ContactoDetail"
import Tareas from "@/pages/Tareas"
import NuevaTareaPage from "@/pages/NuevaTarea"
import TareaDetail from "@/pages/TareaDetail"
import Calendario from "@/pages/Calendario"
import Eventos from "@/pages/Eventos"
import NuevoEvento from "@/pages/NuevoEvento"
import EditarEvento from "@/pages/EditarEvento"
import EventoDetail from "@/pages/EventoDetail"
import Configuracion from "@/pages/Configuracion"
import NotFound from "@/pages/NotFound"

// Rutas protegidas
import { PrivateRoute } from "@/components/PrivateRoute"

export default function AppRoutes() {
    return (
        <Routes>
            {/* Rutas protegidas con PrivateRoute */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/clientes"
                element={
                    <PrivateRoute>
                        <Clientes />
                    </PrivateRoute>
                }
            />
            <Route
                path="/clientes/new"
                element={
                    <PrivateRoute>
                        <NuevoCliente />
                    </PrivateRoute>
                }
            />
            <Route
                path="/clientes/:id"
                element={
                    <PrivateRoute>
                        <ClienteDetail />
                    </PrivateRoute>
                }
            />
            <Route
                path="/contactos"
                element={
                    <PrivateRoute>
                        <Contactos />
                    </PrivateRoute>
                }
            />
            <Route
                path="/contactos/new"
                element={
                    <PrivateRoute>
                        <NuevoContacto />
                    </PrivateRoute>
                }
            />
            <Route
                path="/contactos/:id"
                element={
                    <PrivateRoute>
                        <ContactoDetail />
                    </PrivateRoute>
                }
            />
            <Route
                path="/tareas"
                element={
                    <PrivateRoute>
                        <Tareas />
                    </PrivateRoute>
                }
            />
            <Route
                path="/tareas/new"
                element={
                    <PrivateRoute>
                        <NuevaTareaPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/tareas/:id"
                element={
                    <PrivateRoute>
                        <TareaDetail />
                    </PrivateRoute>
                }
            />
            <Route
                path="/calendario"
                element={
                    <PrivateRoute>
                        <Calendario />
                    </PrivateRoute>
                }
            />
            <Route
                path="/eventos"
                element={
                    <PrivateRoute>
                        <Eventos />
                    </PrivateRoute>
                }
            />
            <Route
                path="/eventos/new"
                element={
                    <PrivateRoute>
                        <NuevoEvento />
                    </PrivateRoute>
                }
            />
            <Route
                path="/eventos/:id"
                element={
                    <PrivateRoute>
                        <EventoDetail />
                    </PrivateRoute>
                }
            />
            <Route
                path="/eventos/:id/edit"
                element={
                    <PrivateRoute>
                        <EditarEvento />
                    </PrivateRoute>
                }
            />
            <Route
                path="/configuracion"
                element={
                    <PrivateRoute>
                        <Configuracion />
                    </PrivateRoute>
                }
            />

            {/* Si ninguna ruta coincide, redirigir a /404 */}
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    )
}
