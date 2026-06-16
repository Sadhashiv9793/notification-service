import { z } from "zod";

export const createTemplateSchema =
  z.object({
    tenantId: z
      .string()
      .uuid()
      .optional(),

    templateName: z
      .string()
      .min(3),

    subject: z.string().min(1),

    body: z.string().min(1),
  });

export type CreateTemplateDto =
  z.infer<
    typeof createTemplateSchema
  >;