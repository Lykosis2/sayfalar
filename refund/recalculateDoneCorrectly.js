import findSmallBranch from '../findSmallBranch'

export default async function recalculateDoneCorrectly(usersSaleAccount, usersWeeklyMonthlyTable) {
  if (!usersWeeklyMonthlyTable)
    return false
  if (!usersSaleAccount)
    return false
  if (usersWeeklyMonthlyTable.self_gained_point1 < 50)
    return false
  if (usersWeeklyMonthlyTable.self_tree_positions[usersSaleAccount.owner_id].point1 < 50)
    return false // TODO HANDLE THIS CASE
  const self_tree_positions = usersWeeklyMonthlyTable.self_tree_positions
  const points = findSmallBranch(self_tree_positions)
  let check_point1 = 0
  if (points[2])
    check_point1 = points[0] * 0.4 + points[1] * 0.6 + points[3]

  else
    check_point1 = points[0] * 0.6 + points[1] * 0.4 + points[3]

  if (usersSaleAccount.last_months_real_point1 === check_point1 && usersWeeklyMonthlyTable.real_point1 === check_point1)
    return true

  return false
}
