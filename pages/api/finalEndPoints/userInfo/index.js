import getServerSession from '@/lib/getServerSession'
import UserModel from '@/models/user'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return GET(req, res)
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function GET(req, res) {
  const session = await getServerSession(req, res)

  if (!session) {
    return res.status(401).json({
      error: 'Unauthorized',
    })
  }

  const userModel = await UserModel()
  const user = await userModel.findOne({ where: { id: session.payload.id } })
  const { password, ...userWithoutPassword } = user.dataValues

  return res.status(200).json({
    ...userWithoutPassword,
  })
}
