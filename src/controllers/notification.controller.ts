import { Request, Response } from "express";

import notificationService from "../services/notification.service";
import { string } from "zod";

export class NotificationController {
  async create(
    req: Request,
    res: Response
  ): Promise<void> {
    const notification =
      await notificationService.createNotification(
        req.body
      );

    res.status(201).json({
      success: true,
      data: notification,
    });
  }

  async getById(
    req: Request,
    res: Response
  ): Promise<void> {
    const notification =
      await notificationService.getNotification(
        req.params.id as string
      );

    if (!notification) {
      res.status(404).json({
        success: false,
        message:
          "Notification not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  }

  async getUserNotifications(
    req: Request,
    res: Response
  ): Promise<void> {
    const notifications =
      await notificationService.getUserNotifications(
        req.params.userId as string
      );

    res.status(200).json({
      success: true,
      data: notifications,
    });
  }

  async updateStatus(
    req: Request,
    res: Response
  ): Promise<void> {
    await notificationService.updateStatus(
      req.params.id as string,
      req.body.status as string
    );

    res.status(200).json({
      success: true,
      message:
        "Status updated successfully",
    });
  }

  async sendWelcomeEmail(
    req: Request,
    res: Response
  ): Promise<void> {
    const {
      tenantId,
      email,
      userName,
    } = req.body;

    const result =
      await notificationService.sendWelcomeEmail(
        tenantId as string,
        email as string,
        userName as string
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
}

export default new NotificationController();