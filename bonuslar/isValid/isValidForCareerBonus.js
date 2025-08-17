import checkRank from '@/lib/checkRank'

export default async function isValidForCareerBonus(pathcedSaleAccount) {
  const real_point1 = pathcedSaleAccount.real_point1
  const claimed_title_rewards = pathcedSaleAccount.claimed_title_rewards

  const nowTitle = checkRank(real_point1)

  return (nowTitle > claimed_title_rewards)

  // GERCEK PUANINA BAK KULLANICININ
}
