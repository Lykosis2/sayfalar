import locker from "../providers/locker"

export default async function resetTheTreePoints(usersTree) {
  const fullTree = usersTree.self_tree_positions
  const processInvitation = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        // 1 adet olucak zaten ancak 1 den fazla aynı anda gelirse ne oluyor bak
        for (const key in fullTree) {
          fullTree[key].point1 = 0
          fullTree[key].balance = 0
        }
        usersTree.changed('self_tree_positions', true)
        await locker.lockAndWait(`invitation-${usersTree.sale_account_id}`, 60 * 1000)
        await usersTree.save()
        await locker.unlock(`invitation-${usersTree.sale_account_id}`)
        resolve(true)
      }
      catch (error) {
        reject(false)
      }
    })
  }
  const returnedVal = await processInvitation()
  console.log(returnedVal)
  return returnedVal
}
