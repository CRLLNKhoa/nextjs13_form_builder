import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <SignIn />
    </div>
  )
}