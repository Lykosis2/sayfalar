import process from 'node:process'
import Redis from 'ioredis'

export default new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number.parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || 'redis',
  db: Number.parseInt(process.env.REDIS_DB || '0', 10),
})
