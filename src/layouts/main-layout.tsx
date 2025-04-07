import Footer from "@/components/Footer"
import Header from "@/components/header/Header"
import { Container } from "@/components/Container"
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