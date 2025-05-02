import { Container } from "@/components/Container";
import { useParams } from "react-router"
import { InterviewForm } from "@/components/interview-form";
import { useInterview } from "@/hooks/useInterview";
import { AlertCard } from "@/components/alert-card";

export const CreatePage = () => {
  const { id } = useParams<{id: string}>();
  const { interview}  = useInterview(id);

  console.log(interview);

  return (
    <Container>

      {id && (
        <AlertCard  
          title={"Warning: Editing Interview Will Overwrite Answers"} 
          descriptions={
            [
              "Editing this interview will delete any previously saved answers.",
              "To preserve your original answers, consider creating a new interview instead of editing this one."
            ]
          } 
        />
      )}

      <div className="my-4 flex-col w-full">
        <InterviewForm initialData={interview} />
      </div>
    </Container>
  )
}
