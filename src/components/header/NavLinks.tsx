import { navlinks } from "@/lib/helpers"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router"

interface NavLinksProps {
    isMoblie?: boolean
    className?: string
}

export const NavLinks = ({ isMoblie = false, className}: NavLinksProps) => {
  return (
        <ul className={cn("flex items-center gap-6", isMoblie && "items-start flex-col gap-4 px-8 py-4")}>
            {
                navlinks.map(link => (
                    <NavLink key={link.href} to={link.href} className={({isActive}) => cn("text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-50", isActive && "text-neutral-900 font-semibold dark:text-neutral-300 dark:hover:text-neutral-50")}>
                        {link.label}
                    </NavLink>
                ))
            }
        </ul>
  )
}
