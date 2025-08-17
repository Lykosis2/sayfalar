export default function checkRewardForCarrearBonus(title) {
  switch (title) {
    case 1:
      return 500
    case 2:
      return 1000
    case 3:
      return 2500
    case 4:
      return 5000
    case 5:
      return 10000
    case 6:
      return 25000
    case 7:
      return 50000
    case 8:
      return 100000
    case 9:
      return 250000
    case 10:
      return 500000
    case 11:
      return 1000000
    case 12:
      return 2500000
    case 13:
      return 10000000
    default:
      return 0
  }
}
