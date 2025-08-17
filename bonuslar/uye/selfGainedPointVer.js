import locker from '@/lib/providers/locker'

export default async function selfGainedPointVer(selfAccount, selfInvit, price, owner_id) {
  // Adds the point to its own saleAccount as self_gained_point1
  if (selfInvit.self_tree_positions[owner_id].position !== 0) {
    // HANDLE EXCEPTION RETRIVE TO COMMIT
    return [false, false]
  }
  console.log('selfGainedPointVer');
  selfAccount.self_gained_point1 += price / 13 // kendine ver dogrulamak icin agac ile
  selfAccount.point1 += price / 13 // kendine ver
  // selfAccount.real_point1 += price * 0.15  // real_point1 sadece agacta ve eslestirmede degistirilir
  const beforeUpdatePoint = selfInvit.self_tree_positions[owner_id].point1
  console.log('selfGainedPointVer');
  selfInvit.self_tree_positions[owner_id].point1 += (price / 13) // position 0 kendisi
  console.log('selfGainedPointVer');
  selfInvit.changed('self_tree_positions', true)
  console.log('selfGainedPointVer');
  // here the problem 
  console.log(selfInvit);
  await locker.lockAndWait(`invitation-${selfInvit.sale_account_id}`, 60 * 1000)
  await selfInvit.save()
  await locker.unlock(`invitation-${selfInvit.sale_account_id}`)
  console.log("here");
  console.log(selfAccount)
  // SaleACCOUNT MODELINDE LOCK VAR PROBABLY 
  const allLocks = await locker.showAllLocks()
  console.log(allLocks)
  await locker.lockAndWait(`saleAccount-${selfAccount.id}`, 60 * 1000)
  await selfAccount.save().catch(e => console.log(e))
  await locker.unlock(`saleAccount-${selfAccount.id}`)
  await locker.flag(selfAccount.id)
  console.log('selfGainedPointVer');

  // Find its sponsor table from owner_id this will be used
  const afterUpdatePoint = selfInvit.self_tree_positions[owner_id].point1
  return {eklenenPuan: afterUpdatePoint - beforeUpdatePoint}
}
