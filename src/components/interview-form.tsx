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

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log(data);

    } catch(error) {
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
                        value={field.value || ""} />
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
                        value={field.value || ""} />
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
                        value={field.value || ""}/>
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
                        value={field.value || ""} />
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
