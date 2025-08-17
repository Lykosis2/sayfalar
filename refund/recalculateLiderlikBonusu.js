import isValidForLeadershipBonusandCalculateIfValid from '../bonuslar/isValid/isValidForLeadeshipBonus'
import locker from '../providers/locker'

export default async function recalculateLiderlikBonusu(usersSaleAccount, usersWeeklyMonthlyTable) {
  const validateAndFindLeaderShipBonus = await isValidForLeadershipBonusandCalculateIfValid(usersWeeklyMonthlyTable.self_tree_positions, usersSaleAccount.real_point1, usersSaleAccount.real_title)

  if (validateAndFindLeaderShipBonus[0]) {
    const leadershipBonus = validateAndFindLeaderShipBonus[1]
    usersSaleAccount.lastMonthsLiderlikBonusuGeliri = leadershipBonus
    await locker.lockAndWait(`saleAccount-${usersSaleAccount.id}`, 60 * 1000)
    await usersSaleAccount.save()
    await locker.unlock(`saleAccount-${usersSaleAccount.id}`)
    return leadershipBonus
  }
  return 0
}
