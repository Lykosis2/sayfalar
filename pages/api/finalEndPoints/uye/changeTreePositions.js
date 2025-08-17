import getServerSession from '@/lib/getServerSession'
import changeTreePositions from '@/lib/yerdegistirme/changeTreePositions'
import getLimits from '@/lib/yerdegistirme/getlimits'
import Invitation from '@/models/invitation'
import importantPanic from '../../../../lib/errorHandle/importantPanic'
import noInvitation from '../../../../lib/errorHandle/CheckTree/noInvitation'
import saleAccount from '../../../../models/saleAccount'
import checkAndSolveProblems from '../../../../lib/errorHandle/CheckTree/checkAndSolveProblems'
import getImportantPanic from '../../../../lib/getImportantPanic'

export default async function handler(req, res) {
  switch (req.method) {
    case 'PUT':
      await PUT(req, res)
      break
    case 'GET':
      await GET(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}

async function GET(req, res) {
  try{

    const SaleAccount = saleAccount()
    const { sale_account_id } = req.query
  
    if (!sale_account_id)
      return res.status(502).json({ message: 'Bad Request' })
  
    const serverSession = await getServerSession(req, res)
    if (!serverSession)
      return res.status(401).json({ message: 'Unauthorized' })
  
    if (!serverSession.user.saleAccountId)
      return res.status(401).json({ message: 'Unauthorized' })
  
    if (serverSession.user.saleAccountId !== sale_account_id)
      return res.status(401).json({ message: 'Unauthorized' })
  
    const invitation = Invitation()
    if(!invitation){
      await importantPanic('Invitation not found','fixTree')
    }
  
    if(!SaleAccount){
      await importantPanic('SaleAccount not found','fixTree')
    }
  
    let usersTree = await invitation.findOne({ where: { sale_account_id } }).catch(async err => {
      console.log(err)
      await importantPanic('Invitation not found','fixTree')
    })
    console.log(usersTree)
    if (!usersTree){
      await noInvitation(sale_account_id,invitation,SaleAccount)
  await checkAndSolveProblems(sale_account_id.owner_id)
  usersTree = await invitation.findOne({ where: { sale_account_id } }).catch(async err => {
    console.log(err)
    await importantPanic('Invitation not found','fixTree')
  })
  
    }
    const returnVal = await getLimits(usersTree.self_tree_positions)
    return res.status(200).json(returnVal)
  }
  catch(e){
    console.log(e);
    res.status(500).json({message:"error"})
  }

}

async function PUT(req, res) {
  const SaleAccount = saleAccount()
  const inImportantPanic =await getImportantPanic()
  if(inImportantPanic) return res.status(400).json({ message: 'Tree placement changes are closed' })
  let body = req.body
  if (typeof body === 'string')
    body = JSON.parse(req.body)

  const nowUTC = new Date(); 
  const nowUTCPlus3 = new Date(nowUTC.getTime() + (3 * 60 * 60 * 1000));
  console.log(nowUTCPlus3)
  const hoursUTCPlus3 = nowUTCPlus3.getUTCHours();
  const isBetween2And3UTCPlus3 = hoursUTCPlus3 >= 2 && hoursUTCPlus3 < 3;
  console.log(isBetween2And3UTCPlus3)
  if(isBetween2And3UTCPlus3){
    return res.status(400).json({ message: 'Tree placement changes are closed' })
  }

  const { changed, sale_account_id } = body
  if (!changed || !sale_account_id)
    return res.status(502).json({ message: 'Bad Request' })
  if (!sale_account_id)
    return res.status(502).json({ message: 'Bad Request' })
  const serverSession = await getServerSession(req, res)
  if (!serverSession)
    return res.status(401).json({ message: 'Unauthorized' })
  if (!serverSession.user.saleAccountId)
    return res.status(401).json({ message: 'Unauthorized' })
  if (serverSession.user.saleAccountId !== sale_account_id)
    return res.status(401).json({ message: 'Unauthorized' })
  const invitation = Invitation()
  if(!invitation){
    await importantPanic('Invitation not found','fixTree')
  }
  const returnVal = await changeTreePositions(changed, sale_account_id, invitation,SaleAccount)
  console.log(returnVal)
  if (typeof returnVal === 'boolean')
    return res.status(502).json({ message: 'NOT TRUE POSSITIONS' })
  return res.status(200).json({ message: 'success', returnVal })
}
