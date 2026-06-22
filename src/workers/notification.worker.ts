import { Worker } from "bullmq";

import emailService from "../services/email.service";

const worker = new Worker(
    "notification-queue",

    async (job) => {
        const {
            to,
            subject,
            html,
        } = job.data;

        await emailService.send(
            to,
            subject,
            html
        );
    },

    {
        connection: {
            host: "localhost",
            port: 6379,
        },
    }
);

worker.on("completed", (job) => {
    console.log(
        `✅ Job Completed: ${job.id}`
    );
});

worker.on("failed", (job, error) => {
    console.error(
        `❌ Job Failed: ${job?.id}`,
        error.message
    );
});

export default worker;