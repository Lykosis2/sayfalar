import locker from '../providers/locker'
import addToLiderlikBonusuToPayCsv from './addToLiderlikBonusuToPayCsv'
import isValidForLeadershipBonusandCalculateIfValid from './isValid/isValidForLeadeshipBonus'

export default async function giveLiderlikBonusu(invitation, pathcedSaleAccount) {
  const userInvit = await invitation.findOne({ where: { sale_account_id: pathcedSaleAccount.id } }).catch(err => console.log(err))
  console.log(userInvit.self_tree_positions)
  const validateAndFindLeaderShipBonus = await isValidForLeadershipBonusandCalculateIfValid(userInvit.self_tree_positions, pathcedSaleAccount.real_point1, pathcedSaleAccount.real_title)
  // ORNEK RETURN [false,0]
  // ORNEK RETURN [true,5000]
  console.log(validateAndFindLeaderShipBonus)

  if (validateAndFindLeaderShipBonus[0]) { // TODO : ifValidForLeadershipBonus fonksiyonu yazılacak
    const leadershipBonus = validateAndFindLeaderShipBonus[1] // TODO : calculateLeadershipBonus fonksiyonu yazılacak
    const toPay = pathcedSaleAccount.lastMonthsLiderlikBonusuGeliri
    pathcedSaleAccount.liderlikBonusuGeliri += leadershipBonus
    pathcedSaleAccount.lastMonthsLiderlikBonusuGeliri = leadershipBonus
    pathcedSaleAccount.liderlikBonusuGeliri = 0
    await locker.lockAndWait(`saleAccount-${pathcedSaleAccount.id}`, 60 * 1000)
    await pathcedSaleAccount.save()
    await locker.unlock(`saleAccount-${pathcedSaleAccount.id}`)
    const addedToCsv = await addToLiderlikBonusuToPayCsv(toPay, pathcedSaleAccount.id,pathcedSaleAccount.IBAN,pathcedSaleAccount.is_company) //Degisicek 
    return addedToCsv
  }
  return 0
}
