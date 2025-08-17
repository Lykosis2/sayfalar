import order from "@/models/order"
import calculateIfThisMonth from "./calculateIfThisMonth"
import Sponsors from "@/models/sponsors"
import hissedarBonusu from "@/models/hissedarBonusu"
import locker from "./providers/locker"

export default async function dailyCheckedHissedarBonusu(){
    const Order = await order()
    const sponsors = Sponsors()
    const HissedarBonusu = hissedarBonusu()
    const thisMonthsOrders = await Order.findAll()
    const thisMonthsOrdersData = thisMonthsOrders.map(({ dataValues: order }) => order).filter((order) => calculateIfThisMonth(order.createdAt))
    const onlyConnectedToSirket =await findConnectedToSirket(thisMonthsOrdersData, sponsors)
    const correctAmount = onlyConnectedToSirket.map((order) => {
        return order.price * 0.05
    })
    const totalAmount = correctAmount.reduce((a, b) => a + b, 0)
    console.log(totalAmount);
    const hissedarBonusuData = await HissedarBonusu.findOne({where:{id:1}})
    hissedarBonusuData.this_months_money = totalAmount
    await locker.lockAndWait("hissedarBonusu", 60 * 1000)
    await hissedarBonusuData.save()
    await locker.unlock("hissedarBonusu")
    console.log(hissedarBonusuData);
    return totalAmount

}

async function findConnectedToSirket(orders, sponsors) {
    const filteredOrders = await Promise.all(orders.map(async (order) => {
        const sponsor = await sponsors.findOne({
            where: {
                owner_id: order.owner_id
            }
        });

        return sponsor && sponsor.level1 === "2582a601-956b-4076-a6b3-bd40e11df286" ? order : null;
    }));

    return filteredOrders.filter(order => order !== null);
}