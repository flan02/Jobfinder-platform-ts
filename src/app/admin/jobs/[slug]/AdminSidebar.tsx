"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { useFormState } from "react-dom";
import { approveSubmission, deleteJob } from "./actions";

interface AdminSidebarProps {
  job: any;  // * this job prop should be of type Job (zod schema)...
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job._id} />
      )}
      <DeleteJobButton jobId={job._id} />
    </aside>
  );
}

interface AdminButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  // * React experimental yet.
  const [formState, formAction] = useFormState(approveSubmission, undefined); // ? 1st param is the action fc to call, 2nd param is the initial state.
  // formAction doesn't require javascript. It is native form submission.
  console.log(jobId);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {
        formState?.error && (
          <p className="text-sm text-red-500">{formState.error}</p>
        )
      }
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}