import locker from '@/lib/providers/locker'
import minioClient from '@/lib/providers/minio'

export default async function handler(req, res) {
    if(req.method === "OPTIONS") return res.status(204).end()
  
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

  switch (req.method) {
    case 'POST':
      return res.status(200).json({ message: 'ok' })
    case 'GET':
      return res.status(200).json({ message: 'ok' })
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)))
    stream.on('error', err => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

