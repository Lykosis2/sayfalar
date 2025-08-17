import { verifyAdminJwt } from '../jwt'

export default async function verifyAdmin(req, res) {
  const verified2fa = await verify2fa(req, res)
  if (!verified2fa)
    return false

  const verifyJwt = await verifyAdminJwt()
  if (!verifyJwt)
    return false

  return true
}
