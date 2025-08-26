import { Request, Response } from "express";
import { Application } from "../models/ApplicationModel";
import { Job } from "../models/JobModel";

//  Apply to a Job
export const applyToJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const { jobId } = req.body;
        const studentId = (req as any).user.userId; 

        const job = await Job.findById(jobId);
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }

        const existingApplication = await Application.findOne({ student: studentId, job: jobId });
        if (existingApplication) {
            res.status(400).json({ message: "You have already applied for this job" });
            return;
        }

        const application:any = await Application.create({ student: studentId, job: jobId });

        job.applications.push(application._id);
        await job.save();

        res.status(201).json({ message: "Application submitted successfully", application });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// 🛑 Cancel an Application
export const cancelApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { applicationId } = req.params;
        const studentId = (req as any).user.userId;

        const application = await Application.findById(applicationId);
        if (!application) {
            res.status(404).json({ message: "Application not found" });
            return;
        }

        if (application.student.toString() !== studentId.toString()) {
            res.status(403).json({ message: "Unauthorized: You can only cancel your own applications" });
            return;
        }

        await application.deleteOne();

        // Remove application from the job listing
        await Job.findByIdAndUpdate(application.job, { $pull: { applications: application._id } });

        res.status(200).json({ message: "Application cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Approve an Application (Recruiter Only)
export const approveApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { applicationId } = req.params;
        const recruiterId = (req as any).user.userId;

        const application = await Application.findById(applicationId).populate("job");
        if (!application) {
            res.status(404).json({ message: "Application not found" });
            return;
        }

        const job = application.job as any;
        if (job.postedBy.toString() !== recruiterId.toString()) {
            res.status(403).json({ message: "Unauthorized: You can only approve applications for your jobs" });
            return;
        }

        application.status = "accepted";
        await application.save();

        res.status(200).json({ message: "Application approved", application });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

//  Reject an Application (Recruiter Only)
export const rejectApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { applicationId } = req.params;
        const recruiterId = (req as any).user.userId;

        const application = await Application.findById(applicationId).populate("job");
        if (!application) {
            res.status(404).json({ message: "Application not found" });
            return;
        }

        const job = application.job as any;
        if (job.postedBy.toString() !== recruiterId.toString()) {
            res.status(403).json({ message: "Unauthorized: You can only reject applications for your jobs" });
            return;
        }

        application.status = "rejected";
        await application.save();

        res.status(200).json({ message: "Application rejected", application });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

//  Get All Applications for a Job (Recruiter Only)
export const getJobApplications = async (req: Request, res: Response): Promise<void> => {
    try {
        const { jobId } = req.params;
        const recruiterId = (req as any).user.userId;

        const job = await Job.findById(jobId).populate("applications");
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }

        if (job.postedBy.toString() !== recruiterId.toString()) {
            res.status(403).json({ message: "Unauthorized: You can only view applications for your jobs" });
            return;
        }

        res.status(200).json({ applications: job.applications });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// verify
export const getApplicantsByJobId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { jobId } = req.params;
        const recruiterId = (req as any).user.userId;

        const job = await Job.findById(jobId).populate("applications");
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }

        if (job.postedBy.toString() !== recruiterId.toString()) {
            res.status(403).json({ message: "Unauthorized: You can only view applications for your jobs" });
            return;
        }

        res.status(200).json({ applications: job.applications });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

// Get All Applications by Student ID
export const getApplicationsByStudentId = async (req: Request, res: Response): Promise<void> => {
    try {
        const studentId = (req as any).user.userId;

        const applications = await Application.find({ student: studentId }).populate("job");
        if (!applications) {
            res.status(404).json({ message: "No applications found for this student" });
            return;
        }

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}