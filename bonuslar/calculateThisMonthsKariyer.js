import kariyerLevelsCalc from './kariyerLevelsCalc'

export default async function calculateThisMonthsKariyer(pathcedSaleAccount) {
  const levelOfPoint = kariyerLevelsCalc(Number.parseInt(pathcedSaleAccount.real_point1))
  const levelUpgraded = levelOfPoint > pathcedSaleAccount.real_title
  if (levelUpgraded)
    return kariyerLevelsCalc(pathcedSaleAccount.point1)

  return pathcedSaleAccount.real_title
}
