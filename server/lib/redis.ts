import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
export const redis = createClient({
  url: redisUrl,
})

redis.on('error', (err) => {
  console.error('Redis Client Error', err)
})

let isConnected = false

export async function connectRedis() {
  if (!isConnected) {
    await redis.connect()
    isConnected = true
    console.log('Redis connected')
  }
}