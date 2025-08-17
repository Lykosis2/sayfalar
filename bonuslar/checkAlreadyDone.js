import { Op } from 'sequelize'

export default async function checkAlreadyDone(UserWeeklyMonthlyTable, saleAccount_id) {
  const twoHoursAgo = new Date() // Get the current date
  twoHoursAgo.setDate(twoHoursAgo.getDate() - 25)
  console.log(twoHoursAgo)

  try {
    const result = await UserWeeklyMonthlyTable.findOne({
      where: {
        createdAt: {
          [Op.gte]: twoHoursAgo, // createdAt is greater than or equal to two hours ago
        },
        saleAccount_id,
      },
    })
    if (result)
      return true
    return false
  }
  catch (error) {
    console.log(error)
    return false
  }
}
