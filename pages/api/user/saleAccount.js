import saleAccount from '@/models/saleAccount'
import User from '@/models/user'

const SalesAccount = saleAccount()
const user = User()
export default async function POST(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  let body = req.body
  if (typeof req.body === 'string')
    body = JSON.parse(req.body)

  console.log(body)

  // const accessToken = req.headers.authorization.slice(7)

  /* if(!accessToken || !verifyJwtAccessToken(accessToken)){
     return res.status(401).json({message:"Unauthorized"})
     }
*/
  //  console.log(verifyJwtAccessToken(accessToken));

  await user.update({ has_saleAccount: true }, { where: { id: body.owner_id } }).then(() => console.log('Success')).catch(e => console.log(e))

  await SalesAccount.create({
    owner_id: body.owner_id,

  }).then(() => console.log('Success')).catch(e => console.log(e))

  return res.status(200).json({ message: 'Creation Sucessful' })
}
