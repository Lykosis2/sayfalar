import findWhichPositionAvailable from '../findWhichPositionAvailable'
import findAllPositions from './findAllPositions'

export default async function calculateAllPosibilePositions(userInvitation) {
  // Calculate all empty positions

  const allPos = await findAllPositions(userInvitation)
  const possiblePositions = await findWhichPositionAvailable(allPos)
  console.log(possiblePositions)
  const changeablePositions = []
  Object.keys(userInvitation).forEach((element) => {
    if (userInvitation[element].changeable)
      changeablePositions.push(userInvitation[element].position)
  })
  console.log(possiblePositions)
  console.log(changeablePositions)
  return [possiblePositions, changeablePositions]
}
