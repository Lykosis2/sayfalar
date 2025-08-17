import minioClient from '@/lib/providers/minio'
import { getAdminSession } from '../../../../../lib/admin/session';

export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  console.log(req.headers.userid,req.headers.randomstr);
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  console.log(session);
if (!session)
  return res.status(401).json({ error: 'Unauthorized' })

  switch (req.method) {
    case 'GET':
      return GET(req, res)
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}
  
async function GET(req, res) {
  const sendedCsv = await minioClient.getObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/hissedarBonusu/this_months.csv")
  res.setHeader('Content-Type', 'text/csv')
  return res.status(200).send(sendedCsv)
}
