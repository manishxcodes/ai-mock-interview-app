import { ArrowUpRight, FilePenLine, Pen, Trash } from "lucide-react"
import { Link } from "react-router"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Interview } from "@/types"
import { Badge } from "./ui/badge"
import { TooltipButton } from "./tooltip-button"
import { deleteDoc, doc, getDoc } from "firebase/firestore"
import { db } from "@/config/firebase.config"
import { toast } from "sonner"
import { useInterviewData } from "@/context/InterviewDataContext"

interface InterviewCardProps {
    interview: Interview,
    variant?: "default" | "full", 
    interviewId?: string,
    userId?: string
}

const InterviewCard = ({ interview, variant = "default", interviewId, userId }: InterviewCardProps) => {
    const techStackArray = interview.techStack.split(",");
    const timestamp = interview.createdAt;
    const date = timestamp.toDate();
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const isFull = variant === "full";
    const {fetchInterviews} = useInterviewData();

    const onDelete = async (interviewId: string, userId: string) => {
      //console.log('yo')
      try {
        const interviewRef = await doc(db, "interviews", interviewId);
        const interviewSnap = await getDoc(interviewRef);
        const userAnswerRef = await doc(db, "userAnswers", `${userId}_${interviewId}`);
        const userAnswerSnap = await getDoc(userAnswerRef);

        // check if interview exists
        if(!interviewSnap.exists()) {
          toast.error("Document doesnot exist")
        }
        
        // if exists delete
        if(interviewSnap.exists()) {
          await deleteDoc(interviewRef);
        }
        if(userAnswerSnap.exists()) {
          await deleteDoc(userAnswerRef)
        }

        toast("Interview deleted !")
        fetchInterviews();
      } catch(err) {
        toast.error("Cannot delete", {description: "Please try again"})
      }
    }

    return (
        <Card className={cn(isFull ? "w-full" : "")}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{interview.position}</CardTitle>
                <div className={cn(isFull ? "hidden text-primary" : "text-primary")}>
                    <TooltipButton icon={
                      <Trash 
                      onClick={ () => {
                          if(interviewId && userId) {
                            onDelete(interviewId, userId);
                          }
                        }
                      }
                      size={16} className="text-primary" />
                      } label="Delete Interview" />
                </div>
            </div>
            <CardDescription className="mt-2 h-10">
              {interview.description.length > 60 
                ? interview.description.slice(0, 60) + "..."
                : interview.description}
            </CardDescription>
          </CardHeader>

          <CardContent className={cn(isFull ? "h-fit" : "h-20")}>
            {techStackArray.map((tech) => (
              <Badge
                key={tech}
                className="w-fit m-1 hover:text-primary cursor-pointer"
                variant="outline"
              >
                {tech}
              </Badge>
            ))}
          </CardContent>

          {!isFull && (
            <CardFooter className="flex justify-between items-center">
              <CardDescription>{formattedDate}</CardDescription>
              <div className="flex justify-evenly items-center gap-4">
                <Link to={`create/${interview.id}`}>
                  <TooltipButton icon={<Pen size={14} />} label="Edit" />
                </Link>
                <Link to="/">
                  <TooltipButton icon={<FilePenLine size={14} />} label="Feedback" />
                </Link>
                <Link to={`interview/${interview.id}`}>
                  <TooltipButton icon={<ArrowUpRight size={14} />} label="Interview" />
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>
    )
}

export default InterviewCard
