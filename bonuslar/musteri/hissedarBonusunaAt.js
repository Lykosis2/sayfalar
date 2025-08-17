import locker from "../../providers/locker"

export default async function hissedarBonusunaAt(moneyOfHissedarBonusu, price) {
  const pastHissedarBonusu = moneyOfHissedarBonusu.this_months_money
  moneyOfHissedarBonusu.this_months_money += price * 0.20
  const currentHissedarBonusu = moneyOfHissedarBonusu.this_months_money
  await locker.lockAndWait("hissedarBonusu", 60 * 1000)
  await moneyOfHissedarBonusu.save()
  await locker.unlock("hissedarBonusu")
  return currentHissedarBonusu - pastHissedarBonusu
}
