import { getServerSession } from 'next-auth'
import { adminOpts } from '@/middleware'
import OrderModel from '@/models/order'
import { getAdminSession } from '@/lib/admin/session'
import { Op } from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export default async function handler(req, res) {
  console.log(res);
  if(req.method === "OPTIONS") return res.status(204).end()
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
console.log(session);

  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

  try {
    switch (req.method) {
      case 'GET':
        await GET(req, res)
        break
      default:
        res.status(405).end() // Method Not Allowed
        break
    }
  }
  catch (e) {
    console.log(e)
    res.status(500).end()
  }
}

async function GET(req, res) {
  try{
    const orderModel = await OrderModel()
    const retunVal = []
    if (req.query.id) {
      const order = await orderModel.findOne({ where: { id: req.query.id } })
      res.status(200).json({ order: order.dataValues })
      return
    }
    const now = new Date();
    const threeMonthsAgo = new Date(now - (90 * 24 * 60 * 60 * 1000)); // 90 days ago
  
    const orders = await orderModel.findAll({
      where:{
        createdAt:{
          [Op.gte]:threeMonthsAgo
        }
      },
      order: sequelize.literal('CASE WHEN status = 2 THEN 0 ELSE 1 END, createdAt DESC')
    })
    orders.forEach((order) => {
      retunVal.push(order.dataValues)
    }
    )
    res.status(200).json({ orders: retunVal })
  }
  catch(e){
    console.log(e);
    res.status(500).end()
  }
}
