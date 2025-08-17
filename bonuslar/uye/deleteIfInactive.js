import documentedUsersTree from './documentUsersTree'
import documentUsersSponsors from './documentUsersSponsor'
import checkLast12MonthOfActive from '@/lib/deleteSaleAccount/checkLast12MonthOfActive'
import putTreeToSponsor from '@/lib/deleteSaleAccount/putTreeToSponsor'
import deleteSaleAccount from '@/lib/deleteSaleAccount/deleteSaleAccount'
import changeUsersSponsorsTable from '@/lib/deleteSaleAccount/changeUsersSponsorsTable'

export default async function deleteIfInactive(usersSaleAccount, sponsors, UserWeeklyMonthlyTable, invitation, SaleAccount, User) {
  // not included this month
  if(usersSaleAccount.id === "2582a601-956b-4076-a6b3-bd40e11df286" || usersSaleAccount.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || usersSaleAccount.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || usersSaleAccount.id === "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    return
  }
  const UsersDateTable = await UserWeeklyMonthlyTable.findAll({ where: { user_id: usersSaleAccount.owner_id } })
  const usersTree = await invitation.findOne({ where: { sale_account_id: usersSaleAccount.id } })
  const usersSponsors = await sponsors.findOne({ where: { owner_id: usersSaleAccount.owner_id } })
  const documentedTree = await documentedUsersTree(usersTree)
  /* {
         level1:{},
         level2:{},
         level3:{},
         level4:{},
         level5:{},
         level6:{}
    } */
  const documentedSponsors = await documentUsersSponsors(usersSponsors)
  // {leve1:sponsorid,level2:sponsorid,level3:sponsorid,level4:sponsorid,level5:sponsorid,level6:sponsorid}
  const last12MonthsCheck = await checkLast12MonthOfActive(UsersDateTable)
  console.log(last12MonthsCheck)
  if (last12MonthsCheck) {
    await putTreeToSponsor(documentedSponsors, invitation, SaleAccount, sponsors, usersSaleAccount.owner_id, documentedTree, User, usersSaleAccount.id)
    console.log('ola')
    await deleteSaleAccount(sponsors, invitation, SaleAccount, usersSaleAccount)
    console.log('ola')
    await changeUsersSponsorsTable(usersSponsors, User, invitation, usersSaleAccount.owner_id)
    console.log('ola')
  }
}
