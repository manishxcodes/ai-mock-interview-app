import { Footer } from "@/components/Footer"
import Header from "@/components/header/Header"
import { AuthHandler } from "@/handler/AuthHandler"
import { Outlet } from "react-router"

const PublicLayout = () => {
  return (
    <div className="bg-white dark:bg-black">
        {/* handler to store the user data */}
        <AuthHandler />

        <Header />

        <Outlet />

        <Footer />
    </div>
  )
}

export default PublicLayout