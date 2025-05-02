import { Banner } from "./ui/Banner"
import { Collapsible } from "./ui/collapsible"

export const FAQ = () => {
  return (
    <div id="faq" className="w-full p-8">
      <Banner 
      title="Frequently asked questions"
      description="Everything you need to know about our AceMock." />

      {
        faq.map((f, i) => (
          <Collapsible key={i}
            question={f.question}
            answer={f.answer}
          />
        ))
      }
    </div>
  )
}

const faq = [
    {
      question: "Do you save the webcam video during interviews?",
      answer: "No, we do not save any video recordings. The webcam feature is only used to simulate a real interview environment and help you observe your body language and presence."
    },
    {
      question: "Is my audio saved anywhere?",
      answer: "No. We only use your audio to transcribe your spoken answers into text. The audio itself is not stored or saved on our servers."
    },
    {
      question: "How does the interview process work?",
      answer: "You begin by filling out a simple interview form with your job role, experience, and tech stack. Based on that, our AI generates tailored interview questions for you to answer."
    },
    {
      question: "Who reviews my answers?",
      answer: "Our AI system reviews your responses and provides detailed feedback, including strengths, areas to improve, and an overall rating."
    },
    {
      question: "Can I retake the interview or improve my answers?",
      answer: "Yes, you can retake the interview or edit your answers anytime. Just note that previous responses will be replaced with the new ones."
    },
  ];
  