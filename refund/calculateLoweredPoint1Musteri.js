export default function calculateLoweredPoint1Musteri(orderPrice, level) {
  switch (level) {
    case 'level1':
      return orderPrice / 13
    case 'level2':
      return orderPrice / 26
    case 'level3':
      return orderPrice / 34.6
    case 'level4':
      return orderPrice / 52
    case 'level5':
      return orderPrice / 52
    case 'level6':
      return orderPrice / 52
    default:
      return orderPrice / 52
  }
}
