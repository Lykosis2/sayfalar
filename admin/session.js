import redis from '../providers/redis'

const sessionTimeout = 60 * 60 * 1000 // 1 hour

export async function createAdminSession(userId, superAdmin) {
  const randomStr = Math.random().toString(36).slice(2)
  const sessionKey = `admin-session:${userId}:${randomStr}`
  const session = {
    userId,
    randomStr,
    superAdmin,
    createdAt: Date.now(),
  }

  await redis.set(sessionKey, JSON.stringify(session), 'PX', sessionTimeout)
  return session
}

export function createAdminSessionFromUser(user) {
  return createAdminSession(user?.dataValues.id, user?.dataValues.superAdmin, user.token)
}

export async function getAdminSession(userId, randomStr, doNotExtend = false) {
  const sessionKey = `admin-session:${userId}:${randomStr}`
  const all = await redis.keys("*")
  const session = await redis.get(sessionKey)
  if (!session) {
    return null
  }

  // Renew session
  if (!doNotExtend) {
    await redis.set(sessionKey, session, 'PX', sessionTimeout)
  }

  return JSON.parse(session)
}

export async function deleteAdminSession(userId, randomStr) {
  const sessionKey = `admin-session:${userId}:${randomStr}`
  await redis.del(sessionKey)
}

export async function deleteAllAdminUserSessions(userId) {
  const sessionKeys = await redis.keys(`admin-session:${userId}:*`)
  await redis.del(...sessionKeys)
}