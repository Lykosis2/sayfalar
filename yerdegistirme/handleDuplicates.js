import findWhichPositionAvailable from '../findWhichPositionAvailable'
import changeDuplicatesPlaces from './changeDuplicatesPlaces'
import findAllPositionsWithUndefinedAndNull from './findAllPositionsWithUndefinedAndNull'
import placeItToGivenPlace from './placeItToGivenPlace'

export default async function handleDuplicatesOrNulls(invitation, positionArray, duplicates) {
  const falseOnes = {}
  console.log(positionArray)
  const withNulls = await findAllPositionsWithUndefinedAndNull(invitation.self_tree_positions)
  let result = await findWhichPositionAvailable(withNulls)
  console.log(result)
  console.log(withNulls)
  // handle null and undefined
  if (withNulls.includes(null) || withNulls.includes(undefined)) {
    Object.keys(invitation.self_tree_positions).forEach(async (key, index) => {
      if (invitation.self_tree_positions[key].position === null || invitation.self_tree_positions[key].position === undefined) {
        const placedPosition = await placeItToGivenPlace(invitation, result[0])
        console.log(placedPosition)
        result = await findWhichPositionAvailable([...positionArray, result[0]])
      }
    })
  }

  // else handle duplicates
  console.log(duplicates)
  const userIds = []
  Object.keys(invitation.self_tree_positions).forEach((key) => {
    console.log(invitation.self_tree_positions[key].position)

    if (invitation.self_tree_positions[key].position !== undefined && invitation.self_tree_positions[key].position !== null && duplicates.includes(invitation.self_tree_positions[key].position)) {
      userIds.push(invitation.self_tree_positions[key].position)
      if (!falseOnes[invitation.self_tree_positions[key].position])
        falseOnes[invitation.self_tree_positions[key].position] = [key]

      else
        falseOnes[invitation.self_tree_positions[key].position] = [...falseOnes[invitation.self_tree_positions[key].position], key]
    }
  })

  console.log(userIds)
  console.log(falseOnes)
  if (userIds.length === 0)
    return
  Object.keys(falseOnes).forEach(async (key, index) => {
    falseOnes[key].forEach(async (item, index) => {
      if (index > 0) {
        const placedPosition = await changeDuplicatesPlaces(invitation, item, result[0])
        console.log(placedPosition)
        result = await findWhichPositionAvailable([...positionArray, result[0]])
      }
    })
  })
  return invitation.unassigned_tree_positions
}
