import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerfilForm } from "@/components/configuracion/perfil-form"
import { ActividadReciente } from "@/components/configuracion/actividad-reciente"


export default function Configuracion() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
            </div>

            <Tabs defaultValue="perfil" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="perfil">Perfil de Usuario</TabsTrigger>
                </TabsList>
                <TabsContent value="perfil">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <PerfilForm />
                        </div>
                        <div className="md:col-span-1">
                            <ActividadReciente />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

