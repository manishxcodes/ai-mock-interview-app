import { AlertCard } from "@/components/alert-card";
import InterviewCard from "@/components/interview-card";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useInterview } from "@/hooks/useInterview";
import { ListRestart } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router"
import { toast } from "sonner";

export const InterviewLoadPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { interview, loading, error} = useInterview(id);

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
            <Button>Go Back and retry <ListRestart /> </Button>
          </Link>
        </div>
      )
    }

    console.log("interview: ", interview?.position)
  return (
    <div className="flex flex-col w-full gap-8 py-6">
        <AlertCard  
        title={"Importance Information"} 
        descriptions={
          ['Please enable your webcam and microphone to start the mock interview. The interview consists of 8 questions. You’llreceive a personalized report based on your responses at the end.',
           'Note:Your video is never recorded. You can disable your webcam at anytime.']} 
        />
        <div className="flex items-center justify-between w-full gap-2">
          <InterviewCard interview={interview} variant={"full"} />
        </div>
    </div>
  )
}
