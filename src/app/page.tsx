import Image from "next/image";
import { Button } from "@/components/ui/button"
import { connectDB } from "@/lib/mongodb";
//import User from "@/models/user";
import Job from "@/models/job";
import JobListItem from "@/components/JobListItem";
import JobFilterSidebar from "@/components/JobFilterSidebar";

export default async function Home() {
  connectDB()
  //const users = await User.find({})
  const jobs = await Job.find({})
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4 ">
        <JobFilterSidebar />
        <div className="space-y-4 grow">
          {
            jobs.map((job) => (
              <JobListItem key={job._id} job={job} />
            ))
          }
        </div>
      </section>
    </main>
  );
}
