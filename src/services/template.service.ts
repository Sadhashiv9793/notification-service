import templateRepository from "../repositories/template.repository";

import redis from "../config/redis";

export class TemplateService {
  async getTemplate(
    tenantId: string | null,
    templateName: string
  ) {
    const cacheKey =
      `template:${tenantId}:${templateName}`;

    const cached =
      await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const template =
      await templateRepository.findByTemplateName(
        tenantId,
        templateName
      );

    if (!template) {
      throw new Error(
        "Template not found"
      );
    }

    await redis.set(
      cacheKey,
      JSON.stringify(template),
      "EX",
      3600
    );

    return template;
  }

  async createTemplate(
    payload: any
  ) {
    return templateRepository.create(
      payload
    );
  }

  async getAllTemplates() {
    return templateRepository.findAll();
  }
}

export default new TemplateService();