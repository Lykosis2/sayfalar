import { Sequelize } from 'sequelize'
import calculateLoweredPoint1Uye from '../refund/calculateLoweredPoint1Uye'
import calculateLoweredPriceUye from '../refund/calculateLoweredPriceUye'
import recalculateTree from '../refund/recalculateTree'
import locker from '../providers/locker'

// NOT TESTED YET
export default async function makeRefundForOtherMonthUye(usersId, documentedSponsors, orderPrice, UserWeeklyMonthlyTableModel, saleAccountModel,refunderMemberUserId) {
  // USERS WEEKLY MONTHLY TABLEDAN DUSULUCEK
  // Hissedar bonusu tabledan dusulucek

  const loweredFromSponsors = {}
  if (!documentedSponsors || !documentedSponsors.level1)
    return

  // Do the self refund 
  const selfSaleAccount = await saleAccountModel.findOne({ where: { id: usersId } })
  if (!selfSaleAccount)
    return
  selfSaleAccount.last_months_self_gained_point1 - orderPrice / 13 > 0
    ? selfSaleAccount.last_months_self_gained_point1 -= orderPrice / 13
    : selfSaleAccount.last_months_self_gained_point1 = 0

  await locker.lockAndWait(`saleAccount-${selfSaleAccount.id}`, 60 * 1000)
  await selfSaleAccount.save().catch(err => console.log(err))
  await locker.unlock(`saleAccount-${selfSaleAccount.id}`)


  const selfPastTree = await UserWeeklyMonthlyTableModel.findOne({
    where: { saleAccount_id: usersId },
    order: [
      [Sequelize.fn('ABS', Sequelize.fn('DATEDIFF', Sequelize.col('createdAt'), Sequelize.literal('CURRENT_TIMESTAMP'))), 'ASC'],
      ['createdAt', 'DESC']
    ],
  })
  if (!selfPastTree)
    return
  selfPastTree.self_tree_positions[refunderMemberUserId].point1 - orderPrice / 13 > 0
    ? selfPastTree.self_tree_positions[refunderMemberUserId].point1 -= orderPrice / 13
    : selfPastTree.self_tree_positions[refunderMemberUserId].point1 = 0
  selfPastTree.changed('self_tree_positions', true)
  await locker.lockAndWait(`userWeeklyMonthlyTable-${selfPastTree.id}`, 60 * 1000)
  await selfPastTree.save().catch(err => console.log(err))
  await locker.unlock(`userWeeklyMonthlyTable-${selfPastTree.id}`)

  await Promise.all(Object.keys(documentedSponsors).map(async (key) => {
    if (!documentedSponsors[key])
      return
    const sponsorsAccount = await saleAccountModel.findOne({ where: { id: documentedSponsors[key] } })
    if (!sponsorsAccount)
      return
    const loweredPrice = calculateLoweredPriceUye(orderPrice, key)
    const loweredPoint1 = calculateLoweredPoint1Uye(orderPrice, key)
    sponsorsAccount.confirmed_balance - loweredPrice > 0 ? sponsorsAccount.confirmed_balance -= loweredPrice : sponsorsAccount.confirmed_balance = 0
    await locker.lockAndWait(`saleAccount-${sponsorsAccount.id}`, 60 * 1000)
    await sponsorsAccount.save().catch(err => console.log(err))
    await locker.unlock(`saleAccount-${sponsorsAccount.id}`)

    const pastTree = await UserWeeklyMonthlyTableModel.findOne({
      where: {saleAccount_id: documentedSponsors[key] },
      order: [
        [Sequelize.fn('ABS', Sequelize.fn('DATEDIFF', Sequelize.col('createdAt'), Sequelize.literal('CURRENT_TIMESTAMP'))), 'ASC'],
        ['createdAt', 'DESC']
      ],
    })

    if (!pastTree)
      return
    console.log(pastTree);
    console.log(pastTree.self_tree_positions[refunderMemberUserId].point1);
    console.log(loweredPoint1);

      pastTree.self_tree_positions[refunderMemberUserId].point1 - loweredPoint1 > 0 ? pastTree.self_tree_positions[refunderMemberUserId].point1 -= loweredPoint1 : pastTree.self_tree_positions[refunderMemberUserId].point1 = 0
    pastTree.self_tree_positions[refunderMemberUserId].price - loweredPrice > 0 ? pastTree.self_tree_positions[refunderMemberUserId].price -= loweredPrice : pastTree.self_tree_positions[refunderMemberUserId].price = 0
    loweredFromSponsors[documentedSponsors[key]] = { loweredPrice, loweredPoint1, currentPoint1: pastTree.self_tree_positions[refunderMemberUserId].point1, currentPrice: sponsorsAccount.confirmed_balance }
    console.log(loweredFromSponsors)
    pastTree.changed('self_tree_positions', true)
    await locker.lockAndWait(`userWeeklyMonthlyTable-${pastTree.id}`, 60 * 1000)
    await pastTree.save().catch(err => console.log(err))
    await locker.unlock(`userWeeklyMonthlyTable-${pastTree.id}`)
    
    console.log(pastTree.self_tree_positions[refunderMemberUserId].point1);

    console.log(Date.now());
    const changedPastTree = await UserWeeklyMonthlyTableModel.findOne({
      where: {saleAccount_id: documentedSponsors[key] },
      order: [
        [Sequelize.fn('ABS', Sequelize.fn('DATEDIFF', Sequelize.col('createdAt'), Sequelize.literal('CURRENT_TIMESTAMP'))), 'ASC'],
        ['createdAt', 'DESC']
      ],
    })

    console.log(changedPastTree);

    const changedSponsorsAccount = await saleAccountModel.findOne({ where: { id: documentedSponsors[key] } })
    console.log(changedSponsorsAccount);
    await recalculateTree(changedPastTree,changedSponsorsAccount)

  }),
  )
  return [loweredFromSponsors]
}
