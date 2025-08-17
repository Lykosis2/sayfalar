export default function findDuplicatesAndReturn(array) {
  const seen = new Set()
  const duplicates = []

  for (const num of array) {
    if (seen.has(num) && !duplicates.includes(num))
      duplicates.push(num)
    else
      seen.add(num)
  }
  if (duplicates.length === 0)
    return false

  return duplicates
}
