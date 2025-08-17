export default async function changeUsersSponsorsTable(usersSponsors, User, invitation, deletedUserId) {
  try {
    usersSponsors.level1 = '2582a601-956b-4076-a6b3-bd40e11df286'
    usersSponsors.level2 = ''
    usersSponsors.level3 = ''
    usersSponsors.level4 = ''
    usersSponsors.level5 = ''
    usersSponsors.level6 = ''
    await usersSponsors.save().catch(err => console.log(err))
    const usersAccount = await User.findOne({ where: { id: deletedUserId } })
    if (usersAccount.sponsor !== 80562) await usersAccount.update({ sponsor: 80562 })
    const sirketAccount = await invitation.findOne({ where: { sale_account_id: '2582a601-956b-4076-a6b3-bd40e11df286' } })
    sirketAccount.unassigned_tree_positions[deletedUserId] = {
      title: 0,
      level: 1,
      has_saleAccount: false,
      saleAccount_id: null,
      changeable: true,
      position: null,
      point1: 0,
      balance: 0,
    }
    await sirketAccount.changed('unassigned_tree_positions', true)
    console.log('Users saleAccount deleted and made a musteri that is connected to main sirket account')
    await sirketAccount.save()
    usersAccount.has_saleAccount = false
    await usersAccount.save()
    return true
  }
  catch (err) {
    console.log(err)
    return false
  }
}
