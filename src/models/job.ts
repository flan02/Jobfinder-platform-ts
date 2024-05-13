
import { Schema, model, models } from 'mongoose'

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [50, "Title must be at most 50 characters long"]
  },
  type: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary']
  },
  locationType: {
    type: String,
    required: true,
    enum: ['Remote', 'On-site']
  },
  location: {
    type: String,
    optional: true // remote jobs don't need a location
  },
  description: {
    type: String,
    optional: true
  },
  salary: {
    type: Number,
    required: true
  },
  companyName: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [50, "Title must be at most 30 characters long"]
  },
  aplicationEmail: {
    type: String,
    optional: true,  // optional because we can have an application URL
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email is not valid"
    ]
  },
  aplicationUrl: {
    type: String,
    optional: true  // optional because we can have an application email
  },
  companyLogoUrL: {
    type: String,
    optional: true
  },
  approved: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

// * If you want to use the same model name, you validate that the model exists before using it
const Job = models.Job || model('Job', jobSchema)

export default Job

