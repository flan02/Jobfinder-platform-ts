import JobDetailsPage from "@/components/JobDetailsPage";
import { Button } from "@/components/ui/button";
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

// ! We can't share data between Page and Metadata functions. I need to call database twice although I already have the data in the Page function.
// * The only alternative for that is use fetch, but it's not recommended because it's not SSR. With axios or an ORM I can't use cache like fetch.

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);
  //console.log(job.aplicationEmail)
  const aplicationLink = job.aplicationEmail ? `mailto:${job.aplicationEmail}` : job.aplicationUrl;
  if (!aplicationLink) {
    console.log("Job has no aplication link or email");
    notFound();
  }
  //console.log(job);
  //console.log(aplicationLink);
  return (
    <main className="max-w-5xl px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
      <JobDetailsPage job={job} />
      <aside>
        <Button asChild>
          <a href={job.aplicationLink} className="w-40 md:w-fit" >
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  )
}