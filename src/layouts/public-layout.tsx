import Footer from "@/components/Footer"
import Header from "@/components/header/Header"
import { Outlet } from "react-router"

const PublicLayout = () => {
  return (
    <div>
        {/* handler to store the user data */}
        <Header />

        <Outlet />

        <Footer />
    </div>
  )
}

export default PublicLayout