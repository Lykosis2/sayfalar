export default function findAtLeastOne(array, number) {
  let count = 0
  for (const element of array) {
    if (element === number) {
      count++
    }
  }
  return count >= 1
}
