import Invitation from "@/models/invitation"
import order from "@/models/order"
import saleAccount from "@/models/saleAccount"
import Sponsors from "@/models/sponsors"
import User from "@/models/user"
import calculateIfThisMonth from "./calculateIfThisMonth"
import refund from "../models/refund"
import flagedBehaviorForAll from "./flagedBehaviorForAll"
import checkAndFixSponsor from "./checkAndFixSponsors"
import checkTreeAndFixErrors from "./checkTreeAndFixErrors"
import checkPointsandFixErrors from "./checkPointsandFixErrors"
import lastCheckAfterFlagedBehavior from "./lastCheckAfterFlagedBehavior"
import pLimit from "p-limit"
import product from "../models/product"
import flagedBehavior from "./flagedBehavior"

export default async function dailyCheckTree(){
    const Order = await order()
    const SaleAccount = saleAccount()   
    const user= User()
    const invitation = Invitation()
    const sponsors = Sponsors()
    const refunds = await refund()
    const products = await product()
    const allOrders = await Order.findAll()
    const allSaleAccounts = await SaleAccount.findAll()
    const allUsers = await user.findAll()
    const allInvitations = await invitation.findAll()
    const allSponsors = await sponsors.findAll()
    const allRefunds = await refunds.findAll()
    //First sponsor correct check 

    //saleAccountu var mı onu kontrol et bu ay açılmış ve özel ürün almışların yoksa oluştur 

    const thisMonthsOrders = allOrders.filter(order=>calculateIfThisMonth(order.createdAt))
    const thisMonthsRefunds = allRefunds.filter(refund=>calculateIfThisMonth(refund.createdAt))


    const limit = pLimit(10);

      const promises1 = allUsers.map(thisUser => {
          return limit(async () => {
              if (thisUser.id === "41b301d8-f328-4464-a5c9-13f822c37505"|| thisUser.id === "e90f9e65-db89-45d3-8c6e-52b0d7bbaf35" || thisUser.id === "b9547d60-b55f-4b94-90b7-9c058789ed68" || thisUser.id === "83ed577d-379f-4597-a943-a5150655b514" ) return;
              return checkAndFixSponsor(thisUser, user, sponsors, invitation, SaleAccount);
          });
      });
     await Promise.all(promises1);
     console.log("sponsor check done");

     const promises2 = allInvitations.map(async thisInvitation=>{
         return limit(async () => {
         await checkTreeAndFixErrors(thisInvitation,user,sponsors,invitation,SaleAccount,allSponsors)
         })
     })

     await Promise.all(
        promises2
     )
     console.log("tree check done");

    const promises3 = allInvitations.map(async thisInvitation=>{
        return limit(async () => {
        await checkPointsandFixErrors(thisInvitation,user,sponsors,invitation,SaleAccount,refunds,Order,products)
        })
    })


    await Promise.all(
        promises3
    )
    console.log("points check done");

    const promises4 = allSaleAccounts.map(async thisSaleAccount=>{
        return limit(async () => {
        await flagedBehavior(thisSaleAccount.id)
        })
    })
    await Promise.all(
        promises4
    )
    console.log("flaged behavior done");
    return 



}