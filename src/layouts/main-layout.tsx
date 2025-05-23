import Header from "@/components/header/Header"
import { Container } from "@/components/Container"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="bg-white dark:bg-black">
        {/* handler to store the user data */}
        <Header />

        <Container className="flex-grow"> 
            <main className="flex-grow">
                <Outlet />
            </main>
        </Container>
    </div>
  )
}

export default MainLayout