import kariyerLevelsCalc from '../bonuslar/kariyerLevelsCalc'
import locker from '../providers/locker';

export default async function recalculateKariyerBonusu(usersSaleAccount, usersWeeklyMonthlyTable) {
  if (!usersWeeklyMonthlyTable)
    return false
  if (!usersSaleAccount)
    return false
  console.log(usersWeeklyMonthlyTable.real_point1)
  console.log(usersSaleAccount.last_months_title);
  console.log(kariyerLevelsCalc(usersWeeklyMonthlyTable.real_point1));
  usersSaleAccount.last_months_title = kariyerLevelsCalc(usersWeeklyMonthlyTable.real_point1)
  await locker.lockAndWait(`saleAccount-${usersSaleAccount.id}`, 60 * 1000)
  await usersSaleAccount.save()
  await locker.unlock(`saleAccount-${usersSaleAccount.id}`)
}
