import { getAdminSession } from "../../../../lib/admin/session";
import redis from "../../../../lib/providers/redis";
import locker from "../../../../lib/providers/locker";

export default async function handler(req, res) {
    if(req.method === "OPTIONS") return res.status(204).end()
    if(req.method !== 'POST') return res.status(405).end()
  console.log(req.headers.userid,req.headers.randomstr);
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  console.log(session);
    if (!session || !session.superAdmin) return res.status(401).json({ error: 'Unauthorized' })

    let body = req.body
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body)
        } catch (e) {
            return res.status(400).json({ error: 'Invalid JSON' })
        }
    }

    const {panic} = body
    console.log(panic);

    if (panic) {
        await locker.lock("importantpanic", 60 * 1000 * 60 * 24 * 365)
    } else {
        await locker.unlock('importantpanic')
    }
    const locks = await locker.showAllLocks()
    console.log(locks);


    return res.status(200).json({message:'success'})
}