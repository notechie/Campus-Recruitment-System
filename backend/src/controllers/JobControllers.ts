import { Request, Response } from "express";
import { Job, IJob } from "../models/JobModel";

// Create a new job (accessible only by recruiters)
const postJob = async (req: any, res: Response): Promise<void> => {
    try {
        const { title, company, description, salary, skillsRequired, jobType } = req.body;

        const newJob: IJob = new Job({
            title,
            company,
            postedBy: req.user.userId,
            description,
            salary,
            skillsRequired,
            jobType,
            postedAt: new Date(),
        });

        await newJob.save();
        res.status(201).json(newJob);
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
};

// Get all jobs
const getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobs = await Job.find().populate("postedBy", "name");
        res.status(200).json(jobs);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

// Update a job by ID (accessible only by recruiters)
const updateJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        res.status(200).json(updatedJob);
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a job by ID (accessible only by recruiters)
const deleteJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export { postJob, getJobs, updateJob, deleteJob };
