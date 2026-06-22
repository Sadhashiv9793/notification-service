import { Router } from "express";

import notificationController from "../controllers/notification.controller";

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

/**
 * Create Notification
 */
router.post(
  "/",
  notificationController.create
);

/**
 * Welcome Email
 */
/**
 * @swagger
 * /api/v1/notifications/welcome-email:
 *   post:
 *     summary: Send welcome email
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: Email sent
 */
router.post(
  "/welcome-email",
  notificationController.sendWelcomeEmail
);

/**
 * Notification By Id
 */
router.get(
  "/:id",
  notificationController.getById
);

/**
 * User Notifications
 */
router.get(
  "/user/:userId",
  notificationController.getUserNotifications
);

/**
 * Update Status
 */
router.patch(
  "/:id/status",
  notificationController.updateStatus
);

export default router;