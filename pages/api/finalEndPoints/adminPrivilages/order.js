import OrderModel from '@/models/order'
import { getAdminSession } from '../../../../lib/admin/session'

async function editOrder(orderUpdateOpts) {
  const orderModel = await OrderModel()
  console.log(orderUpdateOpts);
  const updatedOrder = await orderModel.update({status:orderUpdateOpts.status,followNumber:orderUpdateOpts.trackingNumber}, { where: { id:orderUpdateOpts.orderId } }).catch((err) => { 
    console.log(err);
  }
  )
  return updatedOrder
}

export default async function handler(req, res) {
  if(req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  console.log(req.headers.userId, req.headers.randomStr);
  const session = await getAdminSession(req.headers.userid, req.headers.randomstr)
  console.log(session);
  if (!session) {
    return res.status(401).end() // Unauthorized
  }
  switch (req.method) {
    case 'PATCH':
      await PATCH(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}

async function PATCH(req, res) {
  const updatedOrder = await editOrder(req.body)
  res.status(200).json({ updatedOrder })
}
