import { cn } from "@/lib/utils"
import { Loader as LoaderIcon } from "lucide-react"

export const Loader = ({className}: {className?: String}) => {
  return (
    <div className={cn("w-screen h-screen flex items-center justify-center bg-transparent z-50", className)}>
        <LoaderIcon className="w-6 h-6 min-w-6 min-h-6 animate-spin" />
    </div>
  )
}
