import z from 'zod'
import { jobTypes, locationTypes } from './job-types'

// TODO: We can validate both frontend and backend with the same schema.

const companyLogoSchema = z.custom<File | undefined>().refine((file) =>
  !file || (file instanceof File && file.type.startsWith("image/")),
  "Must be an image file").refine((file) => {
    return !file || file.size < 1024 * 1024 * 2 //? 2 MB
  }, "File must be less than 2MB")


const requiredString = z.string().min(3, "Required").max(50, "Too long")
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number")

const applicationSchema = z.object({
  aplicationEmail: requiredString.email().optional().or(z.literal(" ")),
  aplicationUrl: requiredString.url().optional().or(z.literal(" ")),
}).refine((data) => data.aplicationEmail || data.aplicationUrl, {
  message: "Email or Url is required.",
  path: ["aplicationEmail"]
})
const locationSchema = z.object({
  locationType: requiredString.refine((value) => locationTypes.includes(value)),
  location: requiredString.max(100, "Location can't be longer than 100 characters").optional()
}).refine((data) => !data.locationType || data.locationType === "remote" || data.location,
  {
    message: "Location is required for on-site jobs",
    path: ["location"]
  })

export const createJobSchema = z.object({
  title: requiredString,
  type: requiredString.refine((value) => jobTypes.includes(value),
    "Invalid job type"),
  companyName: requiredString,
  companyLogo: companyLogoSchema,
  description: z.string().min(3, "Required").max(5000).optional(),
  salary: numericRequiredString.max(9, "Number can't be longer than 9 digits"),
  //remote: z.boolean()
  //location: z.string().min(3, "Required").max(1000),
}).and(applicationSchema).and(locationSchema)

export type CreateJobValues = z.infer<typeof createJobSchema>

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
})

export type JobFilterValues = z.infer<typeof jobFilterSchema>





