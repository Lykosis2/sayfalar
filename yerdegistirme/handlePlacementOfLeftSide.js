import findLeftSideOfTree from '../findLeftSideOfTree'
import findWhichPositionsAvailable from '../findWhichPositionAvailable'

export default async function handlePlacementOfLeftSide(positionArray, invitation) {
  try {
    const result = findWhichPositionsAvailable(positionArray)
    const leftSide = []

    const leftSideCalculate = async () => {
      return new Promise((resolve, reject) => {
        for (const a in result) {
          if (findLeftSideOfTree(result[a]))
            leftSide.push(result[a])
        }
        resolve()
      })
    }
    await leftSideCalculate()

    if (leftSide.length <= 0) {
      // Result[0] a koy
      for (const key in invitation.unassigned_tree_positions) {
        if (key) {
          invitation.unassigned_tree_positions[key].position = result[0]
          invitation.self_tree_positions = { ...invitation.self_tree_positions, ...invitation.unassigned_tree_positions }
          invitation.unassigned_tree_positions = {}
          invitation.changed('self_tree_positions', true)
          await invitation.save()
        }
      }
    }
    else {
      // leftSide[0] a koy
      console.log(leftSide.length)
      console.log('sol')
      for (const key in invitation.unassigned_tree_positions) {
        invitation.unassigned_tree_positions[key].position = leftSide[0]
        if (key) {
          invitation.self_tree_positions = { ...invitation.self_tree_positions, ...invitation.unassigned_tree_positions }
          invitation.unassigned_tree_positions = {}
          invitation.changed('self_tree_positions', true)
          await invitation.save()
        }
      }
    }
    return true
  }

  catch (err) {
    console.log(err)
    return false
  }
}
