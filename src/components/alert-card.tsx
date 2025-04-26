import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb } from "lucide-react"

interface AlertCardProps {
    title: string
    descriptions: React.ReactNode[]
}

export const AlertCard = ({title, descriptions}: AlertCardProps) => {
  return (
    <Alert className="bg-green-50 border-green-400 text-primary">
    <Lightbulb className="h-4 w-4" />
    <AlertTitle className="mb-4">{title}</AlertTitle>
    {
        descriptions.map((description, index) => (
            <AlertDescription className="mb-2" key={index}>
                {description}
            </AlertDescription> 
        ))
    }

  </Alert>
  )
}
