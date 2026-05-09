import "dotenv/config";
import express from "express";
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";
import connectDB from "./src/config/db.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import historyRoutes from "./src/routes/historyRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { configDotenv } from "dotenv";

configDotenv();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const app = express();
const PORT = process.env.PORT || 5000;


await connectDB();

console.log("Connected to CLIENT_URL " + CLIENT_URL);
app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true, // Allow cookies/auth if needed
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
// Disabled local uploads directory for Vercel compatibility

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "AI Student Assistant API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/history", historyRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;