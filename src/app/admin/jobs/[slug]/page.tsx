
import JobPage from "@/components/JobPage";

import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/job";
import { cache } from "react";
import { Metadata } from "next";
interface PageProps {
  params: { slug: string };
}

// * This is how I cache the data. I can use the cache function to store the data at the compile time.
const getJob = cache(async (slug: string) => {
  connectDB();
  const job = await Job.findOne({ slug })
  if (!job) notFound()
  return job
})

const getSlugs = cache(async () => {
  connectDB();
  const slugs = await Job.find({ approved: true }, { slug: 1, _id: 0 });
  // console.log(slugs);
  return slugs.map(({ slug }) => slug);
})
// * This is how I generate static paths. After this fc the slugs will be generated immediately and the page will be created faster.
export async function generateStaticParams() {
  const slugs = await getSlugs();

  return slugs.map((slug) => ({ params: { slug } }));
}

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const job = await getJob(slug);
  const metadata = {
    title: job.title,
    description: "Page created by Dan Chanivet."
  }
  return metadata
}

export default async function Page({ params: { slug } }: PageProps) {

  //connectDB();
  //const job = await Job.findOne({ slug });
  const job = await getJob(slug);

  if (!job) notFound();

  return (
    <main className="m-auto h-[75vh] my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={JSON.parse(JSON.stringify(job))} />
      <AdminSidebar job={JSON.parse(JSON.stringify(job))} />
    </main>
  );
}