import minioClient from '@/lib/providers/minio'
import { getAdminSession } from '../../../../../lib/admin/session';
import userWeeklyMonthlyTable from '../../../../../models/userWeeklyMonthlyTable';
import pLimit from 'p-limit';

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

// /api/finalEndPoints/adminPrivilages/download-bonus/kariyerBonusu
// /api/finalEndPoints/adminPrivilages/download-bonus/liderlikBonusu
// /api/finalEndPoints/adminPrivilages/download-bonus/otherPays
async function GET(req, res) {
    const UserWeeklyMonthlyTable = userWeeklyMonthlyTable()
    const all = await UserWeeklyMonthlyTable.findAll()
    const parsedAll = []
    all.forEach((item)=>{
        parsedAll.push(item.dataValues) 
    })
   
  const initialLine = 'user_id,saleAccount_id,self_gained_point1,active,real_point1,title,date\n'
  let csvContent = initialLine

  const limit = pLimit(1000)
  const asyncerror = await Promise.all(parsedAll.map(
    async (item) => {
      return await limit(async () => {
        try {
          const thisLine = `${item.user_id},${item.saleAccount_id},${item.self_gained_point1},${item.active},${item.real_point1},${item.title},${item.date}\n`
          csvContent += thisLine
        } catch (error) {
          console.log(error)
        }
      })
    }
  ).join('\n'))
  
  csvContent +=asyncerror


  res.setHeader('Content-Type', 'text/csv')
  return res.status(200).send(csvContent)
}
