import findLeftSideOfTree from './findLeftSideOfTree'

export default function findSmallBranch(json) {
  let leftBranch = 0
  let rightBranch = 0
  let self = 0

  for (const key in json) {
    if (json[key].position === 0) {
      self = json[key].point1
      continue
    }
    if (findLeftSideOfTree(json[key].position))
      leftBranch += json[key].point1

    else
      rightBranch += json[key].point1
  }

  return [leftBranch, rightBranch, leftBranch > rightBranch, self]
}
