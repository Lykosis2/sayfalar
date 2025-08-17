export default async function deleteSaleAccount(sponsor, Invitation, SaleAccount, deletedUser) {
  try {
    await SaleAccount.destroy({ where: { owner_id: deletedUser.owner_id } })
    await Invitation.destroy({ where: { sale_account_id: deletedUser.id } })
  }
  catch (err) {
    console.log(err)
    return false
  }
}
