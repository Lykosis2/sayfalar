import { Sequelize } from 'sequelize'
import calculateLoweredPoint1Musteri from '../refund/calculateLoweredPoint1Musteri'
import calculateLoweredPriceMusteri from '../refund/calculateLoweredPriceMusteri'
import recalculateTree from '../refund/recalculateTree'
import locker from '../providers/locker'

// NOT TESTED YET
export default async function makeRefundForOtherMonthMusteri(usersId, documentedSponsors, orderPrice, UserWeeklyMonthlyTableModel, hissedarBonusuModel, saleAccountModel,refunderMemberUserId) {
  // USERS WEEKLY MONTHLY TABLEDAN DUSULUCEK
  // Hissedar bonusu tabledan dusulucek
  const loweredFromSponsors = {}

  if (!documentedSponsors || !documentedSponsors.level1)
    return
  if (documentedSponsors.level1 === '2582a601-956b-4076-a6b3-bd40e11df286') {
    const hissedarBonusu = await hissedarBonusuModel.findOne({ where: { id: 1 } })
    const beforeChangelastMonthsMoney = hissedarBonusu.last_months_money
    hissedarBonusu.last_months_money - (orderPrice * 0.2) > 0 ? hissedarBonusu.last_months_money -= (orderPrice * 0.2) : hissedarBonusu.last_months_money = 0

    await locker.lockAndWait("hissedarBonusu", 60 * 1000)
    await hissedarBonusu.save()
    await locker.unlock("hissedarBonusu")
    return { beforeHissedarBonusu: beforeChangelastMonthsMoney, afterHissedarBonusu: hissedarBonusu.last_months_money }
  }
  await Promise.all(Object.keys(documentedSponsors).map(async (key) => {
    if (!documentedSponsors[key])
      return
    const sponsorsAccount = await saleAccountModel.findOne({ where: { id: documentedSponsors[key] } }).catch(err => console.log(err))
    if (!sponsorsAccount)
      return
    const loweredPrice = calculateLoweredPriceMusteri(orderPrice, key)
    const loweredPoint1 = calculateLoweredPoint1Musteri(orderPrice, key)
    sponsorsAccount.confirmed_balance - loweredPrice > 0 ? sponsorsAccount.confirmed_balance -= loweredPrice : sponsorsAccount.confirmed_balance = 0
    // sponsorsAccount.point1 - loweredPoint1 > 0 ? sponsorsAccount.point1 -= loweredPoint1 : sponsorsAccount.point1 = 0
    await locker.lockAndWait(`saleAccount-${sponsorsAccount.id}`, 60 * 1000)
    await sponsorsAccount.save().catch(err => console.log(err))
    await locker.unlock(`saleAccount-${sponsorsAccount.id}`)

    const pastTree = await UserWeeklyMonthlyTableModel.findOne({
      where: { saleAccount_id: documentedSponsors[key] },
      order: [
        [Sequelize.fn('ABS', Sequelize.fn('DATEDIFF', Sequelize.col('createdAt'), Sequelize.literal('CURRENT_TIMESTAMP'))), 'ASC'],
        ['createdAt', 'DESC']
      ],
    })
    if (!pastTree)
      return
    console.log(pastTree)
    pastTree.self_tree_positions[refunderMemberUserId].point1 - loweredPoint1 > 0 ? pastTree.self_tree_positions[refunderMemberUserId].point1 -= loweredPoint1 : pastTree.self_tree_positions[refunderMemberUserId].point1 = 0
    pastTree.self_tree_positions[refunderMemberUserId].price - loweredPrice > 0 ? pastTree.self_tree_positions[refunderMemberUserId].price -= loweredPrice : pastTree.self_tree_positions[refunderMemberUserId].price = 0
    loweredFromSponsors[documentedSponsors[key]] = { loweredPrice, loweredPoint1, currentPoint1: pastTree.self_tree_positions[refunderMemberUserId].point1, currentPrice: sponsorsAccount.confirmed_balance }
    pastTree.changed('self_tree_positions', true)
    await locker.lockAndWait(`userWeeklyMonthlyTable-${pastTree.id}`, 60 * 1000)
    await pastTree.save().catch(err => console.log(err))
    await locker.unlock(`userWeeklyMonthlyTable-${pastTree.id}`)
    
    const changedPastTree = await UserWeeklyMonthlyTableModel.findOne({
      where: { saleAccount_id: documentedSponsors[key] },
      order: [
        [Sequelize.fn('ABS', Sequelize.fn('DATEDIFF', Sequelize.col('createdAt'), Sequelize.literal('CURRENT_TIMESTAMP'))), 'ASC'],
        ['createdAt', 'DESC']
      ],
    })
    const changedSponsorsAccount = await saleAccountModel.findOne({ where: { id: documentedSponsors[key] } })
    await recalculateTree(changedPastTree, changedSponsorsAccount)
  }),
  )
  return [loweredFromSponsors]
}
