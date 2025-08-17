export default function duplicateArrayToJson(inputArray) {
  if (!inputArray)
    return
  const countMap = inputArray.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {})

  const resultJSON = JSON.stringify(countMap)
  return resultJSON
}
