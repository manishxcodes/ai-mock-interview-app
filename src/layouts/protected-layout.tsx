import { Loader } from "@/components/Loader";
import { useAuth } from "@clerk/clerk-react"
import { Navigate } from "react-router";

export const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
    const {isLoaded, isSignedIn} = useAuth();
    
    // check if children is loaded
    if(!isLoaded) return <Loader />

    // check if user is signed-in
    if(!isSignedIn) <Navigate to={"/signin"} replace/>

    return children;
}