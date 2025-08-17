export default async function findWhichPositionAvailable(arr) {
  const highestNumber = Math.max(...arr)
  console.log(highestNumber)
  

  const minNumber = Math.min(...arr)
  console.log(arr);

  let closestPowerOf2 = 2 ** Math.ceil(Math.log2(highestNumber + 2))
  console.log(closestPowerOf2)
  console.log(arr.length)
  console.log(highestNumber + 2)

  if ((arr.length >= highestNumber + 1) && (highestNumber + 2 >= closestPowerOf2)) {
    closestPowerOf2 = 2 ** (Math.ceil(Math.log2(highestNumber + 2)) + 1)
    console.log(closestPowerOf2)
  }
  console.log(closestPowerOf2)

  const min = minNumber
  const max = closestPowerOf2 - 2

  const output = []
  for (let i = min; i <= max; i++) {
    if (!arr.includes(i))
      output.push(i)
  }

  return output
}
