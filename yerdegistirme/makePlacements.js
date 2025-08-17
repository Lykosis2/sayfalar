import importantPanic from "../errorHandle/importantPanic"
import locker from "../providers/locker"

export default async function makePlacements(userInvit, placements) {
  try{
    placements.forEach((element) => {
      Object.keys(element).forEach((key) => {
        userInvit.self_tree_positions[key].position = element[key]
      })
    })
    userInvit.changed('self_tree_positions', true) // Do this at the end
    await locker.lockAndWait(`invitation-${userInvit.sale_account_id}`, 60 * 1000)
    await userInvit.save().catch(async err => await importantPanic('Invitation not found','fixTree'))
    await locker.unlock(`invitation-${userInvit.sale_account_id}`)
  }
  catch(err){
    await importantPanic('Invitation not found','fixTree')
  }
}
