import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { markAttendance } from "../controllers/attendance.controller.js";
import { requireEmployee } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", verifyJWT, requireEmployee, markAttendance);

export default router;
