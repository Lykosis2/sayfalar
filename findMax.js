export default function findMax(arr) {
  if (arr.length === 0)
    return undefined // Return undefined for an empty array

  let max = arr[0] // Initialize max with the first element of the array

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max)
      max = arr[i] // Upperformance max if a larger element is found
  }

  return max
}
