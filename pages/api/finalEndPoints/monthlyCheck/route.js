import pLimit from "p-limit"
import dailyCheckTree from "../../../../lib/dailyCheckTree"
import flagedBehavior from "../../../../lib/flagedBehavior"
import flagedBehaviorForAll from "../../../../lib/flagedBehaviorForAll"
import giveHissedarBonusu from "../../../../lib/hissedarBonusu/hissedarBonusu"
import montlyCheckFunc from "../../../../lib/monthlyChangeFunction"
import minioClient from "../../../../lib/providers/minio"
import hissedarBonusu from "../../../../models/hissedarBonusu"
import saleAccount from "../../../../models/saleAccount"
import userWeeklyMonthlyTable from "../../../../models/userWeeklyMonthlyTable"
import getImportantPanic from "../../../../lib/getImportantPanic"



//THİS ONE IS FAKSE
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
        const post = await POST(req, res)
        return
        default:
        return res.status(405).end() // Method Not Allowed
    }
}




async function POST(req, res) {
    return res.status(200).json({ message: 'monthly check is not at this endpoint' })
    const SaleAccount = saleAccount()
    const HissedarBonusu = await hissedarBonusu()
    const UserWeeklyMonthlyTable = userWeeklyMonthlyTable()
    const allSaleAccounts = await SaleAccount.findAll()

    await minioClient.removeObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/hissedarBonusu/this_months.csv")
    await minioClient.removeObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/otherPays/this_months.csv")
    await minioClient.removeObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/liderlikBonusu/this_months.csv")
    await minioClient.removeObject(process.env.MINIO_BUCKET_PRIVATE, "bonus/kariyerBonusu/this_months.csv")

    await giveHissedarBonusu(HissedarBonusu, UserWeeklyMonthlyTable)

    const limit =pLimit(10)

    // const promises4 = allSaleAccounts.map(async thisSaleAccount=>{
    //     return limit(async () => {
    //     await flagedBehavior(thisSaleAccount.id)
    //     })
    // })
    // await Promise.all(
    //     promises4
    // )


    await montlyCheckFunc("2a699d83-088b-4264-9282-65298347d890","a83b7a80-2b82-4644-9b3b-e711d5d5eb4b")
    // for (let i = 0; i < allSaleAccounts.length; i++) {
    //     const thissaleAccount = allSaleAccounts[i];
    //     console.log("triggered monthly check for: ", thissaleAccount.id);
    //     await montlyCheckFunc(thissaleAccount.id,thissaleAccount.owner_id) 
    // }
}

// DONT FORGET TO ADD STOPS FOR 27 23:45 TO 28 06.00 