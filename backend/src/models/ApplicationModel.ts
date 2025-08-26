import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  student: mongoose.Types.ObjectId; // Student User who applied
  job: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  appliedAt: Date;
}

const ApplicationSchema: Schema<IApplication> = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
