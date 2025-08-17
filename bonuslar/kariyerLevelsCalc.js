export default function kariyerLevelsCalc(point1) {
  console.log('aaaaaaaaaa')
  console.log(point1)
  if (point1 >= 100 && point1 < 2500)
    return 1

  if (point1 >= 2500 && point1 < 5000)
    return 2

  if (point1 >= 5000 && point1 < 10000)
    return 3

  if (point1 >= 10000 && point1 < 25000)
    return 4

  if (point1 >= 25000 && point1 < 50000)
    return 5

  if (point1 >= 50000 && point1 < 100000)
    return 6

  if (point1 >= 100000 && point1 < 300000)
    return 7

  if (point1 >= 300000 && point1 < 600000)
    return 8

  if (point1 >= 600000 && point1 < 1000000)
    return 9

  if (point1 >= 1000000 && point1 < 2500000)
    return 10

  if (point1 >= 2500000 && point1 < 4500000)
    return 11

  if (point1 >= 4500000 && point1 < 10000000)
    return 12

  if (point1 >= 10000000)
    return 13

  return 0
}
