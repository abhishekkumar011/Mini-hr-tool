import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { applyLeave } from "../controllers/leave.controllers.js";

const router = Router();

router.post("/", verifyJWT, applyLeave);

export default router;
