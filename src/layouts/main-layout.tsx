import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Container } from "lucide-react"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div>
        {/* handler to store the user data */}
        <Header />

        <Container className="flex-grow"> 
            <main className="flex-grow">
                <Outlet />
            </main>
        </Container>

        <Footer />
    </div>
  )
}

export default MainLayout