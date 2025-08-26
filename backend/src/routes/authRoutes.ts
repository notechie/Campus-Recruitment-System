import express from "express";
import { getProfile, login, logout, register } from "../controllers/UserControllers";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/register", register as express.RequestHandler);
router.post("/login", login as express.RequestHandler);
router.post("/logout", authenticate, logout as express.RequestHandler);
router.get("/profile/:userId",authenticate , getProfile as express.RequestHandler);

export default router;

