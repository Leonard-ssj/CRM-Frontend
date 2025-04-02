import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/lib/theme"
import MainLayout from "@/components/layout/MainLayout"
import AppRoutes from "@/routes"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import NotFound from "@/pages/NotFound"
import { AuthProvider } from "@/auth/AuthContext"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* Coloca el BrowserRouter primero */}
      <BrowserRouter>
        {/* Mueve AuthProvider aquí */}
        <AuthProvider>

          <Toaster />

          <Routes>
            {/* Rutas públicas sin MainLayout */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

            {/* Rutas protegidas dentro de MainLayout */}
            <Route
              path="/*"
              element={
                <MainLayout>
                  <AppRoutes />
                </MainLayout>
              }
            />

            {/* Página 404 sin MainLayout */}
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
