import mongoose, { Document, Schema } from "mongoose";
import { truncate } from "node:fs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "recruiter" | "admin";
  createdAt: Date;
  address:string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true
    }    
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
