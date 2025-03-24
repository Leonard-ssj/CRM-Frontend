import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation()
    const pathnames = location.pathname.split("/").filter(Boolean)

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center justify-between border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="/">Inicio</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {pathnames.map((segment, index) => {
                                    const isLast = index === pathnames.length - 1
                                    const to = "/" + pathnames.slice(0, index + 1).join("/")
                                    return (
                                        <React.Fragment key={to}>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                {isLast ? (
                                                    <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink asChild>
                                                        <Link to={to}>{capitalize(segment)}</Link>
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                        </React.Fragment>
                                    )
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <ThemeToggle />
                </header>
                <main className="p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}
