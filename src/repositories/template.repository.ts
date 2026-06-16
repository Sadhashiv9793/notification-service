import NotificationTemplate from "../models/notification-template.model";

import {
  NotificationTemplateCreationAttributes,
} from "../models/notification-template.model";

export class TemplateRepository {
  async create(
    payload: NotificationTemplateCreationAttributes
  ): Promise<NotificationTemplate> {
    return NotificationTemplate.create(payload);
  }

  async findById(
    id: string
  ): Promise<NotificationTemplate | null> {
    return NotificationTemplate.findByPk(id);
  }

  async findByTemplateName(
    tenantId: string | null,
    templateName: string
  ): Promise<NotificationTemplate | null> {
    return NotificationTemplate.findOne({
      where: {
        tenantId,
        templateName,
      },
    });
  }

  async findAll(): Promise<
    NotificationTemplate[]
  > {
    return NotificationTemplate.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async update(
    id: string,
    payload: Partial<NotificationTemplate>
  ): Promise<void> {
    await NotificationTemplate.update(
      payload,
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
    return NotificationTemplate.destroy({
      where: {
        id,
      },
    });
  }
}

export default new TemplateRepository();