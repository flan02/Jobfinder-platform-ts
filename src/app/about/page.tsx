import H1 from "@/components/ui/h1"
import Image from "next/image"
import profile from "@/assets/yo.jpg"

type Props = {}

const Aboutpage = (props: Props) => {
  return (
    <main className="min-h-[75vh] text-center">
      <H1>#be Hired</H1>
      <h2 className="mt-4 text-muted-foreground">
        Creating job opportunities for developers
      </h2>
      <h3 className="my-12">
        This job board is a project by Argentine programmer Dan Chanivet
      </h3>
      <Image src={profile} alt="" width={100} height={100} className="rounded-full mx-auto" />
      <div className="flex justify-around my-8 underline text-amber-100">
        <p>login provided by Clerk</p>
        <p>free bbdd storage by mongodb</p>
      </div>
      <a href="/" className="hover:underline">
        dashboard
      </a>

    </main>
  )
}

export default Aboutpage