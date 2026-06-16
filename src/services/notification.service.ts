import notificationRepository from "../repositories/notification.repository";

import emailService from "./email.service";

import templateService from "./template.service";

export class NotificationService {
  async sendWelcomeEmail(
    tenantId: string,
    email: string,
    userName: string
  ) {
    const template =
      await templateService.getTemplate(
        tenantId,
        "welcome-email"
      );

    const html =
      template.body.replace(
        "{{name}}",
        userName
      );

    await emailService.send(
      email,
      template.subject,
      html
    );

    return notificationRepository.create({
      tenantId,

      type: "USER_CREATED",

      channel: "EMAIL",

      status: "SENT",

      subject: template.subject,

      content: html,
    });
  }

  async createNotification(
    payload: any
  ) {
    return notificationRepository.create(
      payload
    );
  }

  async getNotification(
    id: string
  ) {
    return notificationRepository.findById(
      id
    );
  }

  async getUserNotifications(
    userId: string
  ) {
    return notificationRepository.findByUserId(
      userId
    );
  }

  async updateStatus(
    id: string,
    status: string
  ) {
    return notificationRepository.updateStatus(
      id,
      status
    );
  }
}

export default new NotificationService();