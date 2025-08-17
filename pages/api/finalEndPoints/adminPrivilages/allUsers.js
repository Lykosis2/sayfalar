import saleAccount from '@/models/saleAccount'
import User from '@/models/user'
import { getAdminSession } from '../../../../lib/admin/session'

const user = User()
const SaleAccounts = saleAccount()
export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  console.log(session);
  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

  switch (req.method) {
    case 'GET':
      return await GET(req, res)
  }
}

async function GET(req, res) {
 try{

    const returnData = {}
  
    const users = await user.findAll()
  
    const allSaleAccounts = await SaleAccounts.findAll()
    allSaleAccounts.forEach((saleAccount) => {
      returnData[saleAccount.owner_id] = {
        ...saleAccount.dataValues,
        userType: 1,
      }
    })
  
    users.forEach((user) => {
      if (returnData[user.id]) {
        returnData[user.id] = {
          ...returnData[user.id],
          profilepicture: user.profilepicture,
          name: user.name,
          surname: user.surname,
          email: user.email,
        }
        return
      }
      returnData[user.id] = {
        ...user.dataValues,
        userType: 0,
  
      }
    })
    res.status(200).json({ allUsers: returnData })
  }
  catch(e){
    console.log(e);
    return res.status(500).end()
  }
}
