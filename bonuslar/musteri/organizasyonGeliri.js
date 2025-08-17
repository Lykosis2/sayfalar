import locker from "@/lib/providers/locker"

export default async function organizasyonGeliriVerMusteri(bireyselGelir, SaleAccount, invitation, price, owner_id) {
  const returnVal = { point1: 0, balance: 0 }
  if (bireyselGelir && bireyselGelir.level1) { // We make sure that the first level sponsor exists by this if statement
    const bireyselGelirAccount = await SaleAccount.findByPk(bireyselGelir.level1) // We find the first level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    bireyselGelirAccount.unconfirmed_balance += price * 0.23 // We add the balance to the first level sponsor as unconfirmed_balance
    bireyselGelirAccount.musteriGeliri += price * 0.23 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later
    returnVal.balance += price * 0.23

    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: bireyselGelirAccount.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 13 // We add the points to the tree as well so we can trace the points later and make caluculations
      returnVal.point1 += price / 13
      console.log(price/13);

      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.23 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${bireyselGelirAccount.id}`, 60 * 1000)
      await bireyselGelirAccount.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${bireyselGelirAccount.id}`)
      await locker.flag(bireyselGelirAccount.id)
      // return res.status(200).json({ createOrder })
    }
    else if (isInUnassignedTree) {
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 13// We add the points to the tree as well so we can trace the points later and make caluculations

      returnVal.point1 += price / 13
      console.log(price/13);

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.23 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${bireyselGelirAccount.id}`, 60 * 1000)
      await bireyselGelirAccount.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${bireyselGelirAccount.id}`)
      await locker.flag(bireyselGelirAccount.id)

      // return res.status(200).json({ createOrder })
    }
  
  }
  // ADDED DIDNT TESTED PART FROM LEVEL2 TO LEVEL5
  if (bireyselGelir && bireyselGelir.level2) {
    const organizasyonGeliri1 = await SaleAccount.findByPk(bireyselGelir.level2) // We find the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri1.unconfirmed_balance += price * 0.012 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri1.organizasyonGeliri += price * 0.012 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later

    returnVal.balance += price * 0.012
    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri1.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 26 // We add the points to the tree as well so we can trace the points later and make caluculations

      returnVal.point1 += price / 26
      console.log(price/26);


      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.012 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri1.id}`, 60 * 1000)
      await organizasyonGeliri1.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri1.id}`)
      await locker.flag(organizasyonGeliri1.id)

      // return res.status(200).json({ createOrder })
    }
    else if (isInUnassignedTree) {
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 26 // We add the points to the tree as well so we can trace the points later and make caluculations

      returnVal.point1 += price / 26
      console.log(price/26);

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.012 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri1.id}`, 60 * 1000)
      await organizasyonGeliri1.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri1.id}`)
      await locker.flag(organizasyonGeliri1.id)

      // return res.status(200).json({ createOrder })
    }
  }
  if (bireyselGelir && bireyselGelir.level3) {
    const organizasyonGeliri2 = await SaleAccount.findByPk(bireyselGelir.level3) // We find the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri2.unconfirmed_balance += price * 0.009 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri2.organizasyonGeliri += price * 0.009 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later
    returnVal.balance += price * 0.009
    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri2.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 34.6 // We add the points to the tree as well so we can trace the points later and make caluculations

      returnVal.point1 += price / 34.6
      console.log(price/34.6);

      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri2.id}`, 60 * 1000)
      await organizasyonGeliri2.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri2.id}`)
      await locker.flag(organizasyonGeliri2.id)
      // return res.status(200).json({ createOrder })
    }
    else if (isInUnassignedTree) {
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 34.6 // We add the points to the tree as well so we can trace the points later and make caluculations

      returnVal.point1 += price / 34.6
      console.log(price/34.6);
      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri2.id}`, 60 * 1000)
      await organizasyonGeliri2.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri2.id}`)
      await locker.flag(organizasyonGeliri2.id)

      // return res.status(200).json({ createOrder })
    }
  }
  if (bireyselGelir && bireyselGelir.level4) {
    const organizasyonGeliri3 = await SaleAccount.findByPk(bireyselGelir.level4) // We find the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri3.unconfirmed_balance += price * 0.009 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri3.organizasyonGeliri += price * 0.009 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later

    returnVal.balance += price * 0.009
    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri3.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations

      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      returnVal.point1 += price / 52

      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree,
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri3.id}`, 60 * 1000)
      await organizasyonGeliri3.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri3.id}`)
      await locker.flag(organizasyonGeliri3.id)

      // return res.status(200).json({ createOrder })
    }
    else if (isInUnassignedTree) {
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.009// We add the balance to the tree as well so we can trace the balance later and make caluculations
      returnVal.point1 += price / 52

      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri3.id}`, 60 * 1000)
      await organizasyonGeliri3.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri3.id}`)
      await locker.flag(organizasyonGeliri3.id)

      // return res.status(200).json({ createOrder })
    }

  }
  if (bireyselGelir && bireyselGelir.level5) {
    const organizasyonGeliri4 = await SaleAccount.findByPk(bireyselGelir.level5) // We find the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri4.unconfirmed_balance += price * 0.009 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri4.organizasyonGeliri += price * 0.009 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later
    returnVal.balance += price * 0.009
    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri4.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations
      returnVal.point1 += price / 52

      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri4.id}`, 60 * 1000)
      await organizasyonGeliri4.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri4.id}`)
      await locker.flag(organizasyonGeliri4.id)

      // return res.status(200).json({ createOrder })
    }
    else if (isInUnassignedTree) {
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations
      returnVal.point1 += price / 52

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.009 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri4.id}`, 60 * 1000)
      await organizasyonGeliri4.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri4.id}`)
      await locker.flag(organizasyonGeliri4.id)

      // return res.status(200).json({ createOrder })
    }
  }
  if (bireyselGelir && bireyselGelir.level6) {
    const organizasyonGeliri5 = await SaleAccount.findByPk(bireyselGelir.level6) // We find the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri5.unconfirmed_balance += price * 0.006 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri5.organizasyonGeliri += price * 0.006 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later
    returnVal.balance += price * 0.006
    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri5.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return

    if (isInSelfTree) {
      invitationOfSponsor.self_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations

      invitationOfSponsor.self_tree_positions[owner_id].balance += price * 0.006 // We add the balance to the tree as well so we can trace the balance later and make caluculations
      returnVal.point1 += price / 52
      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree,
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri5.id}`, 60 * 1000)
      await organizasyonGeliri5.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri5.id}`)
      await locker.flag(organizasyonGeliri5.id)

      // return res.status(200).json({ createOrder })
    }
    else if (isInUnassignedTree) {
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += price / 52 // We add the points to the tree as well so we can trace the points later and make caluculations

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += price * 0.006 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      returnVal.point1 += price / 52
      invitationOfSponsor.changed('unassigned_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri5.id}`, 60 * 1000)
      await organizasyonGeliri5.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri5.id}`)
      await locker.flag(organizasyonGeliri5.id)

      // return res.status(200).json({ createOrder })
    }
  }
  return returnVal
}
