import Redis from 'ioredis'

export default class LockManager {
  /**
   * Constructs a LockManager instance.
   * @param {string} redisUrl - The URL of the Redis instance.
   */
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number.parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD || 'redis',
      db: Number.parseInt(process.env.REDIS_DB || '0', 10),
    })
  }

  /**
   * Attempts to acquire a lock.
   * @param {string} key - The key to lock on.
   * @param {number} timeout - The lock timeout in milliseconds.
   * @returns {Promise<boolean>} True if the lock was acquired, false otherwise.
   */
  async lock(key, timeout) {
    const result = await this.redis.set(`lock:${key}`, 'LOCKED', 'NX', 'PX', timeout)
    return result === 'OK'
  }

  async showAllLocks() {
    const result = await this.redis.keys('lock:*')
    return result
  }

  async flag(key) {
    const result = await this.redis.set(`flaged-${key}`, 'LOCKED', 'NX', 'PX', 1000 * 60 * 60 * 24 * 7)
    return result === 'OK'
  }

  async unflag(key) {
    const result = await this.redis.del(`flaged-${key}`)
    return result === 1
  }

  /**
   * Attempts to acquire a lock, retrying at specified intervals until successful.
   * @param {string} key - The key to lock on.
   * @param {number} timeout - The lock timeout in milliseconds.
   * @param {number} retryInterval - The interval between retry attempts in milliseconds.
   * @returns {Promise<void>}
   */
  async lockAndWait(key, timeout = 60 * 1000, retryInterval = 1000) {
    let acquired = false
    while (!acquired) {
      acquired = await this.lock(`lock:${key}`, timeout)
      if (!acquired) {
        // console.log('Lock not acquired, retrying...')
        await new Promise(resolve => setTimeout(resolve, retryInterval))
      }
    }
    // console.log('Lock acquired')
  }

  /**
   * Renews a lock by extending its expiration time.
   * @param {string} key - The key of the lock to renew.
   * @param {number} timeout - The new lock timeout in milliseconds.
   * @returns {Promise<boolean>} True if the lock was renewed, false otherwise.
   */
  async renew(key, timeout) {
    // Check if the lock still exists and is owned by this instance
    const isLocked = await this.redis.get(`lock:${key}`) === 'LOCKED'
    if (isLocked) {
      // If so, update the lock's expiration time
      const result = await this.redis.pexpire(`lock:${key}`, timeout)
      return result === 1
    }
    // If the lock no longer exists or is owned by another instance, return false
    return false
  }

  /**
   * Releases a lock.
   * @param {string} key - The key to unlock.
   * @returns {Promise<void>}
   */
  async unlock(key) {
    await this.redis.del(`lock:${key}`)
  }

  /**
    * Returns whether lock is present or not.
    * @param {string} key - The key to be checked against.
    * @returns {Promise<boolean>}
    */
  async isLocked(key) {
    return await this.redis.get(`lock:${key}`) === 'LOCKED'
  }

  /**
   * Closes the Redis connection.
   * @returns {Promise<void>}
   */
  async close() {
    await this.redis.quit()
  }
}
