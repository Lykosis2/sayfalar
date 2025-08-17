import locker from '../providers/locker'
import calculateLoweredPoint1Musteri from '../refund/calculateLoweredPoint1Musteri'
import calculateLoweredPriceMusteri from '../refund/calculateLoweredPriceMusteri'

export default async function makeRefundForThisMonthMusteri(usersId, documentedSponsors, orderPrice, invitationModel, saleAccountModel, hissedarBonusuModel) {
  // Return the moneys and prices from the sponsors
  const loweredFromSponsors = {}
  if (!documentedSponsors || !documentedSponsors.level1)
    return
  if (documentedSponsors.level1 === '2582a601-956b-4076-a6b3-bd40e11df286') {
    const hissedarBonusu = await hissedarBonusuModel.findOne({ where: { id: 1 } })
    const beforeChangeThisMonthsMoney = hissedarBonusu.this_months_money
    hissedarBonusu.this_months_money - (orderPrice * 0.2) > 0 ? hissedarBonusu.this_months_money -= (orderPrice * 0.2) : hissedarBonusu.this_months_money = 0
    await locker.lockAndWait("hissedarBonusu", 60 * 1000)
    await hissedarBonusu.save()
    await locker.unlock("hissedarBonusu")
    return { beforeHissedarBonusu: beforeChangeThisMonthsMoney, afterHissedarBonusu: hissedarBonusu.this_months_money }
  }
  await Promise.all(Object.keys(documentedSponsors).map(async (key) => {
    if (!documentedSponsors[key])
      return
    const sponsorsAccount = await saleAccountModel.findOne({ where: { id: documentedSponsors[key] } })
    if (!sponsorsAccount)
      return
    const loweredPrice = calculateLoweredPriceMusteri(orderPrice, key)
    const loweredPoint1 = calculateLoweredPoint1Musteri(orderPrice, key)

    sponsorsAccount.unconfirmed_balance - loweredPrice > 0 ? sponsorsAccount.unconfirmed_balance -= loweredPrice : sponsorsAccount.unconfirmed_balance = 0
    sponsorsAccount.point1 - loweredPoint1 > 0 ? sponsorsAccount.point1 -= loweredPoint1 : sponsorsAccount.point1 = 0
    await locker.lockAndWait(`saleAccount-${sponsorsAccount.id}`, 60 * 1000)
    await sponsorsAccount.save().catch(err => console.log(err))
    await locker.unlock(`saleAccount-${sponsorsAccount.id}`)
    await locker.flag(sponsorsAccount.id)


    const sponsorsTree = await invitationModel.findOne({ where: { sale_account_id: documentedSponsors[key] } })
    if (!sponsorsTree)
      return

    console.log(sponsorsTree.self_tree_positions[usersId].point1)
    sponsorsTree.self_tree_positions[usersId].point1 - loweredPoint1 > 0 ? sponsorsTree.self_tree_positions[usersId].point1 -= loweredPoint1 : sponsorsTree.self_tree_positions[usersId].point1 = 0
    console.log(sponsorsTree.self_tree_positions[usersId].point1)
    sponsorsTree.self_tree_positions[usersId].balance - loweredPrice > 0 ? sponsorsTree.self_tree_positions[usersId].balance -= loweredPrice : sponsorsTree.self_tree_positions[usersId].price = 0
    loweredFromSponsors[documentedSponsors[key]] = { loweredPrice, loweredPoint1, currentPoint1: sponsorsTree.self_tree_positions[usersId].point1, currentPrice: sponsorsAccount.unconfirmed_balance }
    sponsorsTree.changed('self_tree_positions', true)
    await locker.lockAndWait(`invitation-${sponsorsTree.sale_account_id}`, 60 * 1000)
    await sponsorsTree.save().catch(err => console.log(err))
    await locker.unlock(`invitation-${sponsorsTree.sale_account_id}`)
  }),
  )

  return [loweredFromSponsors]
}
