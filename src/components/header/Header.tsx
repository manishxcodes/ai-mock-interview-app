import { cn } from "@/lib/utils"
import { Container } from "../Container"
import { Bot } from "lucide-react"
import { LogoContainer } from "./LogoContainer"
import { ProfileContainer } from "./ProfileContainer"
import { Darktheme } from "./Darktheme"


const Header =  () => {
    return (
      <nav className={cn("w-full border-b duration-150 transition-all ease-in-out")}>
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-fit">
            <LogoContainer icon={<Bot color="#f08c00" className="w-8 h-8" />} label={"AceMock"} />
          </div>

        <div className="flex items-center gap-4">
          <Darktheme />
          <ProfileContainer />
        </div>
        </Container>
      </nav>
    )
  }
  
  export default Header