import findLeftSideOfTree from '../findLeftSideOfTree'
import findWhichPositionsAvailable from '../findWhichPositionAvailable'

export default async function handlePlacementOfRightSide(positionArray, invitation) {
  const result = findWhichPositionsAvailable(positionArray)
  const rightSide = []
  console.log(result)
  for (const a in result) {
    if (!findLeftSideOfTree(result[a]))
      rightSide.push(result[a])
  }
  if (rightSide.length <= 0) {
    // Result[0] a koy
    console.log('sag')
    for (const key in invitation.unassigned_tree_positions) {
      invitation.unassigned_tree_positions[key].position = result[0]
      invitation.self_tree_positions = { ...invitation.self_tree_positions, ...invitation.unassigned_tree_positions }
      invitation.unassigned_tree_positions = {}
      await invitation.save()
    }
  }
  else {
    // rightSide[0] a koy
    console.log('sag')
    for (const key in invitation.unassigned_tree_positions) {
      invitation.unassigned_tree_positions[key].position = rightSide[0]
      invitation.self_tree_positions = { ...invitation.self_tree_positions, ...invitation.unassigned_tree_positions }
      invitation.unassigned_tree_positions = {}
      await invitation.save()
    }
  }
}
