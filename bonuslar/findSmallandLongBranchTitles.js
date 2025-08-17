export default function findSmallandLongBranchTitles(json) {
  let leftBranch = 0
  let rightBranch = 0
  const leftBranchTitles = []
  const rightBranchTitles = []
  for (const key in json) {
    if (json[key].position === 0)
      continue
    if (findLeftSideOfTree(json[key].position)) {
      leftBranch += json[key].point1
      leftBranchTitles.push(json[key].title)
    }
    else {
      rightBranch += json[key].point1
      rightBranchTitles.push(json[key].title)
    }
  }
  if (leftBranch > rightBranch)
    return [leftBranchTitles, rightBranchTitles]

  else
    return [rightBranchTitles, leftBranchTitles]
}
function findLeftSideOfTree(number) {
  const power = Math.floor(Math.log2(number + 2))
  const result = 2 ** power
  const lowerBound = result - 2
  const upperBound = result - 1 + 2 ** (power - 1)
  return number > lowerBound && number < upperBound
}
