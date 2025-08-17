// 28 İNDE ÇAILISIR HER AYIN
import Invitation from '@/models/invitation'
import saleAccount from '@/models/saleAccount'
import userWeeklyMonthlyTable from '@/models/userWeeklyMonthlyTable'
import giveEslestirmeBonusu from '@/lib/bonuslar/giveEslestirmeBonusu'
import giveLiderlikBonusu from '@/lib/bonuslar/giveLiderlikBonusu'
import giveKariyerBonusu from '@/lib/bonuslar/giveKariyerBonusuOrPayKariyerBonusu'
import saveMonthlyData from '@/lib/bonuslar/saveMonthlyData'
import resetTheTreePoints from '@/lib/bonuslar/resetTheTreePoints'
import checkResetDoneCorrectly from '@/lib/bonuslar/checkResetDoneCorrectly'
import resetMonthlyDataInSaleAccountandPayConfirmedBalance from '@/lib/bonuslar/resetMonthlyDataInSaleAccountandPayConfirmedBalance'
import resetTheSaleAccount from '@/lib/bonuslar/resetTheSaleAccount'
import Sponsors from '@/models/sponsors'
import deleteIfInactive from '@/lib/bonuslar/uye/deleteIfInactive'
import checkAlreadyDone from '@/lib/bonuslar/checkAlreadyDone'
import User from '@/models/user'
import locker from '@/lib/providers/locker'
import minioClient from '../../../lib/providers/minio'
import giveHissedarBonusu from '../../../lib/hissedarBonusu/hissedarBonusu'
import hissedarBonusu from '../../../models/hissedarBonusu'
import pLimit from 'p-limit'
import getImportantPanic from '../../../lib/getImportantPanic'

const SaleAccount = saleAccount()
const invitation = Invitation()
const UserWeeklyMonthlyTable = userWeeklyMonthlyTable()
const sponsors = Sponsors()
const user = User()
const HissedarBonusu = hissedarBonusu()

export default async function handler(req, res) {
  // Eşleştirme bonusu eklenicek

  const inImportantPanic =await getImportantPanic()
  if(inImportantPanic) return res.status(400).json({ message: 'Refunds are closed' })
  await minioClient.removeObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/hissedarBonusu/this_months.csv")
  await minioClient.removeObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/otherPays/this_months.csv")
  await minioClient.removeObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/liderlikBonusu/this_months.csv")
  await minioClient.removeObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/kariyerBonusu/this_months.csv")

  await giveHissedarBonusu(HissedarBonusu, UserWeeklyMonthlyTable,SaleAccount) // DONE NO PROBLEM

  const allSaleAccounts = await SaleAccount.findAll()

  const limit = pLimit(10)
  const promises = allSaleAccounts.map(
    async (thisSaleAccount) => {
      return limit(async () => {
    const pathcedSaleAccount = await SaleAccount.findByPk(thisSaleAccount.id)
    if (!pathcedSaleAccount) return 
    const usersTree = await invitation.findOne({ where: { sale_account_id: pathcedSaleAccount.id } })
    if (!usersTree) return
    const usersSponsors = await sponsors.findOne({ where: { owner_id: pathcedSaleAccount.owner_id } })
    if (!usersSponsors) return
    if (usersTree.self_tree_positions[thisSaleAccount.owner_id].point1 >= 50 && pathcedSaleAccount.self_gained_point1 >= 50) {
       const alreadyDone = await checkAlreadyDone(UserWeeklyMonthlyTable, thisSaleAccount.id)
       if (alreadyDone) return 
  
      const givenEslestirmeBonusu = await giveEslestirmeBonusu(pathcedSaleAccount) // DONE NO PROBLEM LAST CHECK ON THE WAY NO PROBLEM 
      console.log(givenEslestirmeBonusu)
  
      const toPayLiderlikBonusu = await giveLiderlikBonusu(invitation, pathcedSaleAccount) // DONE NO PROBLEM GIVEN TO UNCONFIRMED BALANCE
      console.log(toPayLiderlikBonusu)
  
      const toPayKariyerBonusuAndUpdateKariyer = await giveKariyerBonusu(pathcedSaleAccount, usersSponsors, invitation) // DONE NO PROBLEMS
      console.log(toPayKariyerBonusuAndUpdateKariyer)

      const dataSaved = await saveMonthlyData(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree) // SAVE THE DATA
      console.log(dataSaved)
  
      const toPayOthers = await resetMonthlyDataInSaleAccountandPayConfirmedBalance(pathcedSaleAccount)
      console.log(toPayOthers)
  
      const fullTreeReseted = await resetTheTreePoints(usersTree)
      console.log(fullTreeReseted)
  
      const fullSaleAccountReseted = await resetTheSaleAccount(pathcedSaleAccount)
      console.log(fullSaleAccountReseted)
  
      
      const resetDoneCorrectly = await checkResetDoneCorrectly(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree)
      console.log(resetDoneCorrectly)
  
  
      await locker.unlock(`saleAccount-${thisSaleAccount.id}`)
      await locker.unlock(`invitation-${usersTree.sale_account_id}`)
      await locker.unlock(`sponsors-${usersSponsors.id}`)
      return 
    }
    else {
      // Check this
      const alreadyDone = await checkAlreadyDone(UserWeeklyMonthlyTable, thisSaleAccount.id)
      console.log(alreadyDone)
      if (alreadyDone){
        await locker.unlock(`saleAccount-${thisSaleAccount.id}`)
        await locker.unlock(`invitation-${usersTree.sale_account_id}`)
        await locker.unlock(`sponsors-${usersSponsors.id}`)
        return 
      }
  
      const dataSaved = await saveMonthlyData(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree) // SAVE THE DATA
      console.log(dataSaved)
  
      // Check this
      const deleteIfInactiveReturn = await deleteIfInactive(pathcedSaleAccount, sponsors, UserWeeklyMonthlyTable, invitation, SaleAccount, user) // NOT TESTED
      console.log(deleteIfInactiveReturn)
  
      const fullTreeReseted = await resetTheTreePoints(usersTree)
      console.log(fullTreeReseted)
  
      const fullSaleAccountReseted = await resetTheSaleAccount(pathcedSaleAccount)
      console.log(fullSaleAccountReseted)
  
      const resetDoneCorrectly = await checkResetDoneCorrectly(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree)
      console.log(resetDoneCorrectly)
  
      await locker.unlock(`saleAccount-${thisSaleAccount.id}`)
      await locker.unlock(`invitation-${usersTree.sale_account_id}`)
      await locker.unlock(`sponsors-${usersSponsors.id}`)
      return 
    }
  })

  })

  await Promise.all(promises)



  // Lock "invitationBySaleAccount.${usersTreeForLock.saleAccount_id}"
  // Lock "usersSponsorsByUserId.${pathcedSaleAccount.owner_id}"



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
