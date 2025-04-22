import { ArrowUpRight, FilePenLine, Pen, Trash } from "lucide-react"
import { Link } from "react-router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

interface InterviewCardProps {
    interview: Interview
}


const InterviewCard = ({  interview}: InterviewCardProps) => {
    const techStackArray = interview.techStack.split(",");
    console.log(techStackArray)
    const timestamp = interview.createdAt;

    // Convert to JavaScript Date object
    const date = timestamp.toDate();

    // Format the date for display
    const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    });
    return (
        <Card className={cn("", )} >
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>{interview.position}</CardTitle>
                <Link to={'/'} >
                    <TooltipButton icon={<Trash className="text-primary" />} label={"Delete Interview"} />
                </Link>
            </div>
            <CardDescription className="mt-2 h-10">{
                interview.description.length > 60 
                    ? interview.description.slice(0, 60) + "..."
                    : interview.description
            }</CardDescription>
          </CardHeader>
            <CardContent className="h-20">
            {
                techStackArray.map((tech) => (
                    <Badge className="w-fit m-1 hover:text-primary" key={tech} variant="outline">
                        {tech}
                    </Badge>
                ))
            }
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <CardDescription >{formattedDate}</CardDescription>
                <div className="flex justify-evenly items-center ">
                    <Link to={`create/${interview.id}`}>
                        <TooltipButton icon={<Pen />} label={"Edit"} />
                    </Link>
                    <Link to={'/'}>
                        <TooltipButton icon={<FilePenLine />} label={"Feedback"} />
                    </Link>
                    <Link to={`interview/${interview.id}`}>
                        <TooltipButton icon={<ArrowUpRight />} label={"Interivew"} />
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

export default InterviewCard