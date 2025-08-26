import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/UserModel";
import { Student } from "../models/StudentModel";
import { Recruiter } from "../models/RecruiterModel";
import jwt from "jsonwebtoken";
import { profile } from "node:console";
const JWT_SECRET: string = process.env.JWT_SECRET || "secret";
// In the login page form fields will be decided based on the role of the user.
// If the user is a student, the form will have fields like roll number, department, cgpa, skills, etc.
// If the user is a recruiter, the form will have fields like company name, industry, etc.
// The register function will take the user details and based on the role, it will save the user details in the respective collection.
// If the role is student, it will save the user details in the student collection.
// If the role is recruiter, it will save the user details in the recruiter collection.
// The user details will be saved in the user collection.
export const register = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const {
    name,
    email,
    password,
    address,
    role,
    rollNumber,
    department,
    cgpa,
    skills,
    companyName,
    industry,
  } = req.body;

  if (!name || !email || !password || !role || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (role !== "student" && role !== "recruiter") {
    return res.status(400).json({
      message: "Invalid role. Only 'student' and 'recruiter' are allowed.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });
    await user.save();
    console.log(user);
    if (role === "student") {
      if (!rollNumber || !department || !cgpa) {
        return res
          .status(400)
          .json({ message: "Missing required student details." });
      }
      await new Student({
        userId: user._id,
        rollNumber,
        department,
        cgpa,
        skills: skills || [],
        placementStatus: "not placed",
      }).save();
    } else if (role === "recruiter") {
      if (!companyName || !industry) {
        return res
          .status(400)
          .json({ message: "Missing required recruiter details." });
      }
      await new Recruiter({
        userId: user._id,
        companyName,
        industry,
      }).save();
    }

    res.status(201).json({ message: "User registered successfully", ...user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error?.message });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
export const logout = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getProfile = async (req: any, res: any) => {
    try {
      const userId = req.params.userId; 
      // console.log(userId);
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      
      const user = await User.findById(userId).select("-password");
      console.log("user")
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      type pdata = {
        user:any,
        recruiter?:any,
        student?:any
      }
      let profileData: pdata = { user};
      
      if (user.role === "student") {
        const studentProfile = await Student.findOne({ userId: user._id });
        if (!studentProfile) {
          return res.status(404).json({ message: "Student profile not found" });
        }
        profileData.student = studentProfile;
      }
  
      if (user.role === "recruiter") {
        // console.log("Recruiter:")
        const recruiterProfile = await (Recruiter as any ).findOne({ userId: user._id }) ;
        // console.log(recruiterProfile)
        if (!recruiterProfile) {
          return res.status(404).json({ message: "Recruiter profile not found" });
        }
        // console.log(user , recruiterProfile)
        profileData.recruiter = recruiterProfile;
        // console.log(profileData)
      }
  
      res.status(200).json(profileData);
    } catch (error:any) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
  
