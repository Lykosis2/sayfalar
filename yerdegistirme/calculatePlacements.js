import findLeftSideOfTree from '../findLeftSideOfTree'

export default async function calculatePlacement(changed, emptyPositions, changeablePositions) {
  // const placements = [];

  const emptyPositionsLeftTree = []
  const emptyPositionsRightTree = []
  const placement = []
  const leftSide = []
  const rightSide = []

  emptyPositions.forEach((element) => {
    if (findLeftSideOfTree(element))
      emptyPositionsLeftTree.push(element)
    else emptyPositionsRightTree.push(element)
  })
  changed.forEach((key) => {
    if (!changeablePositions.includes(key.position))
      return
    findLeftSideOfTree(key.position) ? leftSide.push(key) : rightSide.push(key)
  })

  if (leftSide.length === rightSide.length) {
    leftSide.forEach((element, index) => {
      placement.push({ [element.id]: rightSide[index].position })
      placement.push({ [rightSide[index].id]: element.position })
    })
    return [true, placement]
  }
  if (leftSide.length > rightSide.length) {
    console.log('here')
    while (emptyPositionsRightTree.length > 0 && leftSide.length > rightSide.length) {
      placement.push({ [leftSide[0].id]: emptyPositionsRightTree[0] })
      console.log(placement)
      emptyPositionsRightTree.shift()
      leftSide.shift()
    }
    if (leftSide.length === 0 && rightSide.length === 0)
      return [true, placement]
    if (leftSide.length === rightSide.length) {
      leftSide.forEach((element, index) => {
        placement.push({ [element.id]: rightSide[index].position })
        placement.push({ [rightSide[index].id]: element.position })
        console.log(placement)

        leftSide.shift()
        rightSide.shift()
      })
    }
    else { return [false, null] }
  }

  if (rightSide.length > leftSide.length) {
    while (emptyPositionsLeftTree.length > 0 && rightSide.length > leftSide.length) {
      placement.push({ [rightSide[0].id]: emptyPositionsLeftTree[0] })
      console.log(placement)
      emptyPositionsLeftTree.shift()
      rightSide.shift()
    }

    if (leftSide.length === 0 && rightSide.length === 0)
      return [true, placement]
    if (leftSide.length === rightSide.length) {
      rightSide.forEach((element, index) => {
        placement.push({ [element.id]: leftSide[index].position })
        placement.push({ [leftSide[index].id]: element.position })
        console.log(placement)
        leftSide.shift()
        rightSide.shift()
      })
    }

    else { return [false, null] }
  }
  return [true, placement]
}
