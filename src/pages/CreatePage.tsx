import { Container } from "@/components/Container";
import { useParams } from "react-router"
import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { InterviewForm } from "@/components/interview-form";
import { useInterview } from "@/hooks/useInterview";

export const CreatePage = () => {
  const { id } = useParams<{id: string}>();
  const { interview}  = useInterview(id);

  // const [interview, setInterview] = useState<Interview | null>(null);

  // useEffect(() => {
  //   const fetchInterview = async () => {
  //     if(id) {
  //       try {
  //         const interviewDoc = await getDoc(doc(db, "interviews", id));
  //         if(interviewDoc.exists()) {
  //         setInterview({id: interviewDoc.id, ...interviewDoc.data()} as Interview );
  //       }
  //       } catch (error) {
  //         console.log("Error while getting interview", {details: error})
  //       }
  //     }
  //   }
  //   fetchInterview();
  // }, [id])

  console.log(interview);

  return (
    <Container>

      <div className="my-4 flex-col w-full">
        <InterviewForm initialData={interview} />
      </div>
    </Container>
  )
}
