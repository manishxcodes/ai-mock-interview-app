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

interface InterviewCardProps {
    interview: Interview,
    variant?: "default" | "full", // 👈 added variant prop
}

const InterviewCard = ({ interview, variant = "default" }: InterviewCardProps) => {
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

    return (
        <Card className={cn(isFull ? "w-full" : "")}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{interview.position}</CardTitle>
              <Link to="/">
                <TooltipButton icon={<Trash className="text-primary" />} label="Delete Interview" />
              </Link>
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
              <div className="flex justify-evenly items-center">
                <Link to={`create/${interview.id}`}>
                  <TooltipButton icon={<Pen />} label="Edit" />
                </Link>
                <Link to="/">
                  <TooltipButton icon={<FilePenLine />} label="Feedback" />
                </Link>
                <Link to={`interview/${interview.id}`}>
                  <TooltipButton icon={<ArrowUpRight />} label="Interview" />
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>
    )
}

export default InterviewCard
