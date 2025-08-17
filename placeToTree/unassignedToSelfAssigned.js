import findInvalidKeys from '../check/findInvalidKey'
import findSmallBranch from '../findSmallBranch'
import locker from '../providers/locker'
import findAllPositions from '../yerdegistirme/findAllPositions'
import calculatePlacement from './calculatePlacements'
import errorRecalculate from './errorRecalculate'

export default async function unassignedToSelfTree(invitation, usersSaleAccount) {
  try {
    // Put unassigned to self tree

    const pos = findSmallBranch(invitation.self_tree_positions)
    console.log(pos);
    const positionArray = await findAllPositions(invitation.self_tree_positions)
    console.log(positionArray);
    const positions = await calculatePlacement(invitation, positionArray, pos[2])
    console.log(positions);
    await Promise.all(
      Object.keys(invitation.unassigned_tree_positions).map(async (user, index) => {
        invitation.unassigned_tree_positions[user].position = positions[index]
      }),
    )
    invitation.self_tree_positions = { ...invitation.self_tree_positions, ...invitation.unassigned_tree_positions }
    invitation.unassigned_tree_positions = {}
    invitation.changed('self_tree_positions', true)
    invitation.changed('unassigned_tree_positions', true)

    await locker.lockAndWait(`invitation-${invitation.sale_account_id}`, 60 * 1000)
    await invitation.save()
    await locker.unlock(`invitation-${invitation.sale_account_id}`)

    // Recalculate real_point1
    const afterPos = findSmallBranch(invitation.self_tree_positions)

    if (afterPos[2]) {
      console.log(afterPos[0] * 0.4 + afterPos[1] * 0.6 + afterPos[3]);
      usersSaleAccount.real_point1 = afterPos[0] * 0.4 + afterPos[1] * 0.6 + afterPos[3]
      await locker.lockAndWait(`saleAccount-${usersSaleAccount.id}`, 60 * 1000)
      await usersSaleAccount.save()
      await locker.unlock(`saleAccount-${usersSaleAccount.id}`)
    }
    else {
      console.log(invitation.self_tree_positions);
      console.log(invitation.sale_account_id);
      console.log(invitation.sale_account_id === "465dad7b-7bc2-45b4-b685-81aa656ad9ae")
      if(invitation.sale_account_id === "465dad7b-7bc2-45b4-b685-81aa656ad9ae"){
        console.log("here");
        console.log(afterPos[0] * 0.6 + afterPos[1] * 0.4 + afterPos[3]);
      }
      console.log(afterPos[0] * 0.6 + afterPos[1] * 0.4 + afterPos[3]);
      usersSaleAccount.real_point1 = afterPos[0] * 0.6 + afterPos[1] * 0.4 + afterPos[3]
      await locker.lockAndWait(`saleAccount-${usersSaleAccount.id}`, 60 * 1000)
      await usersSaleAccount.save()
      await locker.unlock(`saleAccount-${usersSaleAccount.id}`)
    }
    let check = findInvalidKeys(invitation.self_tree_positions)
    let retries = 0
    if ((check.length > 0 || Object.keys(invitation.unassigned_tree_positions).length > 0) && retries < 10) {
      // Reposition the tree

      const error = await errorRecalculate(check, positionArray, afterPos[2])
      await Promise.all(
        error.map(async (user, index) => {
          invitation.self_tree_positions[check[index]].position = error[index]
        }),
      ),
      invitation.changed('self_tree_positions', true)
      await locker.lockAndWait(`invitation-${invitation.sale_account_id}`, 60 * 1000)
      await invitation.save()
      await locker.unlock(`invitation-${invitation.sale_account_id}`)
      check = findInvalidKeys(invitation.self_tree_positions)
      retries++
    }
    if (retries >= 10) {
      await importantPanic('retries exceeded 10')
    }
  }
  catch (e) {
  console.log(e);
   await importantPanic(e)
  }
}
