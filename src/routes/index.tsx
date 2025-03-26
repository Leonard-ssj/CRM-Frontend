import { Routes, Route } from "react-router-dom"

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

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Nuevas rutas de clientes */}
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/new" element={<NuevoCliente />} />
            <Route path="/clientes/:id" element={<ClienteDetail />} />

            {/* Nuevas rutas de contactos */}
            <Route path="/contactos" element={<Contactos />} />
            <Route path="/contactos/new" element={<NuevoContacto />} />
            <Route path="/contactos/:id" element={<ContactoDetail />} />

            {/* Nuevas rutas de tareas */}
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/tareas/new" element={<NuevaTareaPage />} />
            <Route path="/tareas/:id" element={<TareaDetail />} />

            {/* Nuevas rutas de calendario */}
            <Route path="/calendario" element={<Calendario />} />

            {/* Nuevas rutas de eventos */}
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos/new" element={<NuevoEvento />} />
            <Route path="/eventos/:id" element={<EventoDetail />} />
            <Route path="/eventos/:id/edit" element={<EditarEvento />} />
            
            {/* Nuevas rutas de confiracion */}
            <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
    )
}
