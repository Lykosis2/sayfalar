import { Op } from 'sequelize'

export default async function checkResetDoneCorrectly(pathcedSaleAccount, UserWeeklyMonthlyTable, usersTree) {
  // Check if UserWeeklyMonthlyTable added
  // Check saleAccount values depending on the userWeeklyMonthlyTable and reset done correctly
  // Check users tree and make sure all points are 0 and balance is 0
  try {
    const now = new Date()
    const oneHourAgo = new Date(now - 20 * 60 * 1000) // 20 minutes ago
    const createdUserWeeklyTable = await UserWeeklyMonthlyTable.findOne({
      where: {
        createdAt: {
          [Op.gte]: oneHourAgo,
          [Op.lte]: now,
        },
        saleAccount_id: pathcedSaleAccount.id,
      },
    }).catch(err => console.log(err))
    console.log(!createdUserWeeklyTable)
    if (!createdUserWeeklyTable)
      return false
    // const saleAccountResetedCorrectly = (
    //     pathcedSaleAccount.real_point1 === 0 &&
    //     pathcedSaleAccount.active === false &&
    //     pathcedSaleAccount.self_gained_point1 === 0 &&
    //     pathcedSaleAccount.organizasyonGeliri === 0 &&
    //     pathcedSaleAccount.ekipGeliri === 0 &&
    //     pathcedSaleAccount.musteriGeliri === 0 &&
    //     pathcedSaleAccount.tanistirmaGeliri === 0 &&
    //     pathcedSaleAccount.unconfirmed_balance === 0 &&
    //     createdUserWeeklyTable.real_point1 === pathcedSaleAccount.last_months_real_point1 &&
    //     createdUserWeeklyTable.self_gained_point1 === pathcedSaleAccount.last_months_self_gained_point1)
    let saleChanged = false
    if (pathcedSaleAccount.real_point1 !== 0) {
      pathcedSaleAccount.real_point1 = 0
      saleChanged = true
    }
    if (pathcedSaleAccount.active !== false) {
      pathcedSaleAccount.active = false
      saleChanged = true
    }
    if (pathcedSaleAccount.self_gained_point1 !== 0) {
      pathcedSaleAccount.self_gained_point1 = 0
      saleChanged = true
    }
    if (pathcedSaleAccount.organizasyonGeliri !== 0) {
      pathcedSaleAccount.organizasyonGeliri = 0
      saleChanged = true
    }
    if (pathcedSaleAccount.ekipGeliri !== 0) {
      pathcedSaleAccount.ekipGeliri = 0
      saleChanged = true
    }
    if (pathcedSaleAccount.musteriGeliri !== 0) {
      pathcedSaleAccount.musteriGeliri = 0
      saleChanged = true
    }
    if (pathcedSaleAccount.tanistirmaGeliri !== 0) {
      pathcedSaleAccount.tanistirmaGeliri = 0
      saleChanged = true
    }
    if (pathcedSaleAccount.unconfirmed_balance !== 0) {
      pathcedSaleAccount.unconfirmed_balance = 0
      saleChanged = true
    }
    let weeklychanged = false
    if (createdUserWeeklyTable.real_point1 !== pathcedSaleAccount.last_months_real_point1) {
      createdUserWeeklyTable.real_point1 = pathcedSaleAccount.last_months_real_point1
      weeklychanged = true
    }
    if (createdUserWeeklyTable.self_gained_point1 !== pathcedSaleAccount.last_months_self_gained_point1) {
      createdUserWeeklyTable.self_gained_point1 = pathcedSaleAccount.last_months_self_gained_point1
      weeklychanged = true
    }
    if (weeklychanged) {
      console.log(createdUserWeeklyTable)
      await createdUserWeeklyTable.save()
    }
    if (saleChanged) {
      console.log(pathcedSaleAccount)
      await pathcedSaleAccount.save()
    }

    const usersTreeResetedCorrectly = Object.keys(usersTree.self_tree_positions).every(key => (
      usersTree.self_tree_positions[key].point1 === 0 && usersTree.self_tree_positions[key].balance === 0
    ))
    console.log(!usersTreeResetedCorrectly)
    if (!usersTreeResetedCorrectly) {
      await Promise.all([
        Object.keys(usersTree.self_tree_positions).map((key) => {
          usersTree.self_tree_positions[key].point1 = 0
          usersTree.self_tree_positions[key].balance = 0
        }),

        usersTree.changed('self_tree_positions', true),
        usersTree.save(),

      ],
      ).catch((err) => {
        console.log(err)
        return false
      })
    }

    return true
  }
  catch (e) {
    console.log(e)
    return false
  }
}
