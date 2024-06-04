import { Button } from "@/components/ui/button"
import { connectDB } from "@/lib/mongodb";
//import User from "@/models/user";
import Job from "@/models/job";
import JobListItem from "@/components/JobListItem";
import { JobFilterValues } from "@/lib/validation";
import Link from "next/link";
import Pagination from "./Pagination";

interface JobResultsProps {
  filteredValues: JobFilterValues  // * export type JobFilterValues = z.infer<typeof jobFilterSchema>
  page?: number
}

export default async function JobResults({ filteredValues, page = 1 }: JobResultsProps) {
  // { filteredValues: { q, type, location, remote }
  const { q, type, location, remote } = filteredValues;

  const searchTitle = q?.trim() || '';
  const searchType = type?.trim() || '';
  const searchLocation = location?.trim() || '';
  const searchRemote = remote || '';

  const jobsPerPage = 4;
  const skip = (page - 1) * jobsPerPage;

  connectDB();
  let jobs;

  let countJobsPromise;
  if (searchTitle === '' || searchType === '' || searchLocation === '') {
    jobs = await Job.find({ approved: true }).skip(skip).sort({ createdAt: -1 }).limit(4);
    countJobsPromise = await Job.countDocuments({ approved: true });
    //const [paginatedJobs, totalJobs] = await Promise.all([jobsPromise, countJobsPromise]);
  }
  const $regexTitle = new RegExp(searchTitle, "i");
  const $regexType = new RegExp(searchType, "i");
  const $regexLocation = new RegExp(searchLocation, "i");



  type Query = {
    title?: RegExp;
    type?: RegExp;
    location?: RegExp;
    remote?: boolean;
    approved: boolean;
  }
  const searchFilter: Query = {
    title: $regexTitle,
    type: $regexType,
    location: $regexLocation,
    approved: true
  };
  if (searchRemote) searchFilter.remote = true;

  //console.log("The Complete object Filter is:", searchFilter);
  //console.log("Remote checked value is:", remote);

  if (searchTitle === undefined || searchType === undefined || searchLocation === undefined) {
    jobs = await Job.find({ approved: true }).skip(skip).sort({ createdAt: -1 }).limit(4);
    countJobsPromise = await Job.countDocuments({ approved: true });
  } else {
    jobs = await Job.find(searchFilter).skip(skip).sort({ createdAt: -1 }).limit(4);
    countJobsPromise = await Job.countDocuments(searchFilter);
  }
  //console.log("The jobs are:", jobs);
  //console.log("The countJobsPromise is:", countJobsPromise);
  return (
    <div className="space-y-4 grow">
      {
        jobs.length > 0 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={countJobsPromise ? Math.ceil(countJobsPromise / jobsPerPage) : 1}
              filterValues={filteredValues}
            />
          </div>
        )
      }
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

