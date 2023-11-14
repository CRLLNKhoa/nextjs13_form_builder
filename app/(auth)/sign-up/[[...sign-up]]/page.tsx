import {  SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-cyan-200">
      <SignUp />
    </div>
  )
}