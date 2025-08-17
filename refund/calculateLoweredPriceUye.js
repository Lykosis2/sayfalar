export default function calculateLoweredPriceUye(orderPrice, level) {
  switch (level) {
    case 'level1':
      return orderPrice * 0.045
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
