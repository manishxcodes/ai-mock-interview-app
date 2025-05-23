import { cn } from "@/lib/utils"

interface HeadingProps {
    title: string
    description?: string
    isSubHeading?: boolean
}


export const Heading = ({title, description, isSubHeading=false}: HeadingProps) => {
  return (
    <div>
        <h2 className={cn("text-lg md:text-3xl text-gray-800 dark:text-gray-300 font-semibold mb-2", isSubHeading && "text-lg md:text-xl mb-2")}>
            {title}
        </h2>
        { description && (
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        )}
    </div>
  )
}
