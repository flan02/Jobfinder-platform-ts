"use server";

import { connectDB } from "@/lib/mongodb";

import { isAdmin } from "@/lib/utils";
import Job from "@/models/job";
import { currentUser } from "@clerk/nextjs/server";

//import { del } from "@vercel/blob";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = { error?: string } | undefined; // ? error case | success case

// * Return type always is Promise<> because we are using async functions.
export async function approveSubmission(prevState: FormState, formData: FormData): Promise<FormState> { // ? useFormState requires two args: prevState and formData
  try {
    //throw Error("Intentional error...");  // * useFormState will show the error message.

    const jobId = formData.get("jobId") as string;
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    connectDB();
    const job = await Job.findOneAndUpdate({ _id: jobId }, { approved: true });

    revalidatePath("/");  // * Re-render the page to show updated data.
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function deleteJob(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    //throw Error("Intentional error...");  // * useFormState will show the error message.
    const jobId = formData.get("jobId") as string;

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    /*
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });
    */
    // * VERCEL BLOB
    /*
        if (job?.companyLogoUrl) {
          await del(job.companyLogoUrl);
        }
    */
    /*
        await prisma.job.delete({
          where: { id: jobId },
        });
    */

    const jobDeleted = await Job.deleteOne({ _id: jobId });

    console.log(jobDeleted);

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect("/admin");
}