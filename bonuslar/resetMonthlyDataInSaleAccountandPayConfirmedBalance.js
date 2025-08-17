import checkForEmeklilik from '../checkForEmeklilik'
import locker from '../providers/locker'
import payConfirmedBalance from './payConfirmedBalance'

export default async function resetMonthlyDataInSaleAccountandPayConfirmedBalance(pathcedSaleAccount) {
  pathcedSaleAccount.two_month_ago_real_point1 = pathcedSaleAccount.last_months_real_point1 ?? 0
  pathcedSaleAccount.last_months_real_point1 = pathcedSaleAccount.real_point1 ?? 0
  pathcedSaleAccount.real_point1 = 0

  console.log(pathcedSaleAccount.real_point1)
  console.log(pathcedSaleAccount.last_months_real_point1)
  console.log(pathcedSaleAccount.two_month_ago_real_point1)

  pathcedSaleAccount.two_month_ago_self_gained_point1 = pathcedSaleAccount.last_months_self_gained_point1 ?? 0
  pathcedSaleAccount.last_months_self_gained_point1 = pathcedSaleAccount.self_gained_point1 ?? 0
  pathcedSaleAccount.self_gained_point1 = 0

  pathcedSaleAccount.lastMonthsOrganizasyonGeliri = pathcedSaleAccount.organizasyonGeliri ?? 0
  pathcedSaleAccount.organizasyonGeliri = 0

  pathcedSaleAccount.lastMonthsEkipGeliri = pathcedSaleAccount.ekipGeliri ?? 0
  pathcedSaleAccount.ekipGeliri = 0

  pathcedSaleAccount.lastMonthsMusteriGeliri = pathcedSaleAccount.musteriGeliri ?? 0
  pathcedSaleAccount.musteriGeliri = 0

  pathcedSaleAccount.lastMonthsTanistirmaGeliri = pathcedSaleAccount.tanistirmaGeliri ?? 0
  pathcedSaleAccount.tanistirmaGeliri = 0

  const toPay = pathcedSaleAccount.confirmed_balance
  console.log(pathcedSaleAccount.id)
  console.log(pathcedSaleAccount.confirmed_balance)
  console.log(pathcedSaleAccount.unconfirmed_balance)

  pathcedSaleAccount.lastMonthsTanistirmaGeliri = pathcedSaleAccount.tanistirmaGeliri ?? 0
  pathcedSaleAccount.tanistirmaGeliri = 0

  pathcedSaleAccount.confirmed_balance = pathcedSaleAccount.unconfirmed_balance
  pathcedSaleAccount.unconfirmed_balance = 0
  console.log(pathcedSaleAccount.id)
  console.log(pathcedSaleAccount.confirmed_balance)
  console.log(pathcedSaleAccount.unconfirmed_balance)

  const checkForEmeklilikPrice = await checkForEmeklilik(pathcedSaleAccount)
  console.log(checkForEmeklilikPrice);

  const finalToPay = toPay + checkForEmeklilikPrice
  // Burada da excele atıcaz
  locker.unlock(`saleAccount-${pathcedSaleAccount.id}`)
  await pathcedSaleAccount.save()
  locker.lockAndWait(`saleAccount-${pathcedSaleAccount.id}`, 60 * 1000)
  const payed = await payConfirmedBalance(pathcedSaleAccount.id, finalToPay, pathcedSaleAccount.IBAN, pathcedSaleAccount.is_company)
  return payed
}
