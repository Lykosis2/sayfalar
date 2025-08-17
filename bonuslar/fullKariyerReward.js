import determineRewardsforTitle from '../determineRewardforTitle'

export default function fullKariyerReward(claimed_reward, currentLevel) {
  const fullReward = Array.from({ length: Number.parseInt(currentLevel) - Number.parseInt(claimed_reward) }, (_, index) => Number.parseInt(claimed_reward) + index + 1)
  let price = 0
  console.log(fullReward)
  fullReward.forEach((value) => {
    console.log(value)
    price += determineRewardsforTitle(value)
  })
  return price
}
