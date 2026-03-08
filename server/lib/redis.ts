import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const redis = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
  },
});

redis.on("error", (err) => {
  // Suppress "Socket already opened" noise — it's handled in connectRedis()
  if (err?.message?.includes("Socket already opened")) return;
  console.error("Redis Client Error:", err.message);
});

redis.on("connect", () => console.log("Redis connected"));
redis.on("reconnecting", () => console.log("Redis reconnecting..."));
redis.on("end", () => console.log("Redis connection closed"));

export async function connectRedis(): Promise<void> {
  // Use the actual socket state — not a manual flag that can get out of sync
  if (redis.isOpen || redis.isReady) return;

  try {
    await redis.connect();
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("Socket already opened")) {
      // Already connected — safe to ignore
      return;
    }
    throw err;
  }
}
