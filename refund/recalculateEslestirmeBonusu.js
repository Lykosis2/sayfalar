import { calculateEslestirmeReward } from '../calculateEslestirmeReward'
import locker from '../providers/locker'

export default async function recalculateEslestirmeBonusu(registered_user, usersWeeklyMonthlyTable) {
  if (registered_user > 6) {
    const reward = calculateEslestirmeReward(registered_user, usersWeeklyMonthlyTable.real_point1)
    usersWeeklyMonthlyTable.real_point1 = usersWeeklyMonthlyTable.real_point1 + reward // real_point1 i değiştiren 2.yer
    await locker.lockAndWait(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`, 60 * 1000)
    await usersWeeklyMonthlyTable.save()
    await locker.unlock(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`)
    return reward
  }
  return 0
}
