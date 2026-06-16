import axios from "axios";

import webhookRepository from "../repositories/webhook.repository";

import logger from "../config/logger";

export class WebhookService {
  async sendWebhook(
    url: string,
    payload: object
  ) {
    const log =
      await webhookRepository.create({
        url,
        requestBody: payload,
        retryCount: 0,
      });

    try {
      const response =
        await axios.post(
          url,
          payload
        );

      await webhookRepository.updateResponse(
        log.id,
        response.data,
        response.status
      );

      return response.data;
    } catch (error: any) {
      await webhookRepository.incrementRetryCount(
        log.id
      );

      logger.error(
        `Webhook Failed: ${error.message}`
      );

      throw error;
    }
  }
}

export default new WebhookService();