export default async function findIfDeleteUser(refundFind, SaleAccount) {
  if (!refundFind.sale_account_id)
    return false

  const saleAccountOfUser = await SaleAccount.findByPk(refundFind.sale_account_id)

  if (!saleAccountOfUser)
    return false

  // If saleAccount createdAt is more than 30 days ago return false
  const saleAccountCreatedAt = new Date(saleAccountOfUser.createdAt)
  const now = new Date()
  const diffTime = Math.abs(now - saleAccountCreatedAt)
  console.log(diffTime)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  console.log(diffDays)
  if (diffDays > 30)
    return false

  const specialOrderId = Object.keys(saleAccountOfUser.specialOrders)[0]

  if (refundFind.order_id !== specialOrderId)
    return false

  await Promise.all(
    Object.keys(saleAccountOfUser.specialOrders).map(async (key) => {
      Object.keys(saleAccountOfUser.specialOrders[key]).map(async (key2) => {
        const countOfUsersSpecialProduct = saleAccountOfUser.specialOrders[key][key2]
        if (!refundFind.products[key2])
          return
        if (refundFind.products[key2].count - countOfUsersSpecialProduct <= 0)
          delete saleAccountOfUser.specialOrders[key][key2]

        else
          saleAccountOfUser.specialOrders[key][key2] -= countOfUsersSpecialProduct
      })
      if (Object.keys(saleAccountOfUser.specialOrders[key]).length === 0) {
        delete saleAccountOfUser.specialOrders[key]
        saleAccountOfUser.changed('specialOrders', true)
        await saleAccountOfUser.save()
      }
    }),
  )

  if (Object.keys(saleAccountOfUser.specialOrders).length === 0)
    return true

  return false
}
