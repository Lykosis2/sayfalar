export default async function saveMonthlyData(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree) {
  // ADAMIN AGACINICKAYDET
  console.log("triggered");
  const usersTable = await UserWeeklyMonthlyTable.create({
    user_id: pathcedSaleAccount.owner_id,
    saleAccount_id: pathcedSaleAccount.id,
    self_tree_positions: usersTree.self_tree_positions,
    real_point1: pathcedSaleAccount.real_point1,
    self_gained_point1: pathcedSaleAccount.self_gained_point1,
    active: pathcedSaleAccount.active,
    title: pathcedSaleAccount.title,
    date: new Date(),
  }).catch(err => console.log(err))
  return usersTable
}
