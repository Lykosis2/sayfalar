export default function findUserBonus(point, claimedReward) {
  if (point >= 800 && claimedReward < 1)
    return 1

  else if (point >= 1600 && claimedReward < 2)
    return 2

  else if (point >= 2400 && claimedReward < 3)
    return 3

  else if (point >= 5000 && claimedReward < 4)
    return 4

  else if (point >= 8000 && claimedReward < 5)
    return 5

  return 0
}
