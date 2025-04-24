import { Loader } from "@/components/Loader";
import { db } from "@/config/firebase.config";
import { useInterview } from "@/hooks/useInterview";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner";

export const InterviewPage = () => {
    const { id } = useParams();
    // const [interview, setInterview] = useState<Interview | null>(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);
    const navigate = useNavigate();

    const { interview, loading, error} = useInterview(id);

    if(!id ) {
        toast("Interview not found");
        navigate("/generate");
    }
    
    if(error ) {
        toast.error("Something went wrong!", {description: "Please try againg"});
        navigate("/generate");
    }

    // useEffect(() => {
    //     const fetchInterview = async () => {
    //         if(id) {
    //             try {
    //                 setIsLoading(true);
    //                 const interviewDoc = await getDoc(doc(db, "interviews", id));
    //                 console.log("interviewdoc: ", interviewDoc);
    //                 if(interviewDoc.exists()) {
    //                     setInterview({
    //                         id: interviewDoc.id,
    //                         ...interviewDoc.data()} as Interview);
    //                 }
    //             } catch(error) {
    //                 console.log("error while getting interview", {details: error})
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         }
    //     }
    //     fetchInterview();
    // }, [id]);

    if(loading) return <Loader />

    console.log("interview: ", interview?.position)
  return (
    <div>{interview?.position}</div>
  )
}
