import { InterviewForm } from "@/components/interview-form"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { useUser } from "@clerk/clerk-react"
import { Separator } from "@radix-ui/react-separator"
import { Plus } from "lucide-react"
import { Link } from "react-router"

export const DashboardPage = () => {
  const { user } = useUser();

  return (
    <>
      <div className="w-full flex items-center justify-between">

        {/* headings */}
        <Heading title={`Welcome, ${user?.firstName}`} description={"Create and start your mock interview with AI"} />

        {/* content */}
        <Link to={":interviewId"}>
          <Button size={"sm"} >
            <Plus /> Add New
          </Button>
        </Link> 
      </div>

      
      <Separator className="my-8" />

      <InterviewForm />
    </>
  )
}
