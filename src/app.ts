import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import { setupSwagger } from "./config/swagger";

// Routes
import healthRoutes from "./routes/health.routes";

const app: Application = express();

/**
 * Security
 */
app.use(helmet());

/**
 * CORS
 */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/**
 * Body Parser
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * Compression
 */
app.use(compression());

/**
 * Logging
 */
app.use(morgan("dev"));

/**
 * Health
 */
app.use("/health", healthRoutes);

/**
 * Notification APIs
 */
app.use("/api/v1/notifications", (_req, res) => {
  res.json({
    message: "Notification Route",
  });
});

app.use("/api/v1/templates", (_req, res) => {
  res.json({
    message: "Template Route",
  });
});

/**
 * Swagger
 */
setupSwagger(app);

/**
 * 404
 */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;