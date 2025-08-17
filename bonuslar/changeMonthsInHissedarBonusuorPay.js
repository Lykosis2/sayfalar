export default async function changeMonthsInHissedarBonusu(HissedarBonusu) {
  const realHissedarBonusu = await HissedarBonusu.findByPk(1)
  console.log(realHissedarBonusu)
  const toPay = realHissedarBonusu.last_months_money
  realHissedarBonusu.last_months_money = realHissedarBonusu.this_months_money
  realHissedarBonusu.this_months_money = 0
  // SEND TOPAY TO PAY FUNCTION
  console.log(realHissedarBonusu)
  await realHissedarBonusu.save()
  return toPay ?? 0
}
