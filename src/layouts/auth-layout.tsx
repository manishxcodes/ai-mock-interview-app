import { Outlet } from "react-router"

export const AuthenticatedLayout = () => {
  return (
    <div className="w-full bg-white dark:bg-black">
        <Outlet />
    </div>
  )
}
