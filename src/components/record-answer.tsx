import { useAuth, UserButton } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import WebCam from 'react-webcam'
import { useParams } from 'react-router';
import { Button } from './ui/button';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { toast } from 'sonner';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Badge } from './ui/badge';
import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase.config';
import { generateReview } from '@/lib/clean-response';
import { UserAnswer, UserAnswers } from '@/types';

interface RecordAnswerProps {
    question: {question: string, answer: string};
    isWebCamEnabled: boolean;
    setIsWebCamEnabled: (value: boolean) => void
}

interface AIResponse {
    ratings: number;
    feedback: string;
}

export const RecordAnswer = ({question}: RecordAnswerProps) => {
    const { transcript, browserSupportsSpeechRecognition, listening, resetTranscript } = useSpeechRecognition();

    const [userAnswer, setUserAnswer] = useState("");
    const [isAnswerShort, setIsAnswerShort] = useState(false);
    const [isAIGenerating, setIsAIGenerating] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

    const { userId } = useAuth();
    const { id } = useParams();

    // // get microphone permission
    useEffect(() => {
        const requestMicPermission = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({audio: true})
                console.log("Microphone permission granted");
            } catch (err) {
                console.log("Microphone permission denied", {details: err});
                toast.error("Microphone permission denied")
            }
        }
        requestMicPermission();
    }, [])
    
    // error logging
    if (!browserSupportsSpeechRecognition) {
        toast.error("Browser doesn't support speech recognition.")
    }

    // check if this answer is alredy answered
    useEffect(() => {
        const checkIfAlreadyAnswered = async () => {
            try {
                const userDocRef = doc(db, "userAnswers", `${userId}_${id}`);
                const userDocSnap = await getDoc(userDocRef);

                if(userDocSnap.exists()) {
                    const data = userDocSnap.data() as UserAnswers;
                    const existingData = data.answers || [];
                    const alreadyAnswered = existingData.some((ans: any) => ans.question === question.question);

                    if(alreadyAnswered) {
                        setIsAnswered(true);
                        toast("Already answered", {description: "Move to the next question"});
                    }
                }

                
            } catch(err) {
                console.log("error while check if already answered: ", {details: err});
            }
        };

        if(userId && id && question) {
            checkIfAlreadyAnswered();
        }
    }, [userId, id, question])

    // record user answer
    const startListening = () => {
        SpeechRecognition.startListening({continuous: true, language: 'en-IN' });
    }
    
    // record again i.e it stops previous recording and starts a new one
    const reset = () => {
        stopListening();
        resetTranscript();
        setUserAnswer("");
        setIsAnswerShort(false)
    }

    // stop listening
    const stopListening = () => SpeechRecognition.stopListening();

    // store the recording
    useEffect(() => {
        if(!listening && transcript) {
            if(transcript.length < 30) {
                setIsAnswerShort(true);
             toast.error("Error" ,{description: "Please use more words"})
            }
            setUserAnswer(transcript);
            console.log("inside useeffect: ", transcript);
        }
       
    }, [listening, transcript])

    const saveAnswer = async () => {
        setLoading(true);

        // get review from ai 
        setIsAIGenerating(true);
        const aiResponse = await generateReview({  
            ...question,
            user_answer: userAnswer
        });
        setIsAIGenerating(false);
        console.log("aiResponse" ,aiResponse)
;
        if(!aiResponse) {
            setLoading(false);
            return;
        }

        const currentQuestion = question.question;

        const userAnswerData:UserAnswer = {
            question: currentQuestion,
            correct_answer: question.answer,
            user_answer: userAnswer,
            feedback: aiResponse.feedback,
            rating: aiResponse.ratings
        };

        console.log("userdata: ", userAnswerData);

        try {
            const userDocRef = doc(db, "userAnswers", `${userId}_${id}`);
            const userDocSnap = await getDoc(userDocRef);

            if(userDocSnap.exists()) {
                // if doc exists update answer array
                await updateDoc(userDocRef, {answers: arrayUnion(userAnswerData)});
                toast.success("Saved", { description: "Your answer has been saved." });
            } else {
                // if doc doesn't exists, create
                await setDoc(userDocRef, {
                    userId,
                    interviewId: id,
                    answers: [userAnswerData],
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                toast.success("Saved", { description: "Your answer has been saved." });

            }
        } catch(err) {
            console.log("error while saving answer", {details: err});
            toast.error("Error", {description: "Error while saving your answer"});
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='w-full flex flex-col items-center gap-8 mt-4'>
        <div className="flex items-center justify-center w-full h-full">
            {/*webcam  */}
            <div className="w-full md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div>
                { isWebCamEnabled 
                    ? 
                    (<WebCam 
                        onUserMedia={() => setIsWebCamEnabled(true)}
                        onUserMediaError={() => setIsWebCamEnabled(false)}
                        className="w-full h-full object-cover rounded-md scale-x-[-1]"
                    />
                    )
                    : (
                        <div className=" flex items-center justify-center p-4 h-56">
                        <UserButton />
                        </div>
                    )
                }
                </div>
                <div className="flex items-center justify-center gap-4">
                    <Button variant={"outline"} className="mt-2" onClick={() => {setIsWebCamEnabled(!isWebCamEnabled)
                    }}>
                        {isWebCamEnabled ? <Video /> : <VideoOff />}
                    </Button>
                    { listening 
                        ? <Button variant={"outline"} className="mt-2" onClick={stopListening}>
                        <MicOff />
                        </Button>
                        : <Button variant={"outline"} className="mt-2" onClick={startListening}>
                        <Mic />
                        </Button>
                    }
                </div>
            </div>
            {/* webcam ends */}
        </div>
        
        {/* answer section */}
        <div className='w-full flex flex-col mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800'>
            <h2  className='text-lg font-semibold'>Your Answer</h2>
            <p className='text-sm mt-2 whitespace-normal'>
                {listening && <Badge variant={"default"}>listening.....</Badge>}
                {!listening && !transcript && "Start recording to see your answer"}
            </p>

            { listening 
                ? <p>{transcript}</p>
                : <p>{userAnswer}</p>
            }
            
            <div className='flex items-center gap-2 justify-end mt-4'>
                <Button size={"sm"} disabled={listening || !transcript || loading || isAnswered} variant={'outline'} className='' onClick={reset} >
                        Reset
                </Button>
                <Button
                    disabled={listening || !transcript || isAnswerShort || loading || isAnswered } 
                    size={"sm"} 
                    onClick={saveAnswer}>Save
                </Button> 
            </div>
        </div>
    </div>
    );
}
