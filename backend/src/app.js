import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import leaveRoutes from "./routes/leave.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/leaves", leaveRoutes);

export { app };
