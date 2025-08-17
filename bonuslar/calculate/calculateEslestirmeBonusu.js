export default function calculateEslestirmeValues(layers, real_point1) {
  let totalReward = 0
  if (real_point1 > 1000)
    totalReward += 5 * layers

  if (real_point1 > 10000)
    totalReward += 25 * layers

  if (real_point1 > 100000)
    totalReward += 125 * layers

  if (real_point1 > 1000000)
    totalReward += 625 * layers

  if (real_point1 > 10000000)
    totalReward += 3125 * layers

  return totalReward
}
