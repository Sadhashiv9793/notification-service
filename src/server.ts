import http from "http";

import app from "./app";

import sequelize, {connectDatabase} from "./config/database";
import redis from "./config/redis";
import { connectRabbitMQ } from "./config/rabbitmq";
import { verifyMailConnection } from "./config/mail";


import { env } from "./config/env";

console.log(" Secret Environment Variables Loaded: ", env);

const startServer = async (): Promise<void> => {
  try {
    /**
     * PostgreSQL
     */
    await connectDatabase();

    /**
     * SMTP
     */
    await verifyMailConnection();

    /**
     * Redis
     */
    try {
      await redis.ping();

      console.log("✅ Redis Connected");
    } catch (error) {
      console.warn("⚠️ Redis Not Available");
    }

    /**
     * RabbitMQ
     */
    try {
      await connectRabbitMQ();

      console.log("✅ RabbitMQ Connected");
    } catch (error) {
      console.warn("⚠️ RabbitMQ Not Available");
    }

    /**
     * Sync Models
     * Development Only
     */
    if (env.NODE_ENV === "development") {
      await sequelize.sync({
        alter: false,
      });

      console.log("✅ Database Synced");
    }

    /**
     * HTTP Server
     */
    const server = http.createServer(app);

    server.listen(env.PORT, () => {
      console.log(
        `🚀 Notification Service running on port ${env.PORT}`
      );

      console.log(
        `📚 Swagger Docs: http://localhost:${env.PORT}/api-docs`
      );
    });

    /**
     * Graceful Shutdown
     */
    process.on("SIGTERM", async () => {
      console.log("SIGTERM received");

      await sequelize.close();

      server.close(() => {
        console.log("Server Closed");

        process.exit(0);
      });
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received");

      await sequelize.close();

      server.close(() => {
        console.log("Server Closed");

        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Startup Failed", error);

    process.exit(1);
  }
};

startServer();