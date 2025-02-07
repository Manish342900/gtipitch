import StartupForm from "@/components/ui/StartupForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation";


const page = async() => {
  const session=await auth()


  if (!session){
    redirect('/')
  }

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">SUBMIT YOUR STARTUP FORM</h1>
      </section>

      <StartupForm/>
    </>
  )
}

export default page
