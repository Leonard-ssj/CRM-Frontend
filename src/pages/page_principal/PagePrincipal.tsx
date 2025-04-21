"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "next-themes"
import { User, ChevronLeft, ChevronRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export default function LandingPage() {
    const { theme, setTheme } = useTheme()
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            id: 1,
            image: "/placeholder.svg?height=500&width=800",
            title: "Gestión de Clientes Simplificada",
            description: "Administre sus clientes de manera eficiente con nuestra interfaz intuitiva",
        },
        {
            id: 2,
            image: "/placeholder.svg?height=500&width=800",
            title: "Análisis de Datos en Tiempo Real",
            description: "Obtenga insights valiosos con nuestros paneles de análisis avanzados",
        },
        {
            id: 3,
            image: "/placeholder.svg?height=500&width=800",
            title: "Automatización de Procesos",
            description: "Optimice sus flujos de trabajo con nuestras herramientas de automatización",
        },
    ]

    const companies = [
        { name: "IBM", logo: "/placeholder.svg?height=80&width=120" },
        { name: "Oracle", logo: "/placeholder.svg?height=80&width=120" },
        { name: "Cisco", logo: "/placeholder.svg?height=80&width=120" },
        { name: "Nessus", logo: "/placeholder.svg?height=80&width=120" },
        { name: "HP", logo: "/placeholder.svg?height=80&width=120" },
        { name: "Lenovo", logo: "/placeholder.svg?height=80&width=120" },
        { name: "Motorola", logo: "/placeholder.svg?height=80&width=120" },
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold mr-10">CRM System</h1>
                        <nav className="hidden md:flex space-x-6">
                            <Link to="#mision" className="hover:text-primary transition-colors">
                                Misión
                            </Link>
                            <Link to="#vision" className="hover:text-primary transition-colors">
                                Visión
                            </Link>
                            <Link to="#nosotros" className="hover:text-primary transition-colors">
                                Nosotros
                            </Link>
                            <Link to="#empresas" className="hover:text-primary transition-colors">
                                Empresas
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <Link to="/auth/login">
                            <Button className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {/* Hero Section with Carousel */}
                <section className="relative bg-muted py-16">
                    <div className="container mx-auto px-4">
                        <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <div className="relative h-[500px] w-full overflow-hidden">
                                <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: 1 }}>
                                    <div className="relative h-full w-full">
                                        <img
                                            src={slides[currentSlide].image || "/placeholder.svg"}
                                            alt={slides[currentSlide].title}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
                                            <h2 className="text-3xl md:text-4xl font-bold mb-2">{slides[currentSlide].title}</h2>
                                            <p className="text-lg md:text-xl">{slides[currentSlide].description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                                aria-label="Anterior"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                                aria-label="Siguiente"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
                                        aria-label={`Ir a diapositiva ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section id="mision" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Nuestra Misión</h2>
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-lg">
                                Nuestra misión es proporcionar soluciones CRM innovadoras y accesibles que permitan a las empresas de
                                todos los tamaños optimizar sus relaciones con los clientes, aumentar la eficiencia operativa y
                                potenciar su crecimiento a través de la tecnología.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vision Section */}
                <section id="vision" className="py-16 bg-muted">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Nuestra Visión</h2>
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-lg">
                                Aspiramos a ser líderes globales en soluciones CRM, reconocidos por nuestra innovación constante,
                                excelencia en el servicio al cliente y por crear tecnología que transforme positivamente la manera en
                                que las empresas gestionan sus relaciones comerciales.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About Us Section */}
                <section id="nosotros" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Nosotros</h2>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-lg mb-4">
                                    Somos un equipo de profesionales apasionados por la tecnología y la innovación. Desde nuestra
                                    fundación, nos hemos dedicado a desarrollar soluciones CRM que realmente respondan a las necesidades
                                    de nuestros clientes.
                                </p>
                                <p className="text-lg">
                                    Nuestro enfoque se basa en la simplicidad, la eficiencia y la adaptabilidad. Creemos que la tecnología
                                    debe ser una herramienta que facilite el trabajo, no que lo complique.
                                </p>
                            </div>
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <img src="/placeholder.svg?height=400&width=600" alt="Nuestro equipo" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Companies Section */}
                <section id="empresas" className="py-16 bg-muted">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Empresas que Confían en Nosotros</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
                            {companies.map((company, index) => (
                                <Card key={index} className="p-4 w-full max-w-[150px] flex items-center justify-center">
                                    <div className="text-center">
                                        <img src={company.logo || "/placeholder.svg"} alt={company.name} className="h-12 mx-auto mb-2" />
                                        <p className="font-medium">{company.name}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-primary text-primary-foreground py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
                            <p className="mb-2">Email: info@crmsystem.com</p>
                            <p className="mb-2">Teléfono: +1 (555) 123-4567</p>
                            <div className="mt-4">
                                <a
                                    href="https://wa.me/15551234567"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Ubicación</h3>
                            <p className="mb-2">Av. Tecnológica 123</p>
                            <p className="mb-2">Ciudad Innovación, CP 12345</p>
                            <p>México</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="#mision" className="hover:underline">
                                        Misión
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#vision" className="hover:underline">
                                        Visión
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#nosotros" className="hover:underline">
                                        Nosotros
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#empresas" className="hover:underline">
                                        Empresas
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/auth/login" className="hover:underline">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
                        <p>&copy; {new Date().getFullYear()} CRM System. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}