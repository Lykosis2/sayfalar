import { calculateEslestirmeReward } from '../calculateEslestirmeReward'
import locker from '../providers/locker'

export default async function giveEslestirmeBonusu(pathcedSaleAccount) {
  if (pathcedSaleAccount.registered_user > 6) {
    const reward = calculateEslestirmeReward(pathcedSaleAccount.registered_user, pathcedSaleAccount.real_point1)
    pathcedSaleAccount.real_point1 = pathcedSaleAccount.real_point1 + reward // real_point1 i değiştiren 2.yer
    await locker.lockAndWait(`saleAccount-${pathcedSaleAccount.id}`, 60 * 1000)
    await pathcedSaleAccount.save()
    await locker.unlock(`saleAccount-${pathcedSaleAccount.id}`)
    return reward
  }
  return 0
}
