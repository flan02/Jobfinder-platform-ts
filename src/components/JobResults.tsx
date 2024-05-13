import { Button } from "@/components/ui/button"
import { connectDB } from "@/lib/mongodb";
//import User from "@/models/user";
import Job from "@/models/job";
import JobListItem from "@/components/JobListItem";
import { JobFilterValues } from "@/lib/validation";
import Link from "next/link";

interface JobResultsProps {
  filteredValues: JobFilterValues
}



export default async function JobResults({
  filteredValues: { q, type, location, remote }
}: JobResultsProps) {

  const searchTitle = q?.trim() || '';
  const searchType = type?.trim() || '';
  const searchLocation = location?.trim() || '';
  const searchRemote = remote || '';
  connectDB();
  let jobs;
  if (searchTitle === '' || searchType === '' || searchLocation === '') jobs = await Job.find();

  const $regexTitle = new RegExp(searchTitle, "i");
  const $regexType = new RegExp(searchType, "i");
  const $regexLocation = new RegExp(searchLocation, "i");

  type Query = {
    title?: RegExp;
    type?: RegExp;
    location?: RegExp;
    remote?: boolean;
  }
  const searchFilter: Query = {
    title: $regexTitle,
    type: $regexType,
    location: $regexLocation,

  };
  if (searchRemote) searchFilter.remote = true;

  //console.log("The Complete object Filter is:", searchFilter);
  //console.log("Remote checked value is:", remote);

  if (searchTitle === undefined || searchType === undefined || searchLocation === undefined) jobs = await Job.find();
  else jobs = await Job.find(searchFilter);
  return (
    <div className="space-y-4 grow">
      {
        jobs.map((job) => (

          <Link className="block"
            href={`/jobs/${job.slug}`} key={job._id} >
            <JobListItem job={job} />
          </Link>
        ))
      }
      {
        jobs.length === 0 && (<p className="font-semibold text-center m-auto text-muted-foreground">No jobs found. Try adjusting your search filter</p>)
      }
    </div>
  )
}