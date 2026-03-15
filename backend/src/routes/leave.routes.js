import { Router } from "express";
import {
  applyLeave,
  cancelLeave,
  getMyLeaves,
} from "../controllers/leave.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, applyLeave);
router.get("/my", verifyJWT, getMyLeaves);
router.delete("/:id", verifyJWT, cancelLeave);

export default router;
