import { Loader } from "@/components/Loader";
import { customFirebaseTokenLink, db } from "@/config/firebase.config";
import { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import axios from 'axios';
import { useNavigate } from "react-router";

export const AuthHandler = () => {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const firebaseAuth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuthFlow = async () => {
      try {
        if (!isSignedIn || !user)  return;

        // 1. Get Clerk JWT token
        const token = await getToken();
        if (!token) return;

        // 2. Get custom Firebase token
        const { data } = await axios.post(
          `${customFirebaseTokenLink}`,
          { clerkUserId: user.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const firebaseToken = data.firebaseToken;
        localStorage.setItem("firebaseToken", firebaseToken);

        // 3. Sign in with Firebase custom token
           await signInWithCustomToken(firebaseAuth, firebaseToken);
          //console.log("Firebase credentials:", credentials.user.uid);

        // 4. Check/create user in Firestore
        const userDocRef = doc(db, "users", user.id);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          const userData: User = {
            id: user.id,
            name: user.fullName || user.firstName || "Anonymous",
            email: user.primaryEmailAddress?.emailAddress || "N/A",
            imageUrl: user.imageUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          await setDoc(userDocRef, userData);
          //console.log("User created in Firestore.");
        } else {
          //console.log("User already exists in Firestore.");
        }

        // navigate to dashboard
        navigate('/generate');  

      } catch (err) {
        //console.error("Error during auth handling:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuthFlow();
  }, [isSignedIn, user]);

  if (loading) return <Loader />;
  return null;
};
