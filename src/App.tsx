import { ThemeProvider } from "@/lib/theme"
import MainLayout from "@/components/layout/MainLayout"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "@/routes"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
