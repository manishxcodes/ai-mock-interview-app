import { SignIn as ClerkSignIn } from "@clerk/clerk-react"

export const SignIn = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
        <ClerkSignIn path="/signin" />
    </div>
  )
}

// grid lines
{/* <div className="absolute -z-10 inset-0 h-full w-full 
bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]" /> */}

// grid dots
{/*<div className="absolute -z-10 inset-0 h-full w-full 
bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] 
bg-[size:10px_10px]" /> */}