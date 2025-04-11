import { Container } from "@/components/Container"
import { GradientButton } from "@/components/ui/gradient-button"
import demoPhoto from "@/assets/mock-interview-img.png"

const HomePage = () => {
    return (
      <div>
        <Container>
          <div className="w-full h-full px-4 py-24 flex flex-col justify-center items-center">
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Ace Your Interviews  <br /> with <span className="text-primary">AI</span>
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            Practice mock interviews and get instant AI-driven feedback to level up your skills with Acemock.
            </p>
            <GradientButton label={"Take Interview"} />

            <div className="w-[80%] mt-20  px-2 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <img src={demoPhoto} className="rounded-xl" alt="photo" />
            </div>
          </div>
        </Container>
      </div>
      
    )
  }
  
  export default HomePage