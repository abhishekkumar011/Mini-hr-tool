import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role.middleware.js";
import { getEmployees } from "../controllers/admin.controller.js";

const router = Router();

router.get("/employees", verifyJWT, requireAdmin, getEmployees);

export default router;
