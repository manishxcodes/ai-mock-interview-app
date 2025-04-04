import { Outlet } from "react-router"

export const AuthenticatedLayout = () => {
  return (
    <div className="w-full">
        <Outlet />
    </div>
  )
}
