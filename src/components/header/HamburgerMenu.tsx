import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { NavLink } from "react-router"
import { NavLinks } from "./NavLinks"

export const HamburgerMenu = () => {
    const handleClick = () => {
        return 
    }

    return (
        <Sheet>
            <SheetTrigger className="block md:hidden">
            <button title="hamburger-menu" className="inline-flex items-center justify-items-center py-1 px-1 md:px-3 opacity-70 hover:opacity-100 cursor-pointer "
            onClick={handleClick}>
              <span className="flex items-center justify-center h-[30px] w-[40px] rounded-sm hover:bg-gray-100  dark:hover:bg-white/15 transition-opacity text-gray-600 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 -4 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
              </span>
            </button>
            </SheetTrigger>
                <SheetContent>
                    <NavLinks isMoblie={true} />
                </SheetContent>
        </Sheet>
    )
}