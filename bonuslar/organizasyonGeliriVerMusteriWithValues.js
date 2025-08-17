import locker from "../providers/locker"

export default async function organizasyonGeliriVerMusteriWithValues(totalPriceCalc, SaleAccount, invitation, owner_id, users_sponsors) {
  if (users_sponsors && users_sponsors.level1) { // We make sure that the first level sponsor exists by this if statement
    const bireyselGelirAccount = await SaleAccount.findByPk(users_sponsors.level1) // We find the first level sponsor saleAccount
    console.log(bireyselGelirAccount) // We log the first level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    bireyselGelirAccount.unconfirmed_balance += totalPriceCalc[0] ?? 0
    bireyselGelirAccount.musteriGeliri += totalPriceCalc[0] ?? 0

    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: bireyselGelirAccount.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return 
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.self_tree_positions[owner_id].point1 += (totalPriceCalc[0] ?? 0) * 0.15 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.self_tree_positions[owner_id].balance += (totalPriceCalc[0] ?? 0) * 0.44 // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += (totalPriceCalc[0] ?? 0)

      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += (totalPriceCalc[0] ?? 0)

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
  if (users_sponsors && users_sponsors.level2) {
    const organizasyonGeliri1 = await SaleAccount.findByPk(users_sponsors.level2) // We find the second level sponsor saleAccount
    console.log(organizasyonGeliri1) // We log the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri1.unconfirmed_balance += (totalPriceCalc[1] ?? 0)
    organizasyonGeliri1.organizasyonGeliri += (totalPriceCalc[1] ?? 0)

    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri1.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.self_tree_positions[owner_id].point1 += (totalPriceCalc[1] ?? 0) * 0.15 / 2 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.self_tree_positions[owner_id].balance += (totalPriceCalc[1] ?? 0) // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += (totalPriceCalc[1] ?? 0) * 0.15 / 2 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += (totalPriceCalc[1] ?? 0) // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
  if (users_sponsors && users_sponsors.level3) {
    const organizasyonGeliri2 = await SaleAccount.findByPk(users_sponsors.level3) // We find the second level sponsor saleAccount
    console.log(organizasyonGeliri2) // We log the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri2.unconfirmed_balance += totalPriceCalc[2] ?? 0 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri2.organizasyonGeliri += totalPriceCalc[2] ?? 0 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later

    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri2.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.self_tree_positions[owner_id].point1 += (totalPriceCalc[2] ?? 0) * 0.15 / 8 * 3 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.self_tree_positions[owner_id].balance += (totalPriceCalc[2] ?? 0) * 0.03 // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += (totalPriceCalc[2] ?? 0) * 0.15 / 8 * 3 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += (totalPriceCalc[2] ?? 0) * 0.03 // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
  if (users_sponsors && users_sponsors.level4) {
    const organizasyonGeliri3 = await SaleAccount.findByPk(users_sponsors.level4) // We find the second level sponsor saleAccount
    console.log(organizasyonGeliri3) // We log the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri3.unconfirmed_balance += totalPriceCalc[3] ?? 0 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri3.organizasyonGeliri += totalPriceCalc[3] ?? 0 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later

    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri3.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.self_tree_positions[owner_id].point1 += (totalPriceCalc[3] ?? 0) * 0.15 / 8 * 2 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.self_tree_positions[owner_id].balance += totalPriceCalc[3] ?? 0 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri3.id}`, 60 * 1000)
      await organizasyonGeliri3.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri3.id}`)
      await locker.flag(organizasyonGeliri3.id)

      // return res.status(200).json({ createOrder })
    }
    else if (isInUnassignedTree) {
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += (totalPriceCalc[3] ?? 0) * 0.15 / 8 * 2 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += totalPriceCalc[3] ?? 0 // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
  if (users_sponsors && users_sponsors.level5) {
    const organizasyonGeliri4 = await SaleAccount.findByPk(users_sponsors.level5) // We find the second level sponsor saleAccount
    console.log(organizasyonGeliri4) // We log the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri4.unconfirmed_balance += totalPriceCalc[4] ?? 0 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri4.organizasyonGeliri += totalPriceCalc[4] ?? 0 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later

    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri4.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.self_tree_positions[owner_id].point1 += (totalPriceCalc[4] ?? 0) * 0.15 / 8 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.self_tree_positions[owner_id].balance += totalPriceCalc[4] ?? 0 // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += (totalPriceCalc[4] ?? 0) * 0.15 / 8 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += totalPriceCalc[4] ?? 0 // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
  if (users_sponsors && users_sponsors.level6) {
    const organizasyonGeliri5 = await SaleAccount.findByPk(users_sponsors.level6) // We find the second level sponsor saleAccount
    console.log(organizasyonGeliri5) // We log the second level sponsor saleAccount
    // Bireysel gelir + Müsteri Primi
    organizasyonGeliri5.unconfirmed_balance += totalPriceCalc[5] ?? 0 // We add the balance to the first level sponsor as unconfirmed_balance
    organizasyonGeliri5.organizasyonGeliri += totalPriceCalc[5] ?? 0 // We add the balance to the first level sponsor as musteriGeliri so we can trace the balance later

    //  Müsteri bonusu hesaplama bu kısımı buradan al ay sonunda ağaç üzerinden bak toplam üyelerden kazanılan puandan bu bonusu ver

    // We find the invitation table of the sponsor dont forget that all tree operations are done in the invitation table
    const invitationOfSponsor = await invitation.findOne({ where: { sale_account_id: organizasyonGeliri5.id } })
    const isInSelfTree = !!invitationOfSponsor.self_tree_positions[owner_id]
    const isInUnassignedTree = !!invitationOfSponsor.unassigned_tree_positions[owner_id]
    if (!invitationOfSponsor && isInSelfTree && isInUnassignedTree)
      return // If the user is not in the tree we return
    if (isInSelfTree) {
      console.log(invitationOfSponsor.self_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.self_tree_positions[owner_id].point1 += (totalPriceCalc[5] ?? 0) * 0.15 / 8 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.self_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.self_tree_positions[owner_id].balance += totalPriceCalc[5] ?? 0 // We add the balance to the tree as well so we can trace the balance later and make caluculations

      invitationOfSponsor.changed('self_tree_positions', true) // We flag the self_tree_positions as changed so it can be saved because objects uses references in javascript

      await locker.lockAndWait(`invitation-${invitationOfSponsor.sale_account_id}`, 60 * 1000)
      await invitationOfSponsor.save() // We save the first level sponsors tree
      await locker.unlock(`invitation-${invitationOfSponsor.sale_account_id}`)

      await locker.lockAndWait(`saleAccount-${organizasyonGeliri5.id}`, 60 * 1000)
      await organizasyonGeliri5.save() // We save the first level sponsor account
      await locker.unlock(`saleAccount-${organizasyonGeliri5.id}`)
      await locker.flag(organizasyonGeliri5.id)

      // return res.status(200).json({ createOrder })
    }
    else if (isInUnassignedTree) {
      console.log(invitationOfSponsor.unassigned_tree_positions) // We log the tree of the first level sponsor
      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the points that the buyer made the first level sponsor gain
      invitationOfSponsor.unassigned_tree_positions[owner_id].point1 += (totalPriceCalc[5] ?? 0) * 0.15 / 8 // We add the points to the tree as well so we can trace the points later and make caluculations

      console.log(invitationOfSponsor.unassigned_tree_positions[owner_id].point1) // We log the incremented points

      invitationOfSponsor.unassigned_tree_positions[owner_id].balance += totalPriceCalc[5] ?? 0 // We add the balance to the tree as well so we can trace the balance later and make caluculations

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
}
