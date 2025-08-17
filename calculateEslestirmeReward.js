import calculateEslestirmeValues from './bonuslar/calculate/calculateEslestirmeBonusu'

export function calculateEslestirmeReward(numberofusers, real_point1) {
  const intUsers = Number.parseInt(numberofusers)
  const layers = Math.floor(Math.sqrt((intUsers + 2)))
  if (intUsers < 6)
    return 0
  const reward = calculateEslestirmeValues(layers, real_point1)
  return reward
}
