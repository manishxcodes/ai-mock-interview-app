import { Loader } from "@/components/Loader";
import { db } from "@/config/firebase.config";
import { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuth, signInWithCustomToken } from "firebase/auth"
import axios from 'axios'

export const AuthHandler = () => {
    const { isSignedIn, getToken } = useAuth();
    const firebaseAuth = getAuth();
    const { user } = useUser();


    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [token, setToken] = useState<String | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async() => {
            if(isSignedIn) {
                const token = await getToken();
                setToken(token);
            }
        }
    }, [isSignedIn])

    console.log("token: ", token);
    console.log("user: ", user);

    useEffect(() => {
        (async () => {
            if(!firebaseAuth.currentUser) {
                (async function FirebaeSignIn() {
                    const response = await axios.post("https://clerk-firebase-auth.prasadmanish467.workers.dev/firebase-token", {clerkUserId: user?.id}, {
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    });
                    const customFirebaseToken = response.data;
            
                    await signInWithCustomToken(firebaseAuth, customFirebaseToken);
                })();
            }
        })
    }, [firebaseAuth, user, token])
    


    useEffect(() => {
        console.log("inside")
        const storeUserData = async() => {
            console.log("isnide 1")
            if(isSignedIn && user) {
                setLoading(true);
                try {
                    // get userdata from db
                    const userSnap = await getDoc(doc(db, "users", user.id));

                    // if user doesnot exist create new user
                    if(!userSnap.exists()) {
                        const userData: User = {
                            id: user.id,
                            name: user.fullName || user.firstName || "Anynomous",
                            email: user.primaryEmailAddress?.emailAddress || "N/A",
                            imageUrl: user.imageUrl,
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp()
                        }
                        const response = await setDoc(doc(db, "users", user.id), userData);
                        console.log(response);
                    }
                } catch(err) {
                    console.log("Error on storing the user data: ", err);
                } finally {
                    setLoading(false);
                }
            }
        }
        storeUserData();
    }, [isSignedIn, user, pathname, navigate]);

    if(loading) return <Loader />

    return null;
}
