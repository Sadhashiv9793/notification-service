import { Router } from "express";

import notificationController from "../controllers/notification.controller";

const router = Router();

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