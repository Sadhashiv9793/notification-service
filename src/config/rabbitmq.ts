import amqp from "amqplib";
import { env } from "./env";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    env.RABBITMQ_URL
  );

  channel = await connection.createChannel();

  return channel;
};

export const getChannel = () => {
  if (!channel) {
    throw new Error(
      "RabbitMQ channel not initialized"
    );
  }

  return channel;
};