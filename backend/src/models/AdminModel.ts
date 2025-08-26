import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  user: mongoose.Types.ObjectId; 
  addedBy: mongoose.Types.ObjectId; 
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      unique: true 
    },
    addedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Admin", 
      required: true 
    }, 
  },
  { timestamps: true }
);

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
