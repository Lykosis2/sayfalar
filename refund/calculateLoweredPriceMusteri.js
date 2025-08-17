export default function calculateLoweredPriceMusteri(orderPrice, level) {
  console.log(level === 'level1')
  switch (level) {
    case 'level1':
      return orderPrice * 0.23
    case 'level2':
      return orderPrice * 0.012
    case 'level3':
      return orderPrice * 0.009
    case 'level4':
      return orderPrice * 0.009
    case 'level5':
      return orderPrice * 0.009
    case 'level6':
      return orderPrice * 0.006
    default:
      return orderPrice * 0.006
  }
}
