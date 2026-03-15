import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/leaves", leaveRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/admin", adminRoutes);

export { app };
