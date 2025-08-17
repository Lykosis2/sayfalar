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

  // Make admin auth
  const payload = getServerSession(req, res) // ADMIN AUTH
  if (!payload.payload)
    return res.status(401).json({ message: 'Unauthorized' })
  if (payload.payload.id !== id)
    return res.status(401).json({ message: 'Unauthorized' })

  const usersSaleAccount = await SaleAccount.findAll()
  if (!usersSaleAccount)
    return res.status(404).json({ message: 'Sale Account not found' })
  return res.status(200).json({ saleAccount: usersSaleAccount })
}
