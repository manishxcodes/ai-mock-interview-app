import { SignUp as ClerkSignUp } from "@clerk/clerk-react"

export const SignUp = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
        <ClerkSignUp path="/signup" />
    </div>
  )
}
