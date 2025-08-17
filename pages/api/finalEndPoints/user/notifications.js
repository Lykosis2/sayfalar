import getServerSession from '@/lib/getServerSession'
import locker from '@/lib/providers/locker'
import UserModel from '@/models/user'

export default async function handler(req, res) {
  const session = await getServerSession(req, res)
  if (!session)
    return res.status(401).send('Unauthorized')

  switch (req.method) {
    case 'GET':
      return GET(req, res, session)
    case 'POST':
      return POST(req, res, session)
    default:
      return res.status(405).send('Method not allowed')
  }
}

async function GET(req, res, session) {
  const userModel = await UserModel()
  const user = await userModel.findOne({ where: { id: session.payload.id } })

  return res.status(200).json({
    mail: user.dataValues.Preference.mail ?? false,
    sms: user.dataValues.Preference.sms ?? false,
  })
}

async function POST(req, res, session) {
  const userModel = await UserModel()
  const user = await userModel.findOne({ where: { id: session.payload.id } })
  if(!user) return res.status(404).send('User not found')
  await locker.lockAndWait(`user-${user.id}`, 60*10 )

  const { mail, sms } = req.body

  user.Preference.mail = mail
  user.Preference.sms = sms
  user.changed('Preference', true)
  await user.save()
  await locker.unlock(`user-${user.id}`)

  return res.status(200).json({
    mail,
    sms,
  })
}
