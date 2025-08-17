import documentUsersSponsors from '@/lib/bonuslar/uye/documentUsersSponsor'
import documentedUsersTree from '@/lib/bonuslar/uye/documentUsersTree'
import changeUsersSponsorsTable from '@/lib/deleteSaleAccount/changeUsersSponsorsTable'
import deleteSaleAccount from '@/lib/deleteSaleAccount/deleteSaleAccount'
import putTreeToSponsor from '@/lib/deleteSaleAccount/putTreeToSponsor'
import Invitation from '@/models/invitation'
import saleAccount from '@/models/saleAccount'
import Sponsors from '@/models/sponsors'
import User from '@/models/user'
import importantPanic from '../../../../lib/errorHandle/importantPanic'
import makeSureDeletedSuccessfully from '../../../../lib/makeSureDeletedSuccessfully'
import { getAdminSession } from '../../../../lib/admin/session'

export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  console.log(req.headers.userid,req.headers.randomstr);
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  console.log(session);
if (!session || !session.superAdmin)
  return res.status(401).json({ error: 'Unauthorized' })
  switch (req.method) {
    case 'DELETE':
      await DELETE(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
async function DELETE(req, res) {
  try{

    const invitation = Invitation()
    const sponsors = Sponsors()
    const SaleAccount = saleAccount()
    const user = User()
    const {
      email
    } = req.query
    console.log(email);
    const usersAccount = await user.findOne({ where: { email: email } })
    const usersSaleAccount = await SaleAccount.findOne({ where: { owner_id: usersAccount.id } })
    console.log(usersSaleAccount);
    if (!usersSaleAccount)
      return res.status(502).json({ message: 'Server Error' })
    const usersTree = await invitation.findOne({ where: { sale_account_id:usersSaleAccount.id } }).catch(err => console.log(err))
    const owner_id = usersSaleAccount.owner_id
    if (!usersTree)
      return res.status(502).json({ message: 'Server Error' })
    const usersSponsors = await sponsors.findOne({ where: { owner_id } }).catch(err => console.log(err))
    if (!usersSponsors)
      return res.status(502).json({ message: 'Server Error' })
    const documentedTree = await documentedUsersTree(usersTree)
    const documentedSponsors = await documentUsersSponsors(usersSponsors)
  
    let checkError = await invitation.findOne({ where: { sale_account_id:documentedSponsors.level1 } })
    console.log(checkError.unassigned_tree_positions);
  
    const oldSponsorsTrees ={
      level1:null,
      level2:null,
      level3:null,
      level4:null,
      level5:null,
      level6:null,
    }
    await Promise.all(
    Object.values(documentedSponsors).map(async(value,index)=>{
      if(value !== null){
        const invit = await invitation.findOne({ where: { sale_account_id:value } })
        oldSponsorsTrees[`level${index+1}`] = invit
      }
      else{
        oldSponsorsTrees[`level${index+1}`] = null
      }
    }
    ))
  
    // look if sponsors is in falgedBehaviour and if it is falged behaviour all 
    await putTreeToSponsor(documentedSponsors, invitation, SaleAccount, sponsors, owner_id, documentedTree, user,usersSaleAccount.id )
    console.log('ola')
    checkError = await invitation.findOne({ where: { sale_account_id:documentedSponsors.level1 } })
    console.log(checkError.unassigned_tree_positions);
    await deleteSaleAccount(sponsors, invitation, SaleAccount, usersSaleAccount)
    console.log('ola')
    checkError = await invitation.findOne({ where: { sale_account_id:documentedSponsors.level1 } })
    console.log(checkError.unassigned_tree_positions);
    await changeUsersSponsorsTable(usersSponsors, user, invitation, owner_id)
    console.log('ola')
    checkError = await invitation.findOne({ where: { sale_account_id:documentedSponsors.level1 } })
    console.log(checkError.unassigned_tree_positions);
    const deletedSuccesfully = await makeSureDeletedSuccessfully(owner_id,usersSaleAccount.id,user,SaleAccount,sponsors,invitation,oldSponsorsTrees,documentedSponsors,documentedTree)
    if(!deletedSuccesfully){
      await importantPanic('User not deleted','deleteUser')
      return res.status(502).json({ message: 'Server Error' })
    }
    return res.status(200).json({ message: 'success' })
  }
  catch(err){
    console.log(err);
    await importantPanic(err,'deleteUser')
    return res.status(502).json({ message: 'Server Error' })
  }
}
