import { AlertCard } from "@/components/alert-card";
import InterviewCard from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router"
import { toast } from "sonner";
import { useInterview } from "@/hooks/useInterview";
import { Loader } from "lucide-react";


export const InterviewLoadPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { interview, loading, error} = useInterview(id);

    if(!id ) {
        toast("Interview not found");
        navigate("/generate");
    }

    if(loading) return (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      )

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

    console.log("interview: ", interview?.position)
  return (
    <div className="flex flex-col w-full gap-8">
        <Link to={'/generate'}>
          <Button className="underline" variant={'link'}>Go to dashboard</Button>
        </Link>
        <div>
        <div className="w-full flex mb-4">
          <AlertCard  
          title={"Importance Information"} 
          descriptions={
            ['Note:Your video is never recorded. You can disable your webcam at anytime.']
            } 
          />
        </div>
          <div className="flex items-center justify-between w-full gap-2">
            <InterviewCard interview={interview} variant={"full"} />
          </div>
        </div>

        <div className="flex items-start justify-center h-[45vh]">
          <Link to={`start`}>
            <Button variant={"default"}>Start Interview</Button>
          </Link>
        </div>
    </div>
  )
}
