import { Request, Response } from "express";

import templateService from "../services/template.service";

export class TemplateController {
  async create(
    req: Request,
    res: Response
  ): Promise<void> {
    const template =
      await templateService.createTemplate(
        req.body
      );

    res.status(201).json({
      success: true,
      data: template,
    });
  }

  async getAll(
    _req: Request,
    res: Response
  ): Promise<void> {
    const templates =
      await templateService.getAllTemplates();

    res.status(200).json({
      success: true,
      data: templates,
    });
  }
}

export default new TemplateController();