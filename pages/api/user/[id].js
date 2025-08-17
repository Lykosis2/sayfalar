import User from '@/models/user'

const user = User()
export default async function GET(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const accessToken = req.headers.authorization.slice(7)

  // if (!accessToken || !verifyJwtAccessToken(accessToken))
  //   return res.status(401).json({ message: 'Unauthorized' })

  // Authenticationını yap

  const { id } = req.query
  const userFound = await user.findOne({
    where: {
      id,
    },
  })
  return res.status(200).json(userFound)
}
