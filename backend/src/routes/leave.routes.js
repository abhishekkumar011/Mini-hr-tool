import { Router } from "express";
import {
  applyLeave,
  cancelLeave,
  getMyLeaves,
} from "../controllers/leave.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requireEmployee } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", verifyJWT, requireEmployee, applyLeave);
router.get("/my", verifyJWT, requireEmployee, getMyLeaves);
router.delete("/:id", verifyJWT, requireEmployee, cancelLeave);

export default router;
