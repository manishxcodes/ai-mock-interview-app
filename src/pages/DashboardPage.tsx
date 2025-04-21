import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { db } from "@/config/firebase.config"
import { Interview } from "@/types"
import { useUser } from "@clerk/clerk-react"
import { Separator } from "@radix-ui/react-separator"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Loader, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Container } from "@/components/Container"
import InterviewCard from "@/components/interview-card"

export const DashboardPage = () => {
  const user = useUser();
  const userId = user?.user?.id
  
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!userId) return;

      setLoading(true);

      try {
        const interviewsRef = collection(db, "interviews");

        // Query interviews where userId matches the logged-in user
        const q = query(interviewsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        console.log("querySnapshot: ", querySnapshot.docs[0].data());

      // Process the data correctly
      const data: Interview[] = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...(doc.data() as Omit<Interview, 'id'>),
      }));

      console.log("questions: ", data);
      
      setInterviews(data);
      } catch (err) {
        console.error("Error fetching interviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [userId]);

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

      {  loading && 
        <Container >
          <div className="w-full h-96 flex justify-center items-center">
            < Loader />
          </div>
        </Container>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))
        }
      </div>
    </>
  )
}
