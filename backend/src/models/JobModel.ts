import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  postedBy: mongoose.Types.ObjectId;
  description: string;
  salary: number;
  skillsRequired: string[];
  applications: mongoose.Types.ObjectId[];
  postedAt: Date;
  jobType: "full-time" | "internship" | "part-time";
}

const JobSchema: Schema<IJob> = new Schema(
  {
    title: { type: String, required: true },
    company: {
      type: String ,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    skillsRequired: { type: [String], required: true },
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    ],
    jobType: {
      type: String,
      enum: ["full-time", "internship", "part-time"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", JobSchema);
