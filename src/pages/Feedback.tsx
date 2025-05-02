import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { useFeedback } from "@/hooks/useFeedback";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleCheck, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";

export const Feedback = () => {
  const { userId } = useAuth();
  const {id} = useParams()

  const docId = `${userId}_${id}`;
  const { userAnswers, loading, error} = useFeedback(docId);
  const [activeFeed, setActiveFeed] = useState("");

  const overallRating = useMemo(() => {
    if(!userAnswers || !userAnswers.answers || userAnswers.answers.length === 0) return "0.0";

    const totalRating = userAnswers?.answers.reduce((acc, answer) => {
        return acc + answer.rating
      }, 0);
    
    return (totalRating/userAnswers?.answers?.length).toFixed(1);
  }, [userAnswers])

  if(error) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <Card className="p-6">
          <CardTitle>Something Went Wrong</CardTitle>
          <CardDescription className="mb-6">Please go back to dashboard</CardDescription>
          <Button className="border-primary" variant={'outline'}>Dashboard</Button>
        </Card>
      </div>
    )
  }

  if(loading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col w-full py-5">
      <Heading title={"Congratulations on completing your interview"} 
        description={'Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview.'} />
        
        <div className="flex items-center justify-between h-20">
          <p className="text-sm text-muted-foreground border border-primary px-4 py-2 rounded-md w-fit">
            Overall ratings :{" "}
            <span className="text-emerald-500 font-semibold text-sm">
              {overallRating} / 10
            </span>
          </p>
          <Link to={'/generate'}>
            <Button className="underline" variant={'link'}>Go to dashboard</Button>
          </Link>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col w-full">
          <Heading title="Interview Feedback" isSubHeading />
        </div>
        
        {
          userAnswers?.answers && (
            <Accordion type="single" collapsible className="space-y-6">
              {
                userAnswers.answers.map((ans) => (
                  <AccordionItem 
                    key={ans.question}
                    value={ans.question}
                    className="border rounded-lg shadow-md">
                      <AccordionTrigger
                        onClick={() => setActiveFeed(ans.question)}
                      className={cn(
                        "px-5 py-3 flex items-center justify-between  rounded-t-lg transition-colors hover:no-underline",
                        (activeFeed === ans.question)
                          ? "bg-gradient-to-r from-purple-50 to-blue-50"
                          : "hover:bg-gray-50"
                      )}>
                        <span>{ans.question}</span>
                      </AccordionTrigger>

                      <AccordionContent className="px-5 py-6 bg-white rounded-b-lg space-y-5 shadow-inner">
                        <div className="text-lg font-semibold to-gray-700">
                          <Star className="inline mr-2 text-yellow-400" />
                          Rating : {ans.rating}
                        </div>

                        <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
                          <CardTitle className="flex items-center text-lg">
                          <CircleCheck className="mr-2 text-green-600" />
                          Expected Answer
                          </CardTitle>

                          <CardDescription className="font-medium text-gray-700">
                          {ans.correct_answer}
                          </CardDescription>
                        </Card>
                        
                        <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
                          <CardTitle className="flex items-center text-lg">
                          <CircleCheck className="mr-2 text-green-600" />
                          Your Answer
                          </CardTitle>

                          <CardDescription className="font-medium text-gray-700">
                          {ans.user_answer}
                          </CardDescription>
                        </Card>
                        
                        <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
                          <CardTitle className="flex items-center text-lg">
                          <CircleCheck className="mr-2 text-green-600" />
                          Feedback
                          </CardTitle>

                          <CardDescription className="font-medium text-gray-700">
                          {ans.feedback}
                          </CardDescription>
                        </Card>
                      </AccordionContent>
                  </AccordionItem>
                ))
              }
            </Accordion>
          )
        }
    </div>
  )

  // return (
  //   <div>
  //     <div>
  //       {userAnswers?.answers.map((ans, index) => (
  //         <div key={ans.question} className="mt-2">
  //           <CustomAccordion 
  //             question={ans.question}
  //             userAnswer={ans.user_answer}
  //             correctAnswer={ans.correct_answer}
  //             feedback={ans.feedback}
  //             rating={ans.rating}
  //             index={index}
  //             />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // )
}
