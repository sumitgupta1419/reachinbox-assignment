
import pool from "./config/database";
import express from "express";
import cors from "cors";
import redisConnection from "./config/redis";
import emailRoutes from "./routes/emailRoutes";

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (_req, res) => {
  res.json({
    message: "ReachInbox Backend is running",
  });
});

// Health check route
app.get("/api/health", async (_req, res) => {
  try {
    // Check PostgreSQL database
    const result = await pool.query("SELECT NOW()");

    // Check Redis
    const redisStatus = await redisConnection.ping();

    res.json({
      status: "ok",
      message: "ReachInbox API is healthy",
      database: "connected",
      time: result.rows[0].now,
      redis: redisStatus,
    });
  } catch (error) {
    console.error("Health check failed:", error);

    res.status(500).json({
      status: "error",
      message: "Health check failed",
      database: "not connected",
      redis: "not connected",
    });
  }
});

// Email routes
app.use("/api/emails", emailRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

