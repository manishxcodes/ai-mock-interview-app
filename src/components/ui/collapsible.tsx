import { motion } from "motion/react"
import { useState } from "react";

interface ModalProps {
    question: string
    answer: string
}

export const Collapsible = ({question, answer}: ModalProps) => {
    const [visible, setVisible] = useState(false);

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}  // Start invisible & move up
    whileInView={{ opacity: 1, y: 0 }}  // Animate to visible
    transition={{ duration: 0.2, ease: "easeOut" }}  // Smooth animation
    viewport={{ once: true, amount: 0.1}} 
    className="flex flex-col max-w-3xl w-full justify-center border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-neutral-200 rounded-lg mx-auto cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-950 py-1 shadow-sm hover:shadow-md mb-2"
        onClick={() => {setVisible(!visible)}}>
        <div className="px-4 py-2 flex  justify-between items-center text-lg  text-black dark:text-neutral-300 w-full">
        {question}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-5 h-5 text-black/70 dark:text-white/70"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        </div>
        {visible && <motion.p
        initial={{opacity:0.4, }}
        animate={{opacity: 1, y:0}}
        exit={{opacity: 0,}}
        transition={{duration: 0.3}}
        className="px-4 pb-2 text-neutral-600 text-[16px]">
        {answer}
        </motion.p>}
    </motion.div>
  )
}