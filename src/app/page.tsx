import Image from "next/image";
import { Button } from "@/components/ui/button"
import { connectDB } from "@/lib/mongodb";
//import User from "@/models/user";
import Job from "@/models/job";
import JobListItem from "@/components/JobListItem";

export default async function Home() {
  connectDB()
  //const users = await User.find({})
  const jobs = await Job.find({})
  return (
    <main>
      <h1 className="text-blue-500">JOBFINDER</h1>
      <Button variant="default">Button</Button>

      {/*
        users.map((user) => (
          <div key={user._id} className="border-2 border-purple-600 w-max px-4 mt-2 bg-purple-200 text-purple-900">
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </div>
        ))
      */ }
      {
        jobs.map((job) => (
          <JobListItem key={job._id} job={job} />
        ))
      }
    </main>
  );
}
