import WebhookLog from "../models/webhook-log.model";

import {
  WebhookLogCreationAttributes,
} from "../models/webhook-log.model";

export class WebhookRepository {
  async create(
    payload: WebhookLogCreationAttributes
  ): Promise<WebhookLog> {
    return WebhookLog.create(payload);
  }

  async findById(
    id: string
  ): Promise<WebhookLog | null> {
    return WebhookLog.findByPk(id);
  }

  async incrementRetryCount(
    id: string
  ): Promise<void> {
    const webhook =
      await WebhookLog.findByPk(id);

    if (!webhook) {
      return;
    }

    await webhook.update({
      retryCount:
        webhook.retryCount + 1,
    });
  }

  async updateResponse(
    id: string,
    responseBody: object,
    statusCode: number
  ): Promise<void> {
    await WebhookLog.update(
      {
        responseBody,
        statusCode,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  async findFailedWebhooks(): Promise<
    WebhookLog[]
  > {
    return WebhookLog.findAll({
      where: {
        statusCode: null,
      },
    });
  }
}

export default new WebhookRepository();