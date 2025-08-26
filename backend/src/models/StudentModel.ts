import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  userId: mongoose.Types.ObjectId;
  rollNumber: string;
  department: string;
  cgpa: number;
  skills: string[];
  placementStatus: "not placed" | "in process" | "placed";
}

const StudentSchema: Schema<IStudent> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    }, 
    rollNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    cgpa: { type: Number, required: true, min: 0, max: 10 },
    skills: { type: [String], required: true },
    placementStatus: {
      type: String,
      enum: ["not placed", "in process", "placed"],
      default: "not placed",
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
