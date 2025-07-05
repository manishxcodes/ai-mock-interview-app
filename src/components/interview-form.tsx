import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { Interview, formSchema, FormData } from "@/types"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useInterviewData } from "@/context/InterviewDataContext";
import { generateAIQuestion } from "@/lib/generate-question";
interface InterviewFormProps {
    initialData?: Interview | null;
}

export const InterviewForm = ({initialData}: InterviewFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      position: "",
      description: "",
      experience: 0,
      techStack: ""
    }, 
    mode: "onChange"
  });

  
  // inside the component:
  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position || "",
        description: initialData.description || "",
        experience: initialData.experience || 0,
        techStack: initialData.techStack || ""
      });
    }
  }, [initialData, form]);

  const {isValid, isSubmitting} = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();
  const {fetchInterviews} = useInterviewData()

  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
                        ? { title: "Updated!", description: "Changes saved successfully!" }  
                        : { title: "Created!", description: "New Mock Interview Created"};

  const onDelete = async (interviewId: string) => {
    //console.log('yo')
    try {
      const userAnswerRef = await doc(db, "userAnswers", `${userId}_${interviewId}`);
      const userAnswerSnap = await getDoc(userAnswerRef);

      if(userAnswerSnap.exists()) {
        await deleteDoc(userAnswerRef)
      }

      fetchInterviews();
    } catch(err) {
      //console.log("error while delete user answer", {details: err})
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      if(initialData) {
        // update 
        const aiResult = await generateAIQuestion(data);

        await updateDoc(doc(db, "interviews", initialData?.id), {
          questions: aiResult,
          ...data,
          updatedAt: serverTimestamp()
        });
        toast(toastMessage.title, {description: toastMessage.description});
        onDelete(initialData.id);
        navigate(`/generate/interview/${initialData?.id}`)
        fetchInterviews();
      } else {
        // create a new interview
        if(isValid) {
          const aiResult = await generateAIQuestion(data);
          
          //save to db
          const interviewRef = await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: aiResult,
            createdAt: serverTimestamp(),
          });
          //console.log("interviewRef: ",interviewRef);

          toast(toastMessage.title, {description: toastMessage.description});
          fetchInterviews();
          navigate(`/generate/interview/${interviewRef?.id}`)
        }
      }

    } catch(error: any) {
      toast.error("Error", {description: "Something went wrong. Please try again"});
      //console.log("Error while generating interview", "details: ", {error})

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex-col space-y-4">
        <Link to={'/generate'}>
          <Button className="underline" variant={'link'}>Go to dashboard</Button>
        </Link>
        <Separator className="my-10" />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} 
            className="w-full p-8 rounded-lg flex flex-col items-start justify-start gap-6 shadow-md ">
              {/* job position */}
              <FormField
                control={form.control}
                name={"position"}
                render={({field}) => (
                  <FormItem className="w-full space-y-1">
                     <div className="w-full flex items-center justify-start">
                        <FormLabel>Job Role / Job Postion </FormLabel>
                        <FormMessage className="text-sm" />
                     </div>
                     <FormControl>
                      <Input
                        type="string"
                        disabled={loading}
                        className="h-10"
                        placeholder="e.g: Frontend Developer"
                        {...field}
                        value={field.value ?? ""} />
                     </FormControl>
                  </FormItem>
                )}
              />
              
              {/* job description */}
              <FormField
                control={form.control}
                name={"description"}
                render={({field}) => (
                  <FormItem className="w-full space-y-4">
                     <div className="w-full flex items-center justify-start">
                        <FormLabel>Job Description </FormLabel>
                        <FormMessage className="text-sm" />
                     </div>
                     <FormControl>
                      <Textarea 
                        typeof="string"
                        disabled={loading}
                        className="h-10"
                        placeholder="describe your job role or position"
                        {...field}
                        value={field.value ?? ""} />
                     </FormControl>
                  </FormItem>
                )}
              />

              {/* job experience */}
              <FormField
                control={form.control}
                name={"experience"}
                render={({field}) => (
                  <FormItem className="w-full space-y-4">
                     <div className="w-full flex items-center justify-start">
                        <FormLabel>Years of Experience </FormLabel>
                        <FormMessage className="text-sm" />
                     </div>
                     <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        className="h-10"
                        placeholder="e.g: 5 years"
                        {...field}
                        value={field.value ?? ""}/>
                     </FormControl>
                  </FormItem>
                )}
              />

              {/* job techStack */}
              <FormField
                control={form.control}
                name={"techStack"}
                render={({field}) => (
                  <FormItem className="w-full space-y-4">
                     <div className="w-full flex items-center justify-start">
                        <FormLabel>Tech Stack </FormLabel>
                        <FormMessage className="text-sm" />
                     </div>
                     <FormControl>
                      <Input
                        type="string"
                        disabled={loading}
                        className="h-10"
                        placeholder="e.g: typescript, react, express, etc"
                        {...field}
                        value={field.value ?? ""} />
                     </FormControl>
                  </FormItem>
                )}
              />

              <div className="w-full flex items-center justify-end gap-6">
                <Button type="reset" size={"sm"} variant={"outline"} 
                disabled={isSubmitting || loading}
                onClick={() => form.reset(initialData || {
                  position: "",
                  description: "",
                  experience: 0,
                  techStack: ""
                })} >
                  Reset
                </Button>

                <Button type="submit" size={"sm"} variant={"default"}
                  disabled={isSubmitting || loading || !isValid}>
                  {loading 
                    ? (<Loader className="text=gray-50 animate-spin"/> )
                    : (actions) 
                  }
                </Button>
              </div>

            </form>
        </FormProvider>
    </div>
  )
}
