import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "Fecha no disponible";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
  }).format(date);
}


export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "PENDIENTE":
      return "bg-yellow-500"
    case "EN_PROGRESO":
      return "bg-blue-500"
    case "COMPLETADA":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export function getSeguimientoIcon(tipo: string): string {
  switch (tipo) {
    case "llamada":
      return "phone"
    case "correo":
      return "mail"
    case "reunión":
      return "calendar"
    default:
      return "message-square"
  }
}