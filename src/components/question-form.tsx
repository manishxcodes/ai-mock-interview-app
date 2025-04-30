import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipButton } from "./tooltip-button";
import { ArrowUpRight, Volume1, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { RecordAnswer } from "./record-answer";
import { DialogBox } from "./dialog";

interface QuestionFormProps {
    questions: { question: string, answer: string }[]
    id: string
}

export const QuestionForm = ({questions, id}: QuestionFormProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null >(null);

    // for playing quetion audio
    const handlePlalyQuestion = (question: string) => {
      if(isPlaying && currentSpeech) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentSpeech(null); 
      } else {
        if("speechSynthesis" in window) {
          const speech = new SpeechSynthesisUtterance(question);
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(speech);
          setIsPlaying(true);
          setCurrentSpeech(speech);

          speech.onend = () => {
            setIsPlaying(false);
            setCurrentSpeech(null);
          }
        }
      }
    }

    return (
      <>
      <div className="w-full min-h-96 border rounded p-4">
        <Tabs defaultValue={questions[0].question} className="w-full ">
          <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none overflow-x-auto no-scrollbar">
              {questions.map((tab, index) => (
              <TabsTrigger
                  key={tab.question}
                  value={tab.question}
                  className="data-[state=active]:bg-orange-500 data-[state=active]:dark:border-orange-400 data-[state=active]:text-secondary-foreground"
              >
                  <code className=" text-[13px]">Question {index + 1}</code>
              </TabsTrigger>
              ))}
          </TabsList>
          {questions.map((tab) => (
            
            <TabsContent className="w-full" key={tab.question} value={tab.question}>
              <div className="flex">
                {/* speaker button for question */}
                <div className=" flex items-center">
                  <Button className="px-[-12]" variant={"ghost"}
                    onClick={() => handlePlalyQuestion(tab.question)}
                  >
                    <TooltipButton 
                      label={isPlaying ? "Stop" : "Start"}
                      icon = {
                        isPlaying ? (
                          <Volume2 className="min-w-5 min-h-5 text-primary animate-pulse" />
                        ) : (
                          <Volume1 className="min-w-5 min-h-5 text-muted-foreground  roudned-md" />
                        )
                      }
                      />
                    </Button>
                </div>

                <p className="p-4">
                  {tab.question}
                </p>
              </div>
            
              <div>
                <RecordAnswer question={tab} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
        {/* final submit button */}
        <div className="flex justify-end items-center mt-4">
          <DialogBox 
            triggerLabel={"Feedback"} 
            icon={<ArrowUpRight size={14}/>}
            title={"You want to see feedback?"}
            description={"Make sure to give answer for all the question."} 
            link={`/generate/feedback/${id}`}
            action={"Go to feedback"}
            />
        </div>
    </>
  )
}

