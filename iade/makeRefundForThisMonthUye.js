import locker from '../providers/locker';
import calculateLoweredPoint1Uye from '../refund/calculateLoweredPoint1Uye'
import calculateLoweredPriceUye from '../refund/calculateLoweredPriceUye'

export default async function makeRefundForThisMonthUser(IsUser, documentedSponsors, orderPrice, refunderMemberId, refunderMemberUserId, invitationModel, saleAccountModel) {
  const retunedValue = {}
  console.log(documentedSponsors);
  if (!IsUser)
    return
  // First take the point from
  const selfTree = await invitationModel.findOne({ where: { sale_account_id: refunderMemberId } })
  console.log(selfTree)

  selfTree.self_tree_positions[refunderMemberUserId].point1 - orderPrice / 13 > 0
    ? selfTree.self_tree_positions[refunderMemberUserId].point1 -= orderPrice / 13
    : selfTree.self_tree_positions[refunderMemberUserId].point1 = 0

  selfTree.changed('self_tree_positions', true)
  await locker.lockAndWait(`invitation-${selfTree.sale_account_id}`, 60 * 1000)
  await selfTree.save().catch(err => console.log(err))
  await locker.unlock(`invitation-${selfTree.sale_account_id}`)
  const selfTreeAccount = await saleAccountModel.findOne({ where: { id: refunderMemberId } })

  selfTreeAccount.point1 - orderPrice / 13 > 0
    ? selfTreeAccount.point1 -= orderPrice / 13
    : selfTreeAccount.point1 = 0

  selfTreeAccount.self_gained_point1 - orderPrice / 13 > 0
    ? selfTreeAccount.self_gained_point1 -= orderPrice / 13
    : selfTreeAccount.self_gained_point1 = 0

  retunedValue[refunderMemberId] = orderPrice / 13
  await locker.lockAndWait(`saleAccount-${selfTreeAccount.id}`, 60 * 1000)
  selfTreeAccount.save().catch(err => console.log(err))
  await locker.unlock(`saleAccount-${selfTreeAccount.id}`)
  await locker.flag(selfTreeAccount.id)

    // Second take the point from sponsors depending on the level
    await Promise.all(
        Object.keys(documentedSponsors).map(async key=>{
            if (!documentedSponsors[key]) return
            const sponsor = await invitationModel.findOne({where:{sale_account_id:documentedSponsors[key]}})
            if(!sponsor) return
            const lowerPoint1 = calculateLoweredPoint1Uye(orderPrice,key)
            const lowerBalance= calculateLoweredPriceUye(orderPrice,key)
            console.log(lowerBalance);
            const oldpoint1 = sponsor.self_tree_positions[refunderMemberUserId].point1

        sponsor.self_tree_positions[refunderMemberUserId].balance - lowerBalance > 0
        ? sponsor.self_tree_positions[refunderMemberUserId].balance -= lowerBalance
        : sponsor.self_tree_positions[refunderMemberUserId].balance = 0

        sponsor.self_tree_positions[refunderMemberUserId].point1 - lowerPoint1 > 0
        ? sponsor.self_tree_positions[refunderMemberUserId].point1 -= lowerPoint1
        : sponsor.self_tree_positions[refunderMemberUserId].point1 = 0

        sponsor.changed('self_tree_positions', true)
        await locker.lockAndWait(`invitation-${sponsor.sale_account_id}`, 60 * 1000)
        await sponsor.save().catch(err => console.log(err))
        await locker.unlock(`invitation-${sponsor.sale_account_id}`)








      const sponsorAccount = await saleAccountModel.findOne({ where: { id: documentedSponsors[key] } })
      console.log(sponsorAccount)
      sponsorAccount.point1 - lowerPoint1 > 0
        ? sponsorAccount.point1 -= lowerPoint1
        : sponsorAccount.point1 = 0
      const oldBalance = sponsorAccount.unconfirmed_balance
      console.log(sponsorAccount.unconfirmed_balance)

    console.log(sponsorAccount.unconfirmed_balance);
      sponsorAccount.unconfirmed_balance - lowerBalance > 0
        ? sponsorAccount.unconfirmed_balance -= lowerBalance
        : sponsorAccount.unconfirmed_balance = 0
      console.log(sponsorAccount.unconfirmed_balance)

      retunedValue[documentedSponsors[key]] = { point1: lowerPoint1, balance: lowerBalance, oldPoint1: oldpoint1, oldBalance }
      console.log(retunedValue)
      await locker.lockAndWait(`saleAccount-${sponsorAccount.id}`, 60 * 1000)
      await sponsorAccount.save().catch(err => console.log(err))
      await locker.unlock(`saleAccount-${sponsorAccount.id}`)
      await locker.flag(sponsorAccount.id)
    }),
  )
  return retunedValue
}
