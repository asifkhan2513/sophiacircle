import { redis, connectRedis } from "./redis";
type CacheOptions = {
  ttlSeconds?: number;
};
export async function getCache<T>(key: string): Promise<T | null> {
  await connectRedis();
  const value = await redis.get(key);
  if (!value) return null;
  return JSON.parse(value) as T;
}
export async function setCache(
  key: string,
  value: unknown,
  options: CacheOptions = {}
) {
  await connectRedis();

  const json = JSON.stringify(value);

  if (options.ttlSeconds) {
    await redis.set(key, json, {
      EX: options.ttlSeconds,
    });
    return;
  }

  await redis.set(key, json);
}

export async function deleteCache(key: string) {
  await connectRedis();
  await redis.del(key);
}

export async function deleteCachePattern(pattern: string) {
  await connectRedis();
  let cursor: any = 0;
  do {
    const reply = await redis.scan(cursor, { MATCH: pattern, COUNT: 100 });
    cursor = reply.cursor;
    const keys = reply.keys;
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } while (cursor !== 0 && cursor !== "0");
}
