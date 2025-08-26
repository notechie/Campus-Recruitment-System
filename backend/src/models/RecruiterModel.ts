import mongoose, { Document, Schema } from "mongoose";

export interface IRecruiter extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  industry: string;
}

const RecruiterSchema: Schema<IRecruiter> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Recruiter = mongoose.model<IRecruiter>(
  "Recruiter",
  RecruiterSchema
);
