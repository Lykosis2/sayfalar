import selfGainedPointVer from './bonuslar/uye/selfGainedPointVer'
import ekipGeliriVer from './bonuslar/uye/ekipGeliri'
import organizasyonGeliriVer from './bonuslar/uye/organizasyonGeliri'
import hissedarBonusunaAt from './bonuslar/musteri/hissedarBonusunaAt'
import organizasyonGeliriVerMusteri from './bonuslar/musteri/organizasyonGeliri'
import organizasyonGeliriVerMusteriWithValues from './bonuslar/organizasyonGeliriVerMusteriWithValues'
import hissedarBonusu from '@/models/hissedarBonusu'
import Sponsors from '@/models/sponsors'
import saleAccount from '@/models/saleAccount'
import Invitation from '@/models/invitation'
import noInvitation from './errorHandle/CheckTree/noInvitation'
import noSponsors from './errorHandle/CheckTree/noSponsors'
import checkAndSolveProblems from './errorHandle/CheckTree/checkAndSolveProblems'
import importantPanic from './errorHandle/importantPanic'
import locker from './providers/locker'

const SaleAccount = saleAccount()
const invitation = Invitation()
const sponsors = Sponsors()

export default async function givePointsInOrder(
  hasSaleAccount,
  owner_id,
  saleAccountId,
  regularProducts,
  specialProducts,
  regularProductsTotalPrice,
  specialProductsTotalPrice,
  highestSpecailProductPrice,
  willcreateSaleAccount,
) {
  const selfAccount =!saleAccountId ? null :await SaleAccount.findByPk(saleAccountId) 
  
  if (!selfAccount)
    hasSaleAccount = false

  if (hasSaleAccount) {
    const calcPrice = specialProductsTotalPrice + regularProductsTotalPrice
    console.log(calcPrice);
    let selfInvit = await invitation.findOne({ where: { sale_account_id: selfAccount.id } })
    console.log(selfInvit);
    if(!selfInvit){
      await noInvitation(saleAccountId,invitation,SaleAccount,sponsors)
      selfInvit = await invitation.findOne({ where: { sale_account_id: selfAccount.id } })
    }
   
    let thisSponsors = await sponsors.findOne({ where: { owner_id } })
    console.log(thisSponsors);
    if(!thisSponsors){
      console.log('sponsor bulunamadı');
      await noSponsors(owner_id,sponsors,SaleAccount)
      console.log('sponsor oluşturuldu');
      await checkAndSolveProblems(owner_id)
      console.log('problemler çözüldü agaclara eklendi');
      thisSponsors = await sponsors.findOne({ where: { owner_id } })
    }
    if (
      saleAccountId === '2582a601-956b-4076-a6b3-bd40e11df286'
        || saleAccountId === '6456d13d-2ba0-4eff-b520-dfd2718b31d4'
        || saleAccountId === 'c0470e22-3f7d-4fd4-8b53-bfc6641c15ac'
        || saleAccountId === 'c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a'
    ) {
      try{
        const selfPoint = await selfGainedPointVer(selfAccount, selfInvit, calcPrice, owner_id) // Test edildi
        console.log(selfPoint);
        // return res.status(200).json({"message":"sirket hesabının alisverisi tamamlanmıstır",selfPoint:selfPoint})
        return {
          message: 'sirket hesabının alisverisi tamamlanmıstır',
          selfPoint,
        }
      }
      catch(e){
        await importantPanic(e)
        return {
          message: 'sirket hesabının alisverisi tamamlanmıstır',
          selfPoint:0
        }
      }
    }



    // Buraya lockları ekle 
    else{
      try{
        console.log('sirket hesabı değil');
        const selfPoint = await selfGainedPointVer(selfAccount, selfInvit, calcPrice, owner_id) // Test edildi
        console.log(selfPoint)
        console.log("hello");
        const ekipGeliri = await ekipGeliriVer(thisSponsors, SaleAccount, invitation, calcPrice, owner_id) // Test edildi
        console.log(ekipGeliri)
        const organizasyonGeliri = await organizasyonGeliriVer(thisSponsors, SaleAccount, invitation, calcPrice, owner_id) // Test edildi
        console.log(organizasyonGeliri)
        // return res.status(200).json({ selfPoint: selfPoint,ekipGeliri:ekipGeliri,organizasyonGeliri:organizasyonGeliri,orderId:order.id })
        return {
          selfPoint,
          ekipGeliri,
          organizasyonGeliri,
        }
      }
      catch(e){
        await importantPanic(e)
        return {
          message: 'sirket hesabının alisverisi tamamlanmıstır',
          selfPoint:0,
          ekipGeliri:0,
          organizasyonGeliri:0
        }
      }
    }
  }


    else{
      try{
        if(specialProducts.length > 0 && !willcreateSaleAccount) throw new Error('User does not have a sale account')
        if(specialProductsTotalPrice > 0 && !willcreateSaleAccount) throw new Error('User does not have a sale account')

        if(willcreateSaleAccount){
            const biggestSpecialPriceCalc = [highestSpecailProductPrice *0.05,highestSpecailProductPrice*0.012,highestSpecailProductPrice*0.009,highestSpecailProductPrice*0.009,highestSpecailProductPrice*0.009,highestSpecailProductPrice*0.009]
            let regularProductsPriceCalc = []
            if(regularProductsTotalPrice > 0 ){
                regularProductsPriceCalc[0] = regularProductsTotalPrice * 0.23 
                regularProductsPriceCalc[1] = regularProductsTotalPrice * 0.012
                regularProductsPriceCalc[2] = regularProductsTotalPrice * 0.009
                regularProductsPriceCalc[3] = regularProductsTotalPrice * 0.009
                regularProductsPriceCalc[4] = regularProductsTotalPrice * 0.009
                regularProductsPriceCalc[5] = regularProductsTotalPrice * 0.006
            }
            let remainingSpecialPriceCalc = []
            if(specialProductsTotalPrice - highestSpecailProductPrice > 0){
                remainingSpecialPriceCalc[0] = (specialProductsTotalPrice - highestSpecailProductPrice) * 0.045
                remainingSpecialPriceCalc[1] = (specialProductsTotalPrice - highestSpecailProductPrice) * 0.012
                remainingSpecialPriceCalc[2] = (specialProductsTotalPrice - highestSpecailProductPrice) * 0.009
                remainingSpecialPriceCalc[3] = (specialProductsTotalPrice - highestSpecailProductPrice) * 0.009
                remainingSpecialPriceCalc[4] = (specialProductsTotalPrice - highestSpecailProductPrice) * 0.009
                remainingSpecialPriceCalc[5] = (specialProductsTotalPrice - highestSpecailProductPrice) * 0.006
            }
            let totalPriceCalc = [
                biggestSpecialPriceCalc[0] ?? 0 + regularProductsPriceCalc[0] ?? 0 + remainingSpecialPriceCalc[0] ?? 0,
                biggestSpecialPriceCalc[1] ?? 0 + regularProductsPriceCalc[1] ?? 0 + remainingSpecialPriceCalc[1] ?? 0,
                biggestSpecialPriceCalc[2] ?? 0 + regularProductsPriceCalc[2] ?? 0 + remainingSpecialPriceCalc[2] ?? 0,
                biggestSpecialPriceCalc[3] ?? 0 + regularProductsPriceCalc[3] ?? 0 + remainingSpecialPriceCalc[3] ?? 0,
                biggestSpecialPriceCalc[4] ?? 0 + regularProductsPriceCalc[4] ?? 0 + remainingSpecialPriceCalc[4] ?? 0,
                biggestSpecialPriceCalc[5] ?? 0 + regularProductsPriceCalc[5] ?? 0 + remainingSpecialPriceCalc[5] ?? 0,
            ]
            let users_sponsors = await sponsors.findOne({ where: { owner_id: owner_id } })
            if(!users_sponsors){
              console.log('sponsor bulunamadı');
              await noSponsors(owner_id,sponsors,SaleAccount)
              console.log('sponsor oluşturuldu');
              await checkAndSolveProblems(owner_id)
              console.log('problemler çözüldü agaclara eklendi');
              users_sponsors = await sponsors.findOne({ where: { owner_id: owner_id } })
            }
            console.log(totalPriceCalc);
            const organizasyonGeliriVerWithValues = await organizasyonGeliriVerMusteriWithValues(totalPriceCalc,SaleAccount,invitation,owner_id,users_sponsors)
            console.log(organizasyonGeliriVerWithValues);
            return {
              organizasyonGeliri:organizasyonGeliriVerWithValues ?? 0
            }
        }
        else{
            let calcPrice = regularProductsTotalPrice
            const start = new Date()
            const sirketHesabi = "2582a601-956b-4076-a6b3-bd40e11df286"
            const HissedarBonusu = hissedarBonusu()
            if(!HissedarBonusu) throw new Error('Hissedar bonusu bulunamadı')
            const moneyOfHissedarBonusu = await HissedarBonusu.findByPk(1)
            if(!moneyOfHissedarBonusu) throw new Error('Hissedar bonusu bulunamadı')
            let bireyselGelir = await sponsors.findOne({ where: { owner_id: owner_id } })
            if(!bireyselGelir){
              console.log('sponsor bulunamadı')
              await noSponsors(owner_id,sponsors,SaleAccount)
              console.log('sponsor oluşturuldu');
              await checkAndSolveProblems(owner_id)
              console.log('problemler çözüldü agaclara eklendi');
              bireyselGelir = await sponsors.findOne({ where: { owner_id: owner_id } })
            }
            if(bireyselGelir && (bireyselGelir.level1 === sirketHesabi )){
                await locker.flag("2582a601-956b-4076-a6b3-bd40e11df286")
                const hissedarBonusuVal = await hissedarBonusunaAt(moneyOfHissedarBonusu,calcPrice) // Test edildi
                console.log(hissedarBonusu);
                console.log(new Date() - start);
                return {
                    hissedarBonusu:hissedarBonusuVal ?? 0,
                    organizasyonGeliri:0
                }
      // return res.status(200).json({ hissedarBonusu:hissedarBonusuVal ?? 0,organizasyonGeliri:0})
            }
            else{
                const organizasyonGeliri = await organizasyonGeliriVerMusteri(bireyselGelir,SaleAccount,invitation,calcPrice,owner_id) //Test edilicek 
                console.log(new Date() - start);
                return {
                    organizasyonGeliri:organizasyonGeliri ?? 0
                }
      // return res.status(200).json({ hissedarBonusu:hissedarBonusuVal ?? 0,organizasyonGeliri:organizasyonGeliri ?? 0 })
    }
  }
 
      }
      catch(e){
        await importantPanic(e)
        return {
      message: "HATA OLUŞTU",
          selfPoint:0,
          ekipGeliri:0,
          organizasyonGeliri:0
        }
      }
    }
}
