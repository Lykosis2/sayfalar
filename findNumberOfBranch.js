export default function findClosestPowerOfTwo(input) {
  let power = 0
  let result = 1

  while (result < input) {
    result = 2 ** power
    power++
  }

  return result
}
