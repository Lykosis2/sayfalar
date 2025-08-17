import userWeeklyMonthlyTable from "../models/userWeeklyMonthlyTable";
import importantPanic from "./errorHandle/importantPanic";

export default async function checkForEmeklilik(saleAccount) {
    if(!saleAccount.createdAt) {
        await importantPanic('Sale Account has no createdAt','checkForEmeklilik')
    }
    const createdAt = new Date(saleAccount.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now - createdAt)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffYears = Math.ceil(diffDays / 365)
    if(diffYears < 10) {
        return 0
    }

    const userWeeklyMonthlyTableModel = userWeeklyMonthlyTable()
    if(!userWeeklyMonthlyTableModel) {
        await importantPanic('User Weekly Monthly Table model not found','checkForEmeklilik')
    }

    const userWeeklyMonthlyTableData = await userWeeklyMonthlyTableModel.findAll({
        where: {
            user_id: saleAccount.user_id,
        },
    })
    // find if user have 120 instance of userWeeklyMonthlyTable that is active 
    let activeCount = 0
    let totalPoint = 0
    userWeeklyMonthlyTableData.forEach((userWeeklyMonthlyTable) => {
        if(userWeeklyMonthlyTable.active) {
            activeCount++
            totalPoint += userWeeklyMonthlyTable.point1
        }
    })
    if(activeCount >= 120) {
        // if user have 120 instance of userWeeklyMonthlyTable that is active
        return totalPoint * 0.05
    }
    return 0

}