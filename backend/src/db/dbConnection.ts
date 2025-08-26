import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/campus-recruitment";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log("Database Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;