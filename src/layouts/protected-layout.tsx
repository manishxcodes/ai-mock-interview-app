
import { useAuth } from "@clerk/clerk-react"
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
    const {isSignedIn} = useAuth();
    const navigate = useNavigate();
    const firebaseAuth = getAuth();

    // check if user is signed-in
    if(!isSignedIn) navigate('/signin');

    // signin with firebase
    useEffect(() => {
        const firebaseSignin = async () => {
            const firebaseToken = localStorage.getItem("firebaseToken")!;

            const credentials = await signInWithCustomToken(firebaseAuth, firebaseToken);
            console.log("Firebase credentials:", credentials.user.uid);
        }
        firebaseSignin();
    }, [])

    return children;
}