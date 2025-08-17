import locker from "@/lib/providers/locker"

export default async function ekipGeliriVer(thisSponsors, SaleAccount, invitation, price, owner_id) {
  // Finds the first level sponsor of the ÜYE
  const ekipGeliri = await SaleAccount.findByPk(thisSponsors.level1) // We find the first level sponsor if exists
  const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: ekipGeliri.id } }) // find tree of the first level sponsor
  console.log(owner_id)
  console.log(invitationOfSponsor.self_tree_positions)
  if (invitationOfSponsor.self_tree_positions[owner_id]?.position === 0) {
  // HANDLE EXCEPTION RETRIVE TO COMMIT
    return
  }

  console.log(ekipGeliri)
  // Adds the balance to the first level sponsors account as unconfirmed_balance
  ekipGeliri.unconfirmed_balance += price * 0.045

  // Adds the point to the first level sponsors account as ekipGeliri so it can be traced later which point is gained from which bonus
  ekipGeliri.ekipGeliri += price * 0.045
  // While we have the first sponsor we add the points to this sponsor as well we will add the whole points to the buyer and the first level sponsor so we dont divide the original points
  // Which is price * 0.15  we will divide this accordingly after the first sponsor
  ekipGeliri.point1 += price / 13 // PUAN DAGITIMI 1.BASAMAK

  // Now we will make changes accordingly in the tree
  // The tree part is all about invitation table so we will find the invitation table of the first level sponsor
  const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
  const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
  if (invitationOfSponsor && isInSelfTree && isInUnassignedTree)
    return // If the user is not in the tree we return

  if (isInSelfTree) {
    const beforeUpdatePoint = invitationOfSponsor.self_tree_positions[owner_id].point1 // We log the points before the incrementation
    const beforeUpdateBalance = invitationOfSponsor.self_tree_positions[owner_id].balance // We log the balance before the incrementation
    console.log(invitationOfSponsor.self_tree_positions) // Tree of the first level sponsor
    console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // The points that buyer made the first level sponsor gain
    invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 13 // We add the points to the first level sponsors tree so we can trace the points later in the tree
    invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.045 // We add the balance to the first level sponsors tree so we can trace the balance later in the tree
    console.log(invitationOfSponsor.self_tree_positions[owner_id].balance) // Incremented balance
    console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // Incremented point1
    invitationOfSponsor.changed('self_tree_positions', true) // We need to flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

    await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
    await invitationOfSponsor.save() // We save the invitation table of sponsor level 1
    await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

    await locker.lockAndWait(`saleAccount-${ekipGeliri.id}`, 60 * 1000)
    await ekipGeliri.save() // We save the first level sponsors acount values as well in line 40
    await locker.unlock(`saleAccount-${ekipGeliri.id}`)
    await locker.flag(ekipGeliri.id)

    const afterUpdatedPoint = invitationOfSponsor.self_tree_positions[owner_id].point1 // We log the points after the incrementation
    const afterUpdatedBalance = invitationOfSponsor.self_tree_positions[owner_id].balance // We log the balance after the incrementation
    console.log(`eklenen puan ${afterUpdatedPoint - beforeUpdatePoint} - eklenen para ${afterUpdatedBalance - beforeUpdateBalance}`) // We log the added balance to the first level sponsor
    return [afterUpdatedPoint, beforeUpdatePoint, afterUpdatedBalance, beforeUpdateBalance]
  }
  else if (isInUnassignedTree) {
    const beforeUpdatePoint = invitationOfSponsor.unassigned_tree_positions[owner_id].point1 // We log the points before the incrementation
    const beforeUpdateBalance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance // We log the balance before the incrementation
    console.log(invitationOfSponsor.unassigned_tree_positions) // Tree of the first level sponsor
    console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // The points that buyer made the first level sponsor gain
    invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 13 // We add the points to the first level sponsors tree so we can trace the points later in the tree
    invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.045 // We add the balance to the first level sponsors tree so we can trace the balance later in the tree
    console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].balance) // Incremented balance
    console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // Incremented point1
    invitationOfSponsor.changed('unassigned_tree_positions', true) // We need to flag the unassigned_tree_positions as changed so it can be saved because objects uses references in javascript

    await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
    await invitationOfSponsor.save() // We save the invitation table of sponsor level 1
    await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

    await locker.lockAndWait(`saleAccount-${ekipGeliri.id}`, 60 * 1000)
    await ekipGeliri.save() // We save the first level sponsors acount values as well in line 40
    await locker.unlock(`saleAccount-${ekipGeliri.id}`)
    await locker.flag(ekipGeliri.id)

    const afterUpdatedPoint = invitationOfSponsor.unassigned_tree_positions[owner_id].point1 // We log the points after the incrementation
    const afterUpdatedBalance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance // We log the balance after the incrementation
    console.log(`eklenen puan ${afterUpdatedPoint - beforeUpdatePoint} - eklenen para ${afterUpdatedBalance - beforeUpdateBalance}`) // We log the added balance to the first level sponsor
    
    return {eklenenPuan : afterUpdatedPoint - beforeUpdatePoint, eklenenPara : afterUpdatedBalance - beforeUpdateBalance}
  }

}
