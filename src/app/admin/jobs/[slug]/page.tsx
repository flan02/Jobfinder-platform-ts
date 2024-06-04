import JobPage from "@/components/JobPage";

import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/job";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {

  connectDB();
  const job = await Job.findOne({ slug });

  if (!job) notFound();

  return (
    <main className="m-auto h-[75vh] my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}