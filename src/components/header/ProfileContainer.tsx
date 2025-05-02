import { useAuth, UserButton } from "@clerk/clerk-react"
import { Button } from "../ui/button"
import { Link } from "react-router"

export const ProfileContainer = () => {
    const {isSignedIn,} = useAuth();

    return (
        <div className="flex items-center">
            {
                isSignedIn
                    ? <UserButton  afterSignOutUrl="/" />
                    : <Link to={"/signin"}><Button variant={"outline"}>Sign In</Button></Link>   
            }
        </div>
    )
}
