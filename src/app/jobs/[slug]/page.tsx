import JobDetailsPage from "@/components/JobDetailsPage";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/job";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

// TODO: This is how I generate dynamic metadata.

interface PageProps {
  params: {
    slug: string;
  }
}

const getJob = cache(async (slug: string) => {
  connectDB();
  const job = await Job.findOne({ slug })
  if (!job) notFound()
  return job
})

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const job = await getJob(slug);
  const metadata = {
    title: job.title,
    description: "Page created by Dan Chanivet."
  }
  return metadata
}

// ! We can't share data between Page and Metadata functions. I need to call database twice although I already have the data in the Page function.
// ? The only alternative for that is use fetch, but it's not recommended because it's not SSR. With axios or an ORM I can't use cache like fetch.

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);
  return (
    <main className="max-w-5xl px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
      <JobDetailsPage job={job} />
    </main>
  )
}