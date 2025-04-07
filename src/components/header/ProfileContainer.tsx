import { useAuth, UserButton } from "@clerk/clerk-react"
import { Loader } from "../Loader"
import { Button } from "../ui/button"
import { Link } from "react-router"

export const ProfileContainer = () => {
    const {isSignedIn, isLoaded} = useAuth();

    // if(!isLoaded) {
    //     return (
    //         <div className="flex items-center">
    //             <Loader className="min-w-4 miin-h-4 animate-spin " />
    //         </div>
    //     )
    // }

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
