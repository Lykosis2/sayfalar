import dailyCheckedHissedarBonusu from "@/lib/dailyCheckHissedarBonusu"
import dailyCheckTree from "@/lib/dailyCheckTree"
import flagedBehaviorForAll from "@/lib/flagedBehaviorForAll"
import saleAccount from "@/models/saleAccount"
import checkUncreatedSaleAccounts from "../../../../lib/checkUncreatedSaleAccounts"
import treeHealthCheck from "../../../../lib/treeHealthCheck"
import pLimit from "p-limit"
import flagedBehavior from "../../../../lib/flagedBehavior"
import getImportantPanic from "../../../../lib/getImportantPanic"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
        const post = await POST(req, res)
        return
        default:
        res.status(405).end() // Method Not Allowed
        
    }
    }
async function POST(req, res) {
    return res.status(400).json({ message: "Daily check on wait " })
    const inImportantPanic =await getImportantPanic()
    if(inImportantPanic) return res.status(400).json({ message: 'Refunds are closed' })
    const SaleAccount = saleAccount()
    const allSaleAccounts = await SaleAccount.findAll()
    // check hissedar bonusu // 
    await dailyCheckedHissedarBonusu()
    // do the falgedBehavior //
    const limit =pLimit(10)
    const promises = allSaleAccounts.map(async thisSaleAccount=>{
        return limit(async () => {await flagedBehavior(thisSaleAccount.id)})
    })
    await Promise.all(
        promises
    )
    // check all saleAccounts are correct and created depending on special orders today 
    await checkUncreatedSaleAccounts()
    console.log("uncreated sale accounts checked");
    await treeHealthCheck()
    console.log("tree health checked");
    // flag again 
    await flagedBehaviorForAll()
    console.log("flaged behavior for all");

    await dailyCheckTree()
    console.log("daily check tree");

    res.status(200).json({ message:"success" })
}