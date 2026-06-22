import { Queue } from "bullmq";

import { env } from "../config/env";

export const notificationQueue =
    new Queue("notification-queue", {
        connection: {
            host: "localhost",
            port: 6379,
        },

        defaultJobOptions: {
            attempts:
                env.NOTIFICATION_RETRY_ATTEMPTS,

            backoff: {
                type: "exponential",
                delay: 1000,
            },

            removeOnComplete: 100,

            removeOnFail: 500,
        },
    });

export default notificationQueue;