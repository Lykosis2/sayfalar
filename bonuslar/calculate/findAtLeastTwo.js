export default function findAtLeastTwo(array, number) {
  let count = 0
  for (const element of array) {
    if (element === number) {
      count++
    }
  }
  return count >= 2
}
