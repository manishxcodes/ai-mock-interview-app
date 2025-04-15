import { Loader } from "@/components/Loader";
import { useAuth } from "@clerk/clerk-react"
import { useNavigate } from "react-router";


export const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
    const {isLoaded, isSignedIn} = useAuth();
    const navigate = useNavigate()
    
    // check if children is loaded
    if(!isLoaded) return <Loader />

    // check if user is signed-in
    if(!isSignedIn) navigate('/signin');

    return children;
}