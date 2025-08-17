import { getServerSession } from 'next-auth'
import { adminOpts } from '@/middleware'
import SaleAccountModel from '@/models/saleAccount'
import UserModel from '@/models/user'
import order from '@/models/order'
import refund from '@/models/refund'
import { getAdminSession } from '@/lib/admin/session'
import hissedarBonusu from '@/models/hissedarBonusu'
import calculateIfThisMonth from '@/lib/calculateIfThisMonth'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
console.log(session);

  if (!session || !session.superAdmin)
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
  const dashboardData = {
    AylikSatis: 0, // TODO: 
    AylikPuan: 0, // TODO:
    UyeSayisi: 0,
    KullaniciSayisi: 0,
    AktifUyeSayisi: 0,
    ToplamSiparis: 0,
    ToplamIade: 0,
    HissedarBonusu: 0,
    BekleyenSiparis: 0,
  }

  const userModel = await UserModel()
  const saleAccountModel = await SaleAccountModel()
  const orders =  await order()
  const refunds = await refund()
  const HissedarBonusu = await hissedarBonusu()

  const allUsers = await userModel.findAll()
  const allSaleAccounts = await saleAccountModel.findAll()
  const allOrders = await orders.findAll()
  const allRefunds = await refunds.findAll()
  const hissedarBonusus = await HissedarBonusu.findByPk(1) 



  dashboardData.UyeSayisi = allSaleAccounts.length
  dashboardData.KullaniciSayisi = allUsers.length
  dashboardData.AktifUyeSayisi = allSaleAccounts.filter(sa => sa.active).length
  dashboardData.ToplamSiparis = allOrders.length
  dashboardData.ToplamIade = allRefunds.length
  dashboardData.HissedarBonusu = hissedarBonusus.this_months_money + " TL"
  ;
  dashboardData.AylikSatis =  allOrders.filter(order => calculateIfThisMonth(order.createdAt)).reduce((sum,order)=>sum+order.price*100,0)/100
  dashboardData.AylikPuan = allSaleAccounts.reduce((sum,acc)=>{
    if(acc.id !== '2582a601-956b-4076-a6b3-bd40e11df286' || acc.id !== "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || acc.id !== "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || acc.id !=="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a")
    return sum+acc.real_point1*100
  },0)/100
  dashboardData.BekleyenSiparis = allOrders.filter(order => order.status === 2).length

  res.status(200).json(dashboardData)


}

