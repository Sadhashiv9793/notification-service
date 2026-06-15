import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  override: true,
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().default(5002),

  /**
   * PostgreSQL
   */
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  /**
   * Redis
   */
  REDIS_URL: z.string(),

  /**
   * RabbitMQ
   */
  RABBITMQ_URL: z.string(),

  /**
   * SMTP
   */
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),

  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),

  SMTP_FROM: z.string().email(),

  /**
   * Notification
   */
  NOTIFICATION_RETRY_ATTEMPTS: z.coerce.number().default(5),

  TEMPLATE_CACHE_TTL: z.coerce.number().default(3600),

  /**
   * API
   */
  API_PREFIX: z.string().default("/api/v1"),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  );

  process.exit(1);
}

export const env = parsedEnv.data;