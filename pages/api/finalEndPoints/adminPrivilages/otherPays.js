import locker from '@/lib/providers/locker'
import minioClient from '@/lib/providers/minio'

export default async function handler(req, res) {
    if(req.method === "OPTIONS") return res.status(204).end()
  
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

  switch (req.method) {
    case 'POST':
      await POST(req, res)
      return res.status(200).json({ message: 'ok' })
    case 'GET':
      return res.status(200).json({ message: 'ok' })
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}

async function POST(req, res) {
 
}

