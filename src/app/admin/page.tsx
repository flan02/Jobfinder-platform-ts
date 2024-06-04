import JobListItem from "@/components/JobListItem";
import H1 from "@/components/ui/h1";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/job";
import Link from "next/link";


export default async function AdminPage() {
  connectDB();
  const unapprovedJobs = await Job.find({ approved: false });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3 h-[75vh]">
      <H1 className="text-center font-bold text-4xl">Admin Dashboard</H1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved jobs:</h2>
        {
          unapprovedJobs.map((job) => (
            <Link key={job._id} href={`/admin/jobs/${job.slug}`} className="block">
              <JobListItem job={job} />
            </Link>
          ))
        }
        {
          unapprovedJobs.length === 0 && (
            <p className="text-muted-foreground">No unapproved jobs</p>
          )
        }
      </section>
    </main>
  );
}

