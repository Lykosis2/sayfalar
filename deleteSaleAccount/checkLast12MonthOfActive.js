export default async function checkLast12MonthOfActive(UsersDateTable) {
  // This is UsersDateTable

  /* Look at last 12 months(not including this month) self_tree_positions position 0 points
    and self_gained_point1 if both of them are 0 then
    return true if they are different in any case throw error
    */
  const currentDate = new Date() // Get the current date
  const twelveMonthsAgo = new Date(currentDate) // Create a copy of the current date
  twelveMonthsAgo.setMonth(currentDate.getMonth() - 13) // Subtract 13 months
  const oneMonthLater = new Date(currentDate) // Create another copy
  oneMonthLater.setMonth(currentDate.getMonth() - 1) // Add 1 month

  const first12Months = UsersDateTable.filter((item) => {
    const itemDate = new Date(item.date).getMonth()
    return itemDate >= twelveMonthsAgo && itemDate <= oneMonthLater
  })
  console.log(first12Months)

  const isActiveAndPointGreater = first12Months.some((item) => {
    return item.active === true && item.self_gained_point1 >= 50
  })

  console.log(isActiveAndPointGreater)

  return isActiveAndPointGreater
}
