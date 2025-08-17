// 28 İNDE ÇAILISIR HER AYIN
import Invitation from '../models/invitation'
import saleAccount from '../models/saleAccount'
import userWeeklyMonthlyTable from '../models/userWeeklyMonthlyTable'
import giveEslestirmeBonusu from './bonuslar/giveEslestirmeBonusu'
import giveLiderlikBonusu from './bonuslar/giveLiderlikBonusu'
import giveKariyerBonusu from './bonuslar/giveKariyerBonusuOrPayKariyerBonusu'
import saveMonthlyData from './bonuslar/saveMonthlyData'
import resetTheTreePoints from './bonuslar/resetTheTreePoints'
import checkResetDoneCorrectly from './bonuslar/checkResetDoneCorrectly'
import resetMonthlyDataInSaleAccountandPayConfirmedBalance from './bonuslar/resetMonthlyDataInSaleAccountandPayConfirmedBalance'
import resetTheSaleAccount from './bonuslar/resetTheSaleAccount'
import Sponsors from '../models/sponsors'
import deleteIfInactive from './bonuslar/uye/deleteIfInactive'
import checkAlreadyDone from './bonuslar/checkAlreadyDone'
import User from '../models/user'
import locker from './providers/locker'

const SaleAccount = saleAccount()
const invitation = Invitation()
const UserWeeklyMonthlyTable = userWeeklyMonthlyTable()
const sponsors = Sponsors()
const user = User()

export default async function montlyCheckFunc(id,owner_id) {
  // Eşleştirme bonusu eklenicek
  if(!id)
    return new Error('id is required')
  if(!owner_id)
    return new Error('owner_id is required')

  const pathcedSaleAccount = await SaleAccount.findByPk(id)
  if (!pathcedSaleAccount)
  return new Error('Sale Account not found')

  // Lock "invitationBySaleAccount.${usersTreeForLock.saleAccount_id}"
 const usersTree = await invitation.findOne({ where: { sale_account_id: pathcedSaleAccount.id } })
  if (!usersTree)
    return new Error('User Tree not found')
  // Lock "usersSponsorsByUserId.${pathcedSaleAccount.owner_id}"
  const usersSponsors = await sponsors.findOne({ where: { owner_id: pathcedSaleAccount.owner_id } })
  if (!usersSponsors)
    return new Error('User Sponsors not found')
console.log(usersTree.self_tree_positions[owner_id].point1,pathcedSaleAccount.self_gained_point1);
  if (usersTree.self_tree_positions[owner_id].point1 >= 100 && pathcedSaleAccount.self_gained_point1 >= 100) {
    // Check if already done
    
    
     const alreadyDone = await checkAlreadyDone(UserWeeklyMonthlyTable, id)
     if (alreadyDone)
       return new Error('Already Done the monhtly reset')

    // CHECKED TESTED OPTIMIZED WORKING FULLY NO CHANGE NEEDED
    const givenEslestirmeBonusu = await giveEslestirmeBonusu(pathcedSaleAccount) // DONE NO PROBLEM
    console.log(givenEslestirmeBonusu)

    // CHECKED TESTED OPTIMIZED WORKING DIDNT CHECKED THE RESULT YET
    const toPayLiderlikBonusu = await giveLiderlikBonusu(invitation, pathcedSaleAccount) // DONE NO PROBLEM GIVEN TO UNCONFIRMED BALANCE
    console.log(toPayLiderlikBonusu)

    // Talk about 2 ay önce ve 1 ay önceki ayın kendi kazandığı puan
    // One part doesnt open a lock
    const toPayKariyerBonusuAndUpdateKariyer = await giveKariyerBonusu(pathcedSaleAccount, usersSponsors, invitation) // DONE NO PROBLEMS
    console.log(toPayKariyerBonusuAndUpdateKariyer)

    const dataSaved = await saveMonthlyData(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree) // SAVE THE DATA
    console.log(dataSaved)

    const toPayOthers = await resetMonthlyDataInSaleAccountandPayConfirmedBalance(pathcedSaleAccount)
    console.log(toPayOthers)


    const fullTreeReseted = await resetTheTreePoints(usersTree)
    console.log(fullTreeReseted)

    const fullSaleAccountReseted = await resetTheSaleAccount(pathcedSaleAccount,SaleAccount)
    console.log(fullSaleAccountReseted)

    
    const resetDoneCorrectly = await checkResetDoneCorrectly(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree)
    // Unlock all
    console.log(resetDoneCorrectly)


    await locker.unlock(`saleAccount-${id}`)
    await locker.unlock(`invitation-${usersTree.id}`)
    await locker.unlock(`sponsors-${usersSponsors.id}`)
    return true
  }
  else {
    // Check this
    const alreadyDone = await checkAlreadyDone(UserWeeklyMonthlyTable, id)
    console.log(alreadyDone)
    
    if (alreadyDone){
      await locker.unlock(`saleAccount-${id}`)
      await locker.unlock(`invitation-${usersTree.id}`)
      await locker.unlock(`sponsors-${usersSponsors.id}`)
      return new Error('Already Done the monhtly reset')
    }

    const dataSaved = await saveMonthlyData(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree) // SAVE THE DATA
    console.log(dataSaved)

    // Check this
    const deleteIfInactiveReturn = await deleteIfInactive(pathcedSaleAccount, sponsors, UserWeeklyMonthlyTable, invitation, SaleAccount, user) // NOT TESTED
    console.log(deleteIfInactiveReturn)

    const fullTreeReseted = await resetTheTreePoints(usersTree)
    console.log(fullTreeReseted)

    const fullSaleAccountReseted = await resetTheSaleAccount(pathcedSaleAccount,SaleAccount)
    console.log(fullSaleAccountReseted)

    const resetDoneCorrectly = await checkResetDoneCorrectly(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree)
    console.log(resetDoneCorrectly)

    await locker.unlock(`saleAccount-${id}`)
    await locker.unlock(`invitation-${usersTree.id}`)
    await locker.unlock(`sponsors-${usersSponsors.id}`)
    return true
  }

  // AFTER THIS PART IS DONE GO CHECK THE ORDER PART
  // AFTER THIS PART IS DONE GO CHECK THE ORDER PART
  // AFTER THIS PART IS DONE GO CHECK THE ORDER PART
  // AFTER THIS PART IS DONE GO CHECK THE ORDER PART

  // LIDERLIK BONUSUNU BURADA VER

  // }
  // else{
  //     // sadece sıfırla treeyi ve dataları kaydet

  // }
}
