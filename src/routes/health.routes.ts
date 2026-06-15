import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get("/", (_req, res) => {
  res.status(200).json({
    service: "notification-service",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;