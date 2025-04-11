"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type CalendarEvent, getEventColor } from "@/lib/calendarUtils"
import { Calendar, CheckSquare, MessageCircle, FileText, User, Building2, Clock } from "lucide-react"

interface CalendarEventCardProps {
    event: CalendarEvent
    onClick?: (event: CalendarEvent) => void
}

export function CalendarEventCard({ event, onClick }: CalendarEventCardProps) {
    const getIcon = () => {
        switch (event.type) {
            case "evento":
                return <Calendar className="h-4 w-4" />
            case "tarea":
                return <CheckSquare className="h-4 w-4" />
            case "seguimiento":
                return <MessageCircle className="h-4 w-4" />
            case "nota":
                return <FileText className="h-4 w-4" />
            default:
                return <Calendar className="h-4 w-4" />
        }
    }

    const getTypeText = () => {
        switch (event.type) {
            case "evento":
                return "Evento"
            case "tarea":
                return "Tarea"
            case "seguimiento":
                return "Seguimiento"
            case "nota":
                return "Nota"
            default:
                return event.type
        }
    }

    return (
        <Card className="mb-2 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onClick && onClick(event)}>
            <CardContent className="p-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${getEventColor(event.type)} text-white`}>
                                <span className="flex items-center gap-1">
                                    {getIcon()}
                                    <span>{getTypeText()}</span>
                                </span>
                            </Badge>
                            {event.estado && (
                                <Badge variant="outline" className="text-xs capitalize">
                                    {event.estado.replace("_", " ")}
                                </Badge>
                            )}
                        </div>
                        <h3 className="font-medium text-sm">{event.title}</h3>
                        {event.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{event.description}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(event.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    {event.clienteName && (
                        <div className="flex items-center">
                            <Building2 className="h-3 w-3 mr-1" />
                            {event.clienteName}
                        </div>
                    )}
                    {event.usuarioName && (
                        <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {event.usuarioName}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
