export default function findLeftSideOfTree(number) {
  const power = Math.floor(Math.log2(number + 2))
  const result = 2 ** power
  const lowerBound = result - 2
  const upperBound = result - 1 + 2 ** (power - 1)
  return number > lowerBound && number < upperBound
}
