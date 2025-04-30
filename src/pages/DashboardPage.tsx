import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { useUser } from "@clerk/clerk-react"
import { Separator } from "@radix-ui/react-separator"
import { Plus } from "lucide-react"
import { Link } from "react-router"
import { Container } from "@/components/Container"
import InterviewCard from "@/components/interview-card"
import { Loader } from "@/components/Loader"
import { useInterviewData } from "@/context/InterviewDataContext"

export const DashboardPage = () => {
  const user = useUser();

  const {interviews, loading} = useInterviewData()
  return (
    <>
      <div className="w-full flex items-center justify-between">

        {/* headings */}
        <Heading title={`Welcome, ${user?.user?.firstName}`} description={"Create and start your mock interview with AI"} />

        {/* content */}
        <Link to={"create"}>
          <Button size={"sm"} >
            <Plus /> Add New
          </Button>
        </Link> 
      </div>

      <Separator className="my-10" />

      { loading 
        ? ( 
          <Container >
            <div className="w-full flex flex-col flex-1 justify-center items-center">
              < Loader />
            </div>
          </Container>
        )
        : (interviews.length > 0) 
          ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            interviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} variant={"default"} />
            ))
          }
         </div>
          : <div className="flex flex-col gap-4 items-center justify-center h-20">
              <h3 className="font-semibold text-2xl">No interviews</h3>
              <Link to={"create"}>
                <Button size={"sm"} >
                  <Plus /> Add New
                </Button>
            </Link> 
          </div>
      }
    </>
  )
}
