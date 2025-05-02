import { Loader } from "@/components/Loader";
import { QuestionForm } from "@/components/question-form";
import { Button } from "@/components/ui/button";
import { useInterview } from "@/hooks/useInterview";
import { Link, useNavigate, useParams } from "react-router"
import { toast } from "sonner";

const MockInterviewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { interview, loading, error } = useInterview(id);

    if(!id ) {
        toast("Interview not found");
        navigate("/generate");
    }

    if(loading) return <Loader />

    if(error ) {
        toast.error("Something went wrong!", {description: "Please try againg"});
        navigate("/generate");
    }

    if (!interview) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-[50vh] text-center gap-4">
          <h2 className="text-xl font-semibold">No interview data found</h2>
          <Link to={"/generate"}>
            <Button>Go Back and retry </Button>
          </Link>
        </div>
      )
    }

    console.log(interview);
    return (
        <div className="w-full">
           { interview?.questions && interview.questions.length > 0 && (
                <div>
                    <QuestionForm questions={interview?.questions} id={id!}/>
                </div>
            )
           }
        </div>
    )
}

export default MockInterviewPage;
