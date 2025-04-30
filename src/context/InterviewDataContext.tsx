import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface InterviewDataContextProps {
    interviews: Interview[];
    loading: boolean;
    fetchInterviews: () => void;
}

const InterviewDataContext = React.createContext<InterviewDataContextProps | undefined>(undefined);

export const InterviewDataProvider = ({children}: {children: ReactNode}) => {
    const { userId } = useAuth();

    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInterviews = async () => {
        if(!userId) return;
        console.log("context used")
        try {
            const interviewRef = collection(db, "interviews");
            const q = query(interviewRef, where("userId", "==", userId ));
            const querySnapshot = await getDocs(q);

            const data: Interview[] = querySnapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...(doc.data() as Omit<Interview, 'id'>),
                }
            ))

            setInterviews(data);
        } catch (err) {
            console.log("error while fetching interview: ", {details: err})
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(userId && interviews.length === 0) fetchInterviews();
    }, [userId]);

    return (
        <InterviewDataContext.Provider value={{interviews, loading,  fetchInterviews}}>
            {children}
        </InterviewDataContext.Provider>
    )

}

export function useInterviewData() {
    const ctx = useContext(InterviewDataContext);
    if(!ctx) throw new Error ("UseInterviewData must be used inside InterviewDataProvider")
    return ctx;
}