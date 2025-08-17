export default function findPossiblePositions(number) {
  const a = findClosestPowerOfTwo(number)
  console.log(a)
  const result = []
  for (let i = number; a >= i; i++)
    result.push(i + 1)

  console.log(result)
  return result
}
function findClosestPowerOfTwo(input) {
  let power = 0
  let result = 1

  while (result < input) {
    result = 2 ** power
    power++
  }

  return result
}
