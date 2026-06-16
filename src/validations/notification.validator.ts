import { z } from "zod";

export const createNotificationSchema = z.object({
  tenantId: z.string().uuid(),

  userId: z
    .string()
    .uuid()
    .optional(),

  type: z.string().min(1),

  channel: z.enum([
    "EMAIL",
    "SMS",
    "PUSH",
    "WEBHOOK",
  ]),

  subject: z.string().min(1),

  content: z.string().min(1),
});

export type CreateNotificationDto =
  z.infer<
    typeof createNotificationSchema
  >;