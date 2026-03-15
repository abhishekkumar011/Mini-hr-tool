import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getMyAttendance,
  markAttendance,
} from "../controllers/attendance.controller.js";
import { requireEmployee } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", verifyJWT, requireEmployee, markAttendance);
router.get("/my", verifyJWT, requireEmployee, getMyAttendance);

export default router;
