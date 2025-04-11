import { cn } from "@/lib/utils"
import { useAuth, useUser } from "@clerk/clerk-react"
import { Container } from "../Container"
import { Bot } from "lucide-react"
import { LogoContainer } from "./LogoContainer"
import { useState } from "react"
import { ProfileContainer } from "./ProfileContainer"
import { Darktheme } from "./Darktheme"


const Header =  () => {
  const { userId  } = useAuth();
  const [isVisible, setIsVisible] = useState(false)

    return (
      <nav className={cn("w-full border-b duration-150 transition-all ease-in-out")}>
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-fit">
            <LogoContainer icon={<Bot color="#f08c00" className="w-8 h-8" />} label={"AceMock"} />
          </div>
           
          {/* navlinks */}
          {/* <div className={cn("hidden md:flex items-center gap-3")}>
            <NavLinks />
          </div> */}

          
        {/* cta */}
        <div className="flex items-center gap-4">
          <Darktheme />
          <ProfileContainer />
          {/* <HamburgerMenu /> */}
        </div>
        </Container>
      </nav>
    )
  }
  
  export default Header