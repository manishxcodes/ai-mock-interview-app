import { motion } from "motion/react"

interface BannerProps {
    title?: string
    description?: string
}

export const Banner = ({title, description}: BannerProps) => {
  return (
    <div className=" text-white dark:text-white bg-white dark:bg-black w-full flex flex-col items-center mx-auto mb-10">
        <motion.div 
        initial={{ opacity: 0, y: 30 }}  // Start invisible & move up
        whileInView={{ opacity: 1, y: 0 }}  // Animate to visible
        transition={{ duration: 0.4, ease: "easeOut" }}  // Smooth animation
        viewport={{ once: true, amount: 0.6 }} 
        className=" items-center flex flex-col  w-full py-10">
        <h1 className=" text-4xl font-bold md:text-5xl  text-center max-w-[650px] w-full  text-black dark:text-white leading-relaxed mt-4 px-4 mb-2 tracking-tight">{title}</h1>
        <p className="text-[18px] text-center max-w-[650px] w-full md:text-[18px] text-black/70 dark:text-white/70 leading-relaxed mt-2 px-4 ">
        {description}
            </p>
        </motion.div>
    </div>
  )
}