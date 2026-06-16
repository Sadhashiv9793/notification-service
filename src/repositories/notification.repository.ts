import Notification from "../models/notification.model";

import {
  NotificationAttributes,
  NotificationCreationAttributes,
} from "../models/notification.model";

export class NotificationRepository {
  async create(
    payload: NotificationCreationAttributes
  ): Promise<Notification> {
    return Notification.create(payload);
  }

  async findById(
    id: string
  ): Promise<Notification | null> {
    return Notification.findByPk(id);
  }

  async findByUserId(
    userId: string
  ): Promise<Notification[]> {
    return Notification.findAll({
      where: {
        userId,
      },

      order: [["createdAt", "DESC"]],
    });
  }

  async findByTenantId(
    tenantId: string
  ): Promise<Notification[]> {
    return Notification.findAll({
      where: {
        tenantId,
      },

      order: [["createdAt", "DESC"]],
    });
  }

  async updateStatus(
    id: string,
    status: string
  ): Promise<void> {
    await Notification.update(
      {
        status,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  async delete(
    id: string
  ): Promise<number> {
    return Notification.destroy({
      where: {
        id,
      },
    });
  }
}

export default new NotificationRepository();