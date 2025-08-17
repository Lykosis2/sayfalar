import locker from "../../providers/locker";
import checkAndSolveProblems from "./checkAndSolveProblems";

export default async function tryCreatingAgain(usersSaleAccount,invitation){
    await checkAndSolveProblems(usersSaleAccount.owner_id)
    await invitation.create({ sale_account_id: mysaleAccount.id, id: mysaleAccount.invitation }).then(async (res) => {
        const currentPoint1 = res.self_tree_positions[`${mysaleAccount.owner_id}`]?.point1 || 0
        await locker.lockAndWait(`invitation-${res.id}`, 60 * 1000)
        res.self_tree_positions[`${mysaleAccount.owner_id}`] = {
          has_saleAccount: true,
          saleAccount_id: mysaleAccount.id,
          level: 0,
          balance: 0,
          point1: currentPoint1,
          position: 0,
          changeable: false,
        }
        res.changed('self_tree_positions', true)
        await res.save()
        await locker.unlock(`invitation-${res.id}`)
      },
      ).catch(async (err) => {
        await importantPanic('Error while creating invitation', err.message)
      },
      )
}