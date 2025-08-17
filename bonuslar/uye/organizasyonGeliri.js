import locker from "@/lib/providers/locker"

export default async function organizasyonGeliriVer(thisSponsors, SaleAccount, invitation, price, owner_id) {
  const changedArray = []
  if (thisSponsors.level2) {
    // Organizasyon geliri calculation 5% for the person that invited the first level sponsor
    // Organizasyon geliri has the same logic as the ekip geliri but the values are different

    const organizasyonGeliri1 = await SaleAccount.findByPk(thisSponsors.level2) // We find the second level sponsor if exists
    organizasyonGeliri1.unconfirmed_balance += price * 0.012 // We add the balance to the second level sponsor as unconfirmed_balance
    organizasyonGeliri1.organizasyonGeliri += price * 0.012 // We add the balance to the second level sponsor as organizasyonGeliri so we can trace the balance later
    organizasyonGeliri1.point1 += price / 26 // We add the points to the second level sponsor as point1 we changed the value we added /2 cuz they will take less points than the first level sponsor or the buyer

    // Organizasyon geliri agacta dagitim
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri1.id } }) // We find the invitation table of the second level sponsor
    console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the second level sponsor
    console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the second level sponsor gain
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      const level2beforeUpdatePoint = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(level2beforeUpdatePoint)
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 26 // We add the points to the tree as well so we can trace the points later and make caluculations
      // depending on the tree
      const level2afterUpdatePoint = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(level2afterUpdatePoint)

      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points

      const level2beforeUpdateBalance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(level2beforeUpdateBalance)
      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.012 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const level2afterUpdateBalance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(level2afterUpdateBalance)
      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri1) // We log the second level sponsor account
      console.log(`eklenen ${price * 0.05}`) // We log the added balance to the second level sponsor
      
      await locker.lockAndWait(`saleAccount-${organizasyonGeliri1.id}`, 60 * 1000)
      await organizasyonGeliri1.save() // We save the second level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri1.id}`)
      await locker.flag(organizasyonGeliri1.id)

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the second level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
    else if (isInUnassignedTree) {
      const level2beforeUpdatePoint = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(level2beforeUpdatePoint)
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 26 // We add the points to the tree as well so we can trace the points later and make caluculations
      // depending on the tree
      const level2afterUpdatePoint = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(level2afterUpdatePoint)
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points
      const level2beforeUpdateBalance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(level2beforeUpdateBalance)
      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.012 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const level2afterUpdateBalance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(level2afterUpdateBalance)
      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri1) // We log the second level sponsor account
      console.log(`eklenen ${price * 0.05}`) // We log the added balance to the second level sponsor
      await locker.lockAndWait(`saleAccount-${organizasyonGeliri1.id}`, 60 * 1000)
      await organizasyonGeliri1.save() // We save the second level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri1.id}`)
      await locker.flag(organizasyonGeliri1.id)

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the second level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
  }

  if (thisSponsors.level3) {
    // Organizasyon geliri calculation 4% for the person that invited the second level sponsor
    const organizasyonGeliri2 = await SaleAccount.findByPk(thisSponsors.level3) // We find the third level sponsor if exists

    organizasyonGeliri2.unconfirmed_balance += price * 0.009 // We add the balance to the third level sponsor as unconfirmed_balance
    organizasyonGeliri2.organizasyonGeliri += price * 0.009 // We add the balance to the third level sponsor as organizasyonGeliri so we can trace the balance later
    organizasyonGeliri2.point1 += price / 34.6 // We add the points to the third level sponsor as point1 we changed the value we added /8 cuz they will take less points than the first level sponsor or the buyer
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri2.id } }) // We find the invitation table of the third level sponsor

    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the third level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the third level sponsor gain
      const beforeUpdateLevel3point1 = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(beforeUpdateLevel3point1)
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 34.6 // We add the points to the tree as well so we can trace the points later and make caluculations
      const afterUpdateLevel3point1 = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(afterUpdateLevel3point1)
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented
      const beforeUpdateLevel3balance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(beforeUpdateLevel3balance)
      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const afterUpdateLevel3balance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(afterUpdateLevel3balance)
      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri2) // We log the third level sponsor account
      console.log(`eklenen ${price * 0.03}`) // We log the added balance to the third level sponsor

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri2.id}`, 60 * 1000)
      await organizasyonGeliri2.save() // We save the third level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri2.id}`)
      await locker.flag(organizasyonGeliri2.id)
      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the third level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
    else if (isInUnassignedTree) {
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the third level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the third level sponsor gain
      const beforeUpdateLevel3point1 = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(beforeUpdateLevel3point1)
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 34.6 // We add the points to the tree as well so we can trace the points later and make caluculations
      const afterUpdateLevel3point1 = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(afterUpdateLevel3point1)
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented
      const beforeUpdateLevel3balance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(beforeUpdateLevel3balance)
      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const afterUpdateLevel3balance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(afterUpdateLevel3balance)
      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri2) // We log the third level sponsor account
      console.log(`eklenen ${price * 0.03}`) // We log the added balance to the third level sponsor

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri2.id}`, 60 * 1000)
      await organizasyonGeliri2.save() // We save the third level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri2.id}`)
      await locker.flag(organizasyonGeliri2.id)
      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the third level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
  }

  if (thisSponsors.level4) {
    const organizasyonGeliri3 = await SaleAccount.findByPk(thisSponsors.level4) // We find the fourth level sponsor if exists
    organizasyonGeliri3.unconfirmed_balance += price * 0.009 // We add the balance to the fourth level sponsor as unconfirmed_balance
    organizasyonGeliri3.organizasyonGeliri += price * 0.009 // We add the balance to the fourth level sponsor as organizasyonGeliri so we can trace the balance later
    organizasyonGeliri3.point1 += price / 52 // We add the points to the fourth level sponsor as point1 we changed the value we added /8 cuz they will take less points than the first level sponsor or the buyer
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri3.id } }) // We find the invitation table of the fourth level sponsor
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the fourth level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the fourth level sponsor gain
      const beforeUpdatelevel4Point1 = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(beforeUpdatelevel4Point1)
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations
      const afterUpdateLevel4point1 = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(afterUpdateLevel4point1)
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented
      const beforeUpdateLevel4balance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(beforeUpdateLevel4balance)
      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const afterUpdateLevel4Balance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(afterUpdateLevel4Balance)
      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri3) // We log the fourth level sponsor account
      console.log(`eklenen ${price * 0.03}`) // We log the added balance to the fourth level sponsor

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri3.id}`, 60 * 1000)
      await organizasyonGeliri3.save() // We save the fourth level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri3.id}`)
      await locker.flag(organizasyonGeliri3.id)
      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the fourth level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
    else if (isInUnassignedTree) {
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the fourth level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the fourth level sponsor gain
      const beforeUpdatelevel4Point1 = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(beforeUpdatelevel4Point1)
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations
      const afterUpdateLevel4point1 = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(afterUpdateLevel4point1)
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented
      const beforeUpdateLevel4balance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(beforeUpdateLevel4balance)
      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const afterUpdateLevel4Balance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(afterUpdateLevel4Balance)
      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri3) // We log the fourth level sponsor account
      console.log(`eklenen ${price * 0.03}`) // We log the added balance to the fourth level sponsor

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri3.id}`, 60 * 1000)
      await organizasyonGeliri3.save() // We save the fourth level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri3.id}`)
      await locker.flag(organizasyonGeliri3.id)
      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the fourth level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
  }
  if (thisSponsors.level5) {
    const organizasyonGeliri4 = await SaleAccount.findByPk(thisSponsors.level5) // We find the fifth level sponsor if exists
    organizasyonGeliri4.unconfirmed_balance += price * 0.009 // We add the balance to the fifth level sponsor as unconfirmed_balance
    organizasyonGeliri4.organizasyonGeliri += price * 0.009 // We add the balance to the fifth level sponsor as organizasyonGeliri so we can trace the balance later
    organizasyonGeliri4.point1 += price / 52 // We add the points to the fifth level sponsor as point1 we changed the value we added /8 cuz they will take less points than the first level sponsor or the buyer
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri4.id } }) // We find the invitation table of the fifth level sponsor
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the fifth level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the fifth level sponsor gain
      const level5beforeupdatepoint = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(level5beforeupdatepoint)
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations
      const level5afterupdatepoint1 = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(level5afterupdatepoint1)
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points
      const level5beforeupdatebalance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(level5beforeupdatebalance)
      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const level5afterupdatebalance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(level5afterupdatebalance)
      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri4) // We log the fifth level sponsor account
      console.log(`eklenen ${price * 0.03}`) // We log the added balance to the fifth level sponsor
      await locker.lockAndWait(`saleAccount-${organizasyonGeliri4.id}`, 60 * 1000)
      await organizasyonGeliri4.save() // We save the fifth level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri4.id}`)
      await locker.flag(organizasyonGeliri4.id)
      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the fifth level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
    else if (isInUnassignedTree) {
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the fifth level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the fifth level sponsor gain
      const level5beforeupdatepoint = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(level5beforeupdatepoint)
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations
      const level5afterupdatepoint1 = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(level5afterupdatepoint1)
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points
      const level5beforeupdatebalance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(level5beforeupdatebalance)
      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const level5afterupdatebalance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(level5afterupdatebalance)
      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri4) // We log the fifth level sponsor account
      console.log(`eklenen ${price * 0.03}`) // We log the added balance to the fifth level sponsor

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri4.id}`, 60 * 1000)
      await organizasyonGeliri4.save() // We save the fifth level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri4.id}`)
      await locker.flag(organizasyonGeliri4.id)
      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the fifth level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
  }
  if (thisSponsors.level6) {
    const organizasyonGeliri5 = await SaleAccount.findByPk(thisSponsors.level6) // We find the fifth level sponsor if exists
    organizasyonGeliri5.unconfirmed_balance += price * 0.006 // We add the balance to the fifth level sponsor as unconfirmed_balance
    organizasyonGeliri5.organizasyonGeliri += price * 0.006 // We add the balance to the fifth level sponsor as organizasyonGeliri so we can trace the balance later
    organizasyonGeliri5.point1 += price / 52 // We add the points to the fifth level sponsor as point1 we changed the value we added /8 cuz they will take less points than the first level sponsor or the buyer
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri5.id } }) // We find the invitation table of the fifth level sponsor
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the fifth level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the fifth level sponsor gain
      const level5beforeupdatepoint = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(level5beforeupdatepoint)
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations
      const level5afterupdatepoint1 = invitationOfSponsor.self_tree_positions[owner_id].point1
      changedArray.push(level5afterupdatepoint1)
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points
      const level5beforeupdatebalance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(level5beforeupdatebalance)
      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.006 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const level5afterupdatebalance = invitationOfSponsor.self_tree_positions[owner_id].balance
      changedArray.push(level5afterupdatebalance)
      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri5) // We log the fifth level sponsor account
      console.log(`eklenen ${price * 0.03}`) // We log the added balance to the fifth level sponsor

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri5.id}`, 60 * 1000)
      await organizasyonGeliri5.save() // We save the fifth level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri5.id}`)
      await locker.flag(organizasyonGeliri5.id)
      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the fifth level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
    else if (isInUnassignedTree) {
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the fifth level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the fifth level sponsor gain
      const level5beforeupdatepoint = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(level5beforeupdatepoint)
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations
      const level5afterupdatepoint1 = invitationOfSponsor.unassigned_tree_positions[owner_id].point1
      changedArray.push(level5afterupdatepoint1)
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points
      const level5beforeupdatebalance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(level5beforeupdatebalance)
      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.006 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      const level5afterupdatebalance = invitationOfSponsor.unassigned_tree_positions[owner_id].balance
      changedArray.push(level5afterupdatebalance)
      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript
      console.log(organizasyonGeliri5) // We log the fifth level sponsor account
      console.log(`eklenen ${price * 0.03}`) // We log the added balance to the fifth level sponsor
      
      await locker.lockAndWait(`saleAccount-${organizasyonGeliri5.id}`, 60 * 1000)
      await organizasyonGeliri5.save() // We save the fifth level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri5.id}`)
      await locker.flag(organizasyonGeliri5.id)
      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the fifth level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)
    }
    
  }
  // TODO TURN CHANGEDARRAY TO OBJECT
  return changedArray
}
