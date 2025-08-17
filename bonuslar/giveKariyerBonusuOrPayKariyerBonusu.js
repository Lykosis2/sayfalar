import titleUpInSponsors from './titleUpInSponsors'
import fullKariyerReward from './fullKariyerReward'
import calculateThisMonthsKariyer from './calculateThisMonthsKariyer'
import addToKariyerBonusuToPayCsv from './addToKariyerBonusuToPayCsv'
import locker from '../providers/locker'

export default async function giveKariyerBonusu(pathcedSaleAccount, sponsors, invitation) {

  pathcedSaleAccount.title = await calculateThisMonthsKariyer(pathcedSaleAccount)

  if ((pathcedSaleAccount.two_month_ago_title > pathcedSaleAccount.claimed_title_rewards)
      && (pathcedSaleAccount.last_months_title > pathcedSaleAccount.claimed_title_rewards)
      && (pathcedSaleAccount.two_month_ago_self_gained_point1 >= 100)
      && (pathcedSaleAccount.last_months_self_gained_point1 >= 100)
  ) {
    console.log('ola')
    const minoftwo = Math.min(pathcedSaleAccount.two_month_ago_title, pathcedSaleAccount.last_months_title)
    const reward = fullKariyerReward(pathcedSaleAccount.claimed_title_rewards, minoftwo)
    pathcedSaleAccount.claimed_title_rewards = minoftwo
    pathcedSaleAccount.real_title = minoftwo

    pathcedSaleAccount.two_month_ago_title = pathcedSaleAccount.last_months_title ?? 0
    pathcedSaleAccount.title = pathcedSaleAccount.real_title
    pathcedSaleAccount.last_months_title = pathcedSaleAccount.title
    //        pathcedSaleAccount.title = pathcedSaleAccount.real_title
    const titleUpInSponsor = await titleUpInSponsors(pathcedSaleAccount.owner_id, sponsors, invitation) // IMPLEMENT THAT
    await locker.lockAndWait(`saleAccount-${pathcedSaleAccount.id}`, 60 * 1000)
    await pathcedSaleAccount.save()
    locker.unlock(`saleAccount-${pathcedSaleAccount.id}`)
    console.log('ola')
    const giveReward = await addToKariyerBonusuToPayCsv(reward, pathcedSaleAccount.id, pathcedSaleAccount.IBAN,pathcedSaleAccount.is_company) // Degisicek 
    return giveReward // send this to the admin part
  }
  pathcedSaleAccount.two_month_ago_title = pathcedSaleAccount.last_months_title ?? 0
  pathcedSaleAccount.last_months_title = pathcedSaleAccount.title ?? 0
  pathcedSaleAccount.title = pathcedSaleAccount.real_title ?? 0
  await pathcedSaleAccount.save()
  return 0
}
