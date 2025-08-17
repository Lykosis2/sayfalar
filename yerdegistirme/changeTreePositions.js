import noInvitation from '../errorHandle/CheckTree/noInvitation'
import informTheAdmin from '../errorHandle/informTheAdmin'
import locker from '../providers/locker'
import calculateAllPosibilePositions from './calculateAllPosibilePositions'
import calculatePlacement from './calculatePlacements'
import checkInput from './checkInput'
import makePlacements from './makePlacements'

// Optimize this function
export default async function changeTreePositions(changed, sale_account_id, invitation,saleAccount) {
  try{

    const userInvitation = await invitation.findOne({ where: { sale_account_id } }).catch(async err => await importantPanic('Invitation not found','fixTree'))
    // if(Object.keys(userInvitation.self_tree_positions).length <= 7) return false // TODO CHECK THIS
    if(!userInvitation){
      await noInvitation(sale_account_id,invitation,saleAccount)
    }
    const makeSureInputTrue = await checkInput(userInvitation, changed)
    console.log(makeSureInputTrue)
    if (!makeSureInputTrue)
      return false
    const [emptyPositions, changeablePositions] = await calculateAllPosibilePositions(userInvitation.self_tree_positions)
    console.log(emptyPositions)
    console.log(changeablePositions)
    const [possible, placements] = await calculatePlacement(changed, emptyPositions, changeablePositions)
    console.log(placements)
    console.log(possible)
    if (possible) {
      const placementDone = await makePlacements(userInvitation, placements)
      await locker.flag(sale_account_id)
      // await checkDoneCorrectly() TODO IMPLEMENT THIS
      return placements
    }
    return false
  }
  catch(err){
    await informTheAdmin(err,'changeTreePositions')
    return false
  }
}
