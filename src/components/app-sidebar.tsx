import * as React from "react"
import { GalleryVerticalEnd, LayoutDashboard, Users, ClipboardList, Calendar, Settings, Contact2, CalendarClock, LogOut } from 'lucide-react'
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Clientes",
      url: "/clientes",
      icon: Users,
    },
    {
      title: "Contactos",
      url: "/contactos",
      icon: Contact2,
    },
    {
      title: "Eventos",
      url: "/eventos",
      icon: CalendarClock,
    },    
    {
      title: "Tareas",
      url: "/tareas",
      icon: ClipboardList,
    },
    {
      title: "Calendario",
      url: "/calendario",
      icon: Calendar,
    },
    {
      title: "Configuración",
      url: "/configuracion",
      icon: Settings,
    },
  ],
}

// Datos de usuario simulados - reemplaza esto con tu lógica de autenticación
const currentUser = {
  nombre: "Admin Usuario",
  email: "admin@ejemplo.com",
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  const handleLogout = () => {
    // Implementa aquí tu lógica de cierre de sesión
    console.log("Cerrando sesión...")
    // Por ejemplo: auth.signOut() o similar
  }

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">CRM</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.url}
                >
                  <Link to={item.url} className="flex items-center gap-3 font-medium my-0.5">
                    <item.icon className="h-4 w-4" />
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Añadir el SidebarFooter con la información del usuario */}
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(currentUser.nombre)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{currentUser.nombre}</span>
            <span className="text-xs text-muted-foreground">{currentUser.email}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}