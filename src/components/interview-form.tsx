import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { Interview, formSchema, FormData } from "@/types"

import { CustomBreadCrumb } from "./custom-breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";

import { toast } from "sonner";
import { Heading } from "./ui/Heading";
import { Button } from "./ui/button";
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { chatSession } from "@/lib/gen-ai";

import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

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

  console.log("intialdatainside interview form: ", initialData);

  const {isValid, isSubmitting} = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();
  const title = initialData?.position
                  ? initialData.position 
                  : "Create a new Mock Interview";

  const breadCrumbPage = initialData?.position ? initialData?.position : "Create";
  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
                        ? { title: "Updated!", description: "Changes saved successfully!" }  
                        : { title: "Created!", description: "New Mock Interview Created"};

// for cleaning the AI response
  const cleanAIResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    // Step 3: Extract a JSON array by capturing text between square brackets
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON array found in response");
    }

    // Step 4: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  // generate question & answer from AI
  const generateAIResponse = async(data: FormData) => {
    const prompt = `
    As an experienced prompt engineer, generate a JSON array containing 8 technical interview questions along with detailed answers based on the following job information. 
    
    IMPORTANT: The response must be a valid JSON array. Make sure all quotes, commas, and brackets are correctly placed.
    
    Format the array exactly like this:
    [
      { "question": "Question text here", "answer": "Answer text here" },
      { "question": "Another question", "answer": "Another answer" }
    ]
    
    Job Information:
    - Job Position: ${data?.position}
    - Job Description: ${data?.description}
    - Years of Experience Required: ${data?.experience}
    - Tech Stacks: ${data?.techStack}
    
    The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Return only the JSON array with questions and answers.
    `;

    const aiResponse = await chatSession.sendMessage(prompt);
    const cleanedAIResponse = cleanAIResponse(aiResponse.response.text())
    console.log(cleanedAIResponse)
    return cleanedAIResponse;
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      if(initialData) {
        // update 
        const aiResult = await generateAIResponse(data);

        await updateDoc(doc(db, "interviews", initialData?.id), {
          questions: aiResult,
          ...data,
          updatedAt: serverTimestamp()
        });
        toast(toastMessage.title, {description: toastMessage.description});

      } else {
        // create a new interview
        if(isValid) {
          const aiResult = await generateAIResponse(data);
          
          //save to db
          const interviewRef = await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: aiResult,
            createdAt: serverTimestamp(),
          });
          console.log("interviewRef: ",interviewRef);

          toast(toastMessage.title, {description: toastMessage.description});

        }
      }

      navigate("/generate", {replace: true})

    } catch(error: any) {
      toast.error("Error", {description: "Something went wrong. Please try again"});
      console.log("Error while generating interview", "details: ", {error})

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadCrumb breadCrumbPage={breadCrumbPage}
        breadCrumbItems={[
          {label: "Mock Interview", link: "/generate"}
        ]} />

        <div className="mt-4 flex items-center justify-between w-full">
          <Heading title={title} isSubHeading />

        {
          initialData && (
            <Button size={"icon"} variant={'ghost'}>
              <Trash2 className="min-w-4 min-h-4 text-orange-500" />
            </Button>
          )
        }
        </div>

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
