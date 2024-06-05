"use server";
//* Server actions only runs in server components.

import { connectDB } from "@/lib/mongodb";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import Job from "@/models/job";
//import { put } from "@vercel/blob";
import { redirect } from "next/navigation";


export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  //throw Error("Not implemented yet")

  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    aplicationEmail,
    aplicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}`

  let companyLogoUrl: string | undefined = undefined;
  let remote = false;
  if (locationType === 'Remote') remote = true;

  connectDB();

  const newJob = await Job.create({
    title: title.trim(),
    type,
    slug,
    companyName: companyName.trim(),
    companyLogoUrl,
    locationType,
    location,
    aplicationEmail: aplicationEmail?.trim(),
    aplicationUrl: aplicationUrl?.trim(),
    description: description?.trim(),
    salary: parseInt(salary),
    remote,
    //approved: true, by default it is false after the user revalidate the job it will be true
  });

  console.log(newJob)

  redirect("/job-submitted");
}

/*
  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );
 
    companyLogoUrl = blob.url;
  }
  */