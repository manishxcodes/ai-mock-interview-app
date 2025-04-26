import { Container } from "@/components/Container";
import { useParams } from "react-router"
import { InterviewForm } from "@/components/interview-form";
import { useInterview } from "@/hooks/useInterview";

export const CreatePage = () => {
  const { id } = useParams<{id: string}>();
  const { interview}  = useInterview(id);

  console.log(interview);

  return (
    <Container>

      <div className="my-4 flex-col w-full">
        <InterviewForm initialData={interview} />
      </div>
    </Container>
  )
}
