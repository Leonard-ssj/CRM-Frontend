import { Routes, Route } from "react-router-dom"

import Dashboard from "@/pages/Dashboard"
import Clientes from "@/pages/Clientes"
import Contactos from "@/pages/Contactos"
import Tareas from "@/pages/Tareas"
import NuevoCliente from "@/pages/NuevoCliente"
import ClienteDetail from "@/pages/ClienteDetail"
import NuevoContacto from "@/pages/NuevoContacto"
import ContactoDetail from "@/pages/ContactoDetail"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/new" element={<NuevoCliente />} />
            <Route path="/clientes/:id" element={<ClienteDetail />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="/contactos/new" element={<NuevoContacto />} />
            <Route path="/contactos/:id" element={<ContactoDetail />} />
            <Route path="/tareas" element={<Tareas />} />
        </Routes>
    )
}
