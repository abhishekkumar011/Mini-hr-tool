import express from "express";

const app = express();

app.use(express.json());

import authRoutes from "./routes/auth.routes.js";

app.use("/api/v1/auth", authRoutes);

export { app };
