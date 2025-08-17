import documentUsersSponsors from './bonuslar/uye/documentUsersSponsor'
import documentedUsersTree from './bonuslar/uye/documentUsersTree'
import changeUsersSponsorsTable from './deleteSaleAccount/changeUsersSponsorsTable'
import deleteSaleAccount from './deleteSaleAccount/deleteSaleAccount'
import putTreeToSponsor from './deleteSaleAccount/putTreeToSponsor'

export default async function deleteAccountOfUser(invitation, sponsors, usersSaleAccount, User, SaleAccount) {
  try {
    const usersTree = await invitation.findOne({ where: { sale_account_id: usersSaleAccount.id } })
    const usersSponsors = await sponsors.findOne({ where: { owner_id: usersSaleAccount.owner_id } })
    const documentedTree = await documentedUsersTree(usersTree)
    const documentedSponsors = await documentUsersSponsors(usersSponsors)

    await putTreeToSponsor(documentedSponsors, invitation, SaleAccount, sponsors, usersSaleAccount.owner_id, documentedTree, User, usersSaleAccount.id)
    console.log('ola')
    await deleteSaleAccount(sponsors, invitation, SaleAccount, usersSaleAccount)
    console.log('ola')
    await changeUsersSponsorsTable(usersSponsors, User, invitation, usersSaleAccount.owner_id)
    console.log('ola')

    return true
  }
  catch (err) {
    console.log(err)
    return false
  }
}
