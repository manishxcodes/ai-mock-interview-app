import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Link } from "react-router"

interface DialogBoxProps {
    triggerLabel:string
    icon?:React.ReactNode
    title: string 
    description: string
    link: string
    action: string
}

export const DialogBox = ({triggerLabel, icon, title, description, link, action}: DialogBoxProps) => {
  return (
    <Dialog>
        <DialogTrigger>
            <span
                className="flex items-center justify-center mt-4 border border-primary gap-1 p-2 rounded-md">
                {triggerLabel}
                {icon}
          </span>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
                {description}
            </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
                <Link to={`${link}`}>
                <Button 
                variant={'outline'} className="mt-4 border-primary">
                    {action}
                </Button>
                </Link>
            </div>
        </DialogContent>
    </Dialog>

  )
}
