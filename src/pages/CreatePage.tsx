import { Container } from "@/components/Container";
import { useParams } from "react-router"
import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { InterviewForm } from "@/components/interview-form";

export const CreatePage = () => {
  const { interviewId } = useParams<{interviewId: string}>();
  const [interview, setInterview] = useState<Interview | null>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      if(interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interview", interviewId));
          if(interviewDoc.exists()) {
          setInterview({...interviewDoc.data} as Interview );
        }
        } catch (error) {
          console.log("Error while getting interview", {details: error})
        }
      }
    }
    fetchInterview();
  }, [interviewId])

  return (
    <Container>

      <div className="my-4 flex-col w-full">
        <InterviewForm initialData={interview} />
      </div>
    </Container>
  )
}
