import { Container } from "@/components/Container"
import { GradientButton } from "@/components/ui/gradient-button"
import demoPhoto from "@/assets/mock-interview-img.png"
import { FAQ } from "@/components/faq"
import { easeOut, motion } from "motion/react"
import { Link } from "react-router"


const HomePage = () => {
    return (
      <div>
        <Container>
          <div className="w-full h-full px-4 py-24 flex flex-col justify-center items-center">
            <motion.h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
            initial={{y:30, opacity:0}}
            animate={{y:0, opacity: 1}}
            transition={{
                duration: 0.5,
                ease: easeOut    
            }}
            >
            Ace Your Interviews  <br /> with <span className="text-primary">AI</span>
            </motion.h2>
            <motion.p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center"
              initial={{y:30, opacity:0}}
              animate={{y:0, opacity: 1}}
              transition={{
                  duration: 0.5,
                  ease: easeOut ,
              }}
            >
            Practice mock interviews and get instant AI-driven feedback to level up your skills with Acemock.
            </motion.p>
            <motion.div className="w-full flex items-center justify-center"
            initial={{y:20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{
              duration: 0.2,
              delay: 0.3
            }}
            >
            <Link to={'/signin'}>
              <GradientButton label={"Take Interview"} />
            </Link>
            </motion.div>
            <motion.div className="w-[80%] mt-20  px-2 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900"
            initial={{y:20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{
              duration: 0.2,
              delay: 0.5
            }}
            >
              <img src={demoPhoto} className="rounded-xl" alt="photo" />
            </motion.div>

            <FAQ />
          </div>
        </Container>
      </div>
      
    )
  }
  
  export default HomePage