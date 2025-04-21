"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "next-themes"
import {
    User,
    ChevronLeft,
    ChevronRight,
    Phone,
    Check,
    BarChart3,
    Users,
    Calendar,
    MessageSquare,
    PieChart,
    Clock,
    Star,
    ArrowRight,
    Mail,
    PlayCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Galary from "@/img/Muestra1.png"
import Galary2 from "@/img/Muestra2.png"
import Galary3 from "@/img/Muestra3.png"
import empre1 from "@/img/IBM.jpg"
import empre2 from "@/img/ORACLE.jpeg"
import empre3 from "@/img/CISCO.png"
import empre4 from "@/img/Nesus.png"
import empre5 from "@/img/HP.jpeg"
import empre6 from "@/img/lenovo.jpeg"
import empre7 from "@/img/MOTOROLA.jpg"
import equipo from "@/img/Equipo.jpg"

export default function LandingPage() {
    const { theme, setTheme } = useTheme()
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            id: 1,
            image: Galary,
            title: "Gestión de Clientes Simplificada",
            description: "Administre sus clientes de manera eficiente con nuestra interfaz intuitiva",
        },
        {
            id: 2,
            image: Galary2,
            title: "Análisis de Datos en Tiempo Real",
            description: "Obtenga insights valiosos con nuestros paneles de análisis avanzados",
        },
        {
            id: 3,
            image: Galary3,
            title: "Automatización de Procesos",
            description: "Optimice sus flujos de trabajo con nuestras herramientas de automatización",
        },
    ]

    const companies = [
        { name: "IBM", logo: empre1 },
        { name: "Oracle", logo: empre2 },
        { name: "Cisco", logo: empre3 },
        { name: "Nessus", logo: empre4 },
        { name: "HP", logo: empre5 },
        { name: "Lenovo", logo: empre6 },
        { name: "Motorola", logo: empre7 },
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    // Nuevos datos para las secciones adicionales
    const features = [
        {
            icon: <Users className="h-10 w-10 text-primary" />,
            title: "Gestión de Contactos 360°",
            description:
                "Centralice toda la información de sus clientes en un solo lugar. Historial completo, interacciones, preferencias y más.",
        },
        {
            icon: <Calendar className="h-10 w-10 text-primary" />,
            title: "Seguimiento de Oportunidades",
            description:
                "Monitoree todo el ciclo de ventas desde el primer contacto hasta el cierre, con alertas y recordatorios automáticos.",
        },
        {
            icon: <MessageSquare className="h-10 w-10 text-primary" />,
            title: "Comunicación Integrada",
            description:
                "Emails, llamadas y mensajes sincronizados en la ficha de cada cliente para no perder ninguna interacción.",
        },
        {
            icon: <PieChart className="h-10 w-10 text-primary" />,
            title: "Reportes Personalizados",
            description: "Cree informes a medida para analizar rendimiento, conversiones y oportunidades de mejora.",
        },
        {
            icon: <BarChart3 className="h-10 w-10 text-primary" />,
            title: "Análisis Predictivo",
            description: "Anticipe las necesidades de sus clientes con nuestro sistema de análisis basado en IA.",
        },
        {
            icon: <Clock className="h-10 w-10 text-primary" />,
            title: "Automatización de Tareas",
            description:
                "Reduzca el trabajo manual con flujos de trabajo automatizados para seguimientos, asignaciones y más.",
        },
    ]

    const plans = [
        {
            name: "Básico",
            price: "$499",
            period: "mes",
            description: "Ideal para pequeñas empresas que inician",
            features: [
                "Hasta 1,000 contactos",
                "2 usuarios",
                "Gestión básica de clientes",
                "Seguimiento de oportunidades",
                "Reportes estándar",
                "Soporte por email",
            ],
            cta: "Comenzar Gratis",
            popular: false,
        },
        {
            name: "Profesional",
            price: "$999",
            period: "mes",
            description: "Perfecto para empresas en crecimiento",
            features: [
                "Hasta 10,000 contactos",
                "10 usuarios",
                "Gestión avanzada de clientes",
                "Pipeline de ventas completo",
                "Automatización básica",
                "Reportes personalizados",
                "Soporte prioritario",
            ],
            cta: "Prueba 14 días gratis",
            popular: true,
        },
        {
            name: "Empresarial",
            price: "$1,999",
            period: "mes",
            description: "Solución completa para grandes empresas",
            features: [
                "Contactos ilimitados",
                "Usuarios ilimitados",
                "Gestión avanzada de clientes",
                "Automatización completa",
                "Análisis predictivo con IA",
                "Integraciones premium",
                "API completa",
                "Soporte 24/7",
            ],
            cta: "Contactar Ventas",
            popular: false,
        },
    ]

    const testimonials = [
        {
            name: "Carlos Rodríguez",
            position: "Director de Ventas, TechSolutions",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            quote:
                "Desde que implementamos el CRM A & L, nuestro ciclo de ventas se redujo en un 35% y aumentamos la tasa de conversión en un 28%. La visibilidad que tenemos ahora sobre nuestros clientes es incomparable.",
        },
        {
            name: "María González",
            position: "CEO, Marketing Digital Pro",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            quote:
                "La facilidad de uso y la potencia analítica de este CRM nos ha permitido entender mejor a nuestros clientes y anticiparnos a sus necesidades. El ROI ha sido extraordinario.",
        },
        {
            name: "Javier Méndez",
            position: "Gerente Comercial, Innovatech",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            quote:
                "Probamos varios CRM antes de encontrar CRM A & L. La diferencia está en lo intuitivo que es y en cómo realmente se adapta a nuestro proceso de ventas en lugar de forzarnos a cambiar nuestra forma de trabajar.",
        },
    ]

    const stats = [
        { value: "93%", label: "Satisfacción de clientes" },
        { value: "42%", label: "Aumento promedio en ventas" },
        { value: "67%", label: "Mejora en retención de clientes" },
        { value: "28%", label: "Reducción en ciclo de ventas" },
    ]

    const faqs = [
        {
            question: "¿Cuánto tiempo toma implementar el CRM?",
            answer:
                "La implementación básica puede completarse en 24-48 horas. Para configuraciones más complejas o migraciones de datos desde otros sistemas, nuestro equipo de implementación trabajará con usted para crear un plan personalizado que generalmente toma entre 1-3 semanas.",
        },
        {
            question: "¿Puedo migrar mis datos desde otro CRM?",
            answer:
                "Sí, ofrecemos herramientas de migración para los CRM más populares del mercado. Nuestro equipo de soporte le guiará durante todo el proceso para asegurar una transición sin problemas.",
        },
        {
            question: "¿El CRM funciona en dispositivos móviles?",
            answer:
                "Absolutamente. Contamos con aplicaciones nativas para iOS y Android, además de una interfaz web totalmente responsive que se adapta a cualquier dispositivo.",
        },
        {
            question: "¿Qué tipo de soporte ofrecen?",
            answer:
                "Dependiendo de su plan, ofrecemos soporte por email, chat en vivo y teléfono. Los planes Profesional y Empresarial incluyen un gerente de cuenta dedicado y soporte prioritario.",
        },
        {
            question: "¿Con qué sistemas se integra el CRM?",
            answer:
                "Nuestro CRM se integra con más de 100 aplicaciones populares incluyendo Gmail, Outlook, Mailchimp, Zapier, Slack, QuickBooks, y muchas más. También ofrecemos una API robusta para integraciones personalizadas.",
        },
    ]

    const integrations = [
        {
            name: "Gmail",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png",
        },
        {
            name: "Outlook",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png",
        },
        {
            name: "Slack",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png",
        },
        { name: "Zapier", logo: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg" },
        {
            name: "QuickBooks",
            logo: "https://cdn.worldvectorlogo.com/logos/quickbooks-2.svg",
        },
        {
            name: "Mailchimp",
            logo: "https://images.icon-icons.com/2407/PNG/512/mailchimp_icon_146054.png",
        },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold mr-10 font-inria-serif">CRM A & L </h1>
                        <nav className="hidden md:flex space-x-6">
                            <a href="#caracteristicas" className="hover:text-primary transition-colors">
                                Características
                            </a>
                            <a href="#precios" className="hover:text-primary transition-colors">
                                Precios
                            </a>
                            <a href="#mision" className="hover:text-primary transition-colors">
                                Misión
                            </a>
                            <a href="#vision" className="hover:text-primary transition-colors">
                                Visión
                            </a>
                            <a href="#nosotros" className="hover:text-primary transition-colors">
                                Nosotros
                            </a>
                            <a href="#empresas" className="hover:text-primary transition-colors">
                                Empresas
                            </a>
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

                                            {/* CTA en el hero */}
                                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                                <Button size="lg" className="bg-primary hover:bg-primary/90">
                                                    Solicitar Demo
                                                </Button>
                                                <Button
                                                    size="lg"
                                                    variant="outline"
                                                    className="bg-white/10 text-white border-white hover:bg-white/20"
                                                >
                                                    <PlayCircle className="mr-2 h-5 w-5" />
                                                    Ver Video
                                                </Button>
                                            </div>
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

                {/* Estadísticas destacadas */}
                <section className="py-12 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Características principales */}
                <section id="caracteristicas" className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Potencia tu Gestión de Clientes</h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                Nuestro CRM está diseñado específicamente para optimizar el seguimiento de clientes y maximizar cada
                                oportunidad de venta con herramientas intuitivas y potentes.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                Explorar todas las características
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Sección de demostración */}
                <section className="py-20 bg-muted">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Vea nuestro CRM en acción</h2>
                                <p className="text-lg mb-6">
                                    Descubra cómo nuestro CRM puede transformar su proceso de ventas y mejorar la gestión de relaciones
                                    con sus clientes. Solicite una demostración personalizada con uno de nuestros especialistas.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start">
                                        <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                                        <span>Demostración adaptada a su industria</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                                        <span>Consulta con un especialista en ventas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                                        <span>Evaluación de sus necesidades específicas</span>
                                    </li>
                                </ul>
                                <Button size="lg" className="bg-primary hover:bg-primary/90">
                                    Solicitar Demostración
                                </Button>
                            </div>
                            <div className="relative">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-xl border-8 border-background">
                                    <img src={Galary2 || "/placeholder.svg"} alt="Demo del CRM" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="bg-black/30 text-white border-white hover:bg-black/50 rounded-full w-16 h-16 p-0"
                                        >
                                            <PlayCircle className="h-10 w-10" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Planes y precios */}
                <section id="precios" className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes Adaptados a su Negocio</h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                Ofrecemos diferentes opciones para adaptarnos a las necesidades de su empresa, desde pequeños negocios
                                hasta grandes corporaciones.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {plans.map((plan, index) => (
                                <Card
                                    key={index}
                                    className={`overflow-hidden ${plan.popular ? "border-primary shadow-lg relative" : ""}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                                            Más popular
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                        <p className="text-muted-foreground mb-4">{plan.description}</p>
                                        <div className="mb-6">
                                            <span className="text-4xl font-bold">{plan.price}</span>
                                            <span className="text-muted-foreground">/{plan.period}</span>
                                        </div>
                                        <ul className="space-y-3 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start">
                                                    <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            size="lg"
                                            className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/90"}`}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-muted-foreground mb-4">¿Necesita un plan personalizado para su empresa?</p>
                            <Button variant="outline">Contactar para plan personalizado</Button>
                        </div>
                    </div>
                </section>

                {/* Testimonios */}
                <section className="py-20 bg-muted">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que Dicen Nuestros Clientes</h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                Empresas de todos los tamaños han transformado su gestión de clientes con nuestro CRM.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index} className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="mr-4">
                                            <img
                                                src={testimonial.image || "/placeholder.svg"}
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{testimonial.name}</h4>
                                            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="inline-block h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="italic">{testimonial.quote}</p>
                                </Card>
                            ))}
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
                                <img src={equipo || "/placeholder.svg"} alt="Nuestro equipo" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Integraciones */}
                <section className="py-16 bg-muted">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Integraciones Perfectas</h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                Nuestro CRM se integra con las herramientas que ya utiliza, permitiéndole centralizar toda su
                                información.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
                            {integrations.map((integration, index) => (
                                <div
                                    key={index}
                                    className="bg-background rounded-lg p-4 flex items-center justify-center h-24 shadow-sm"
                                >
                                    <img
                                        src={integration.logo || "/placeholder.svg"}
                                        alt={integration.name}
                                        className="max-h-12 max-w-full"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Button variant="outline">Ver todas las integraciones</Button>
                        </div>
                    </div>
                </section>

                {/* Preguntas frecuentes */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                Encuentre respuestas a las preguntas más comunes sobre nuestro CRM.
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                        <AccordionContent>{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
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
                                        <img
                                            src={company.logo || "/placeholder.svg"}
                                            alt={company.name}
                                            className="h-24 w-24 mx-auto mb-2 object-cover rounded-full shadow-md"
                                        />
                                        <p className="font-medium">{company.name}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA final */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comience a transformar su gestión de clientes hoy</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Únase a miles de empresas que ya han mejorado su proceso de ventas y atención al cliente con nuestro
                                CRM.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                                    Comenzar prueba gratuita
                                </Button>
                                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                                    Solicitar demostración
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Formulario de contacto */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">¿Tiene alguna pregunta?</h2>
                                <p className="text-lg mb-6">
                                    Nuestro equipo está listo para ayudarle. Complete el formulario y nos pondremos en contacto con usted
                                    a la brevedad.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <Mail className="mr-3 h-5 w-5 text-primary mt-1" />
                                        <div>
                                            <h4 className="font-medium">Email</h4>
                                            <p className="text-muted-foreground">angel&leo@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="mr-3 h-5 w-5 text-primary mt-1" />
                                        <div>
                                            <h4 className="font-medium">Teléfono</h4>
                                            <p className="text-muted-foreground">+52 (55) 3277 9157</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                                Nombre
                                            </label>
                                            <Input id="name" placeholder="Su nombre" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                                Email
                                            </label>
                                            <Input id="email" type="email" placeholder="su@email.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium mb-1">
                                            Empresa
                                        </label>
                                        <Input id="company" placeholder="Nombre de su empresa" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                                            Mensaje
                                        </label>
                                        <Textarea id="message" placeholder="¿Cómo podemos ayudarle?" rows={4} />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Enviar mensaje
                                    </Button>
                                </form>
                            </div>
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
                            <p className="mb-2">Email: angel&leo@gmail.com</p>
                            <p className="mb-2">Teléfono: +52 (55) 3277 9157</p>
                            <div className="mt-4">
                                <a
                                    href="https://wa.me/qr/6R3FJGYOHW6AD1"
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
                            <p className="mb-2">Ermita Iztapalapa 557</p>
                            <p className="mb-2">Granjas Esmeralda, Iztapalapa, 09810</p>
                            <p>México</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#caracteristicas" className="hover:text-primary transition-colors">
                                        Características
                                    </a>
                                </li>
                                <li>
                                    <a href="#precios" className="hover:text-primary transition-colors">
                                        Precios
                                    </a>
                                </li>
                                <li>
                                    <a href="#mision" className="hover:text-primary transition-colors">
                                        Misión
                                    </a>
                                </li>
                                <li>
                                    <a href="#vision" className="hover:text-primary transition-colors">
                                        Visión
                                    </a>
                                </li>
                                <li>
                                    <a href="#nosotros" className="hover:text-primary transition-colors">
                                        Nosotros
                                    </a>
                                </li>
                                <li>
                                    <a href="#empresas" className="hover:text-primary transition-colors">
                                        Empresas
                                    </a>
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
                        <p>&copy; {new Date().getFullYear()} CRM A & L. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
