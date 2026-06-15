import Redis from "ioredis";
import { env } from "./env";

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.on("error", (error) => {
  console.error("❌ Redis Error:", error.message);
});

export default redis;