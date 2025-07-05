import { db } from "@/config/firebase.config";
import { UserAnswers } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useFeedback (docID: string) {
    const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedback = async (docID: string) => {
            if(!docID) return null;

            try {
                const docRef = doc(db, 'userAnswers', docID);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists()) {
                    setUserAnswers(docSnap.data() as UserAnswers);
                }
            } catch(err) {
                //console.log("Error while fetching userAnswer", {details: err});
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        } 

        fetchFeedback(docID);
    }, [docID])

    return { userAnswers, loading, error};
}