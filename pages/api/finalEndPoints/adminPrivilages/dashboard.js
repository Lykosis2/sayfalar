export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

}
