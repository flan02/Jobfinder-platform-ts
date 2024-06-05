import Image from "next/image";
import JobFilterSidebar from "@/components/JobFilterSidebar";
import H1 from "@/components/ui/h1";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";


interface Props {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `Jobs for ${q}`
    : type
      ? `${type} developer jobs`
      : remote
        ? 'Remote developer jobs'
        : 'All developer jobs'

  const titleSuffix = location ? ` in ${location}` : ''
  return `${titlePrefix}${titleSuffix}`
}


export function generateMetadata({
  searchParams: { q, type, location, remote }
}: Props): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === 'true'
    })
      } | be Hired`
  }
}

export default async function Home({
  searchParams: { q, type, location, remote, page }
}: Props) {
  const filteredValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === 'true'
  }
  return (
    <main className="min-h-[90vh] max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>
          {getTitle(filteredValues)}
        </H1>
        <p className="text-muted-foreground">Check our available jobs</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4 ">
        <JobFilterSidebar defaultValues={filteredValues} />
        <JobResults
          filteredValues={filteredValues}
          page={page ? parseInt(page) : undefined}
        />

      </section>
    </main>
  );
}
