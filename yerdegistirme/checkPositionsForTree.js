import findDuplicatesAndReturn from '../findDuplicatesAndReturn'
import findAllPositionsWithUndefinedAndNull from './findAllPositionsWithUndefinedAndNull'

export default async function checkPositionsForTree(invitation, positionArray, place) {
  // take all positions from self_tree_positions
  // check if there is any duplicate position
  // if there is any duplicate position change one of their position to available place
  // return [true,0] if no duplicate positions
  // return [false,place] if there is any duplicate positions

  const withNulls = await findAllPositionsWithUndefinedAndNull(invitation.self_tree_positions)

  console.log(withNulls)
  if (withNulls.includes(null) || withNulls.includes(undefined)) {
    console.log('null or undefined')
    return [false, []]
  }
  const duplicatePositions = [...positionArray, place]
  const duplicates = findDuplicatesAndReturn(duplicatePositions)

  if (!findDuplicatesAndReturn(duplicatePositions)) {
    console.log('no duplicates')
    return [true, 0]
  }
  console.log('duplicates')
  return [false, duplicates]
}
