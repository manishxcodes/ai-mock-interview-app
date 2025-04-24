import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"

export const useInterview = (id: string | undefined) => {
    const [interview, setInterview] = useState<Interview | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchInterview = async() => {
            if(!id) return null;

            setLoading(true);
            try {
                const interviewDoc = await getDoc(doc(db, "interviews", id));
                if(interviewDoc.exists()) {
                    setInterview({
                        id: interviewDoc.id,
                        ...interviewDoc.data()
                    } as Interview)
                }
            } catch(err) {
                setError(err as Error);
                console.log("Error while fetching interview: ",{details: err})
            } finally {
                setLoading(false);
            }
        }

        fetchInterview();
    }, [id])

    return { interview, loading, error};
}