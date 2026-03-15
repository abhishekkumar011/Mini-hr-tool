import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { applyLeave, getMyLeaves } from "../controllers/leave.controllers.js";

const router = Router();

router.post("/", verifyJWT, applyLeave);
router.get("/my", verifyJWT, getMyLeaves);

export default router;
