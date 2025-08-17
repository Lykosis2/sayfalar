import getServerSession from '@/lib/getServerSession'
import saleAccount from '@/models/saleAccount'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await GET(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
async function GET(req, res) {
  // User to saleAccount part
  // send here a request after orders openSaleAccount is true be careful of CORS and block other requests to this endpoint
  const SaleAccount = saleAccount()
  const id = req.query.id
  const session = getServerSession(req, res)
  if (!session)
    return res.status(401).json({ message: 'Unauthorized' })
  if (session.id !== id)
    return res.status(401).json({ message: 'Unauthorized' })
  const usersSaleAccount = await SaleAccount.findOne({ where: { id } })
  if (!usersSaleAccount)
    return res.status(404).json({ message: 'Sale Account not found' })
  return res.status(200).json({ saleAccount: usersSaleAccount })
}
