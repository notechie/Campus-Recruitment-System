import express from "express";
import { postJob , getJobs, updateJob, deleteJob } from "../controllers/JobControllers";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/",authenticate , authorizeRoles(["recruiter"]), postJob);
router.get("/", authenticate , authorizeRoles(["recruiter" , "student"]), getJobs);
router.put("/:id",authenticate, authorizeRoles(["recruiter"]), updateJob);
router.delete("/:id",authenticate , authorizeRoles(["recruiter"]), deleteJob);


export default router;
