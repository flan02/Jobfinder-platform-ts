import Job from "@/models/job"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Select from "./ui/select"
import { jobTypes } from "@/lib/job-types"
import { Button } from "./ui/button"
import { jobFilterSchema } from "@/lib/validation"
import { redirect } from "next/navigation"



type Props = {}

// $ SERVER ACTION FUNCTION
async function filterJobs(formData: FormData) {
  // TODO This server fc receives the form data when I click on the submit button and filter the jobs
  'use server'
  //console.log(formData.get("q") as string)
  const values = Object.fromEntries(formData.entries()) // ? Convert form values (FormData) to javascript object
  const { q, type, location, remote } = jobFilterSchema.parse(values) // ? Validate form values. Destructuring parsedValues to {q, type, location, remote}
  const searchParams = new URLSearchParams({ // ? Create a new URLSearchParams object
    ...(q && { q: q.trim() }), // ? If q exists, add it to the searchParams
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: 'true' }),
  })

  redirect(`/?${searchParams.toString()}`) // * ?q=value1&type=value2&location=value3&remote=value4
}

// $ GET DATA FUNCTION
async function getDistinctLocations() {
  const distinctLocations = await Job
    .find({}, { location: 1, _id: 0 })
    .distinct('location') // ? filter repeated locations only show unique locations
    .then((locations) => locations
      .map((location) => location)
      .filter(Boolean)
    )

  return distinctLocations
}

// $ SERVER COMPONENT
export default async function JobFilterSidebar(props: Props) {

  const distinctLocations = await getDistinctLocations()


  //console.log(distinctLocations);
  // TODO: Server Component. Actions from form should be handled by a server component and it doesn't require javascript on the client side.
  return (
    <aside className="md:w-[260px] p-4 sticky top-0 bg-background h-fit border rounded-lg">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">

            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company, etc" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" default={true} defaultValue=" " >
              <option className="bg-slate-100" value="" ></option>
              <option className="bg-slate-100" value="">All types</option>
              {
                jobTypes.map((type) => (
                  <option className="bg-slate-100" key={type} value={type}>
                    {type}
                  </option>
                ))
              }
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select className="" id="location" name="location" default={true} defaultValue=" " >

              <option className="bg-slate-100 text-sm" value="" ></option>
              <option className="bg-slate-100 text-sm" value="" >All locations</option>

              {
                distinctLocations.map((location) => (
                  <option className="bg-slate-100 text-sm" key={location} value={location}>
                    {location}
                  </option>
                ))
              }

            </Select>
          </div>
          <div className="flex items-center gap-2 ">
            <input type="checkbox" id="remote" name="remote" className="ml-1 scale-125 accent-black" />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button type="submit" className="w-full">Apply filters</Button>
        </div>
      </form>
    </aside>
  )
}

