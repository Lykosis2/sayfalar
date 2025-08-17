export default function findInvalidKeys(obj) {
  const seenPositions = new Set()
  const invalidKeys = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key].position !== undefined && obj[key].position !== null) {
      const position = obj[key].position
      if (typeof position === 'number' && !seenPositions.has(position))
        seenPositions.add(position)

      else
        invalidKeys.push(key)
    }
    else {
      console.log('here3')
      invalidKeys.push(key)
    }
  }
  return invalidKeys
}
