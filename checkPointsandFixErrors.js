import calculateIfThisMonth from "./calculateIfThisMonth"
import flagedBehaviorForAll from "./flagedBehaviorForAll"
import locker from "./providers/locker"

export default async function checkPointsandFixErrors(thisInvitation,user,sponsors,invitation,SaleAccount,refund,order,products){
    try{

        const allOrders = await order.findAll()
        const allRefunds = await refund.findAll()
        const specialProducts = await products.findAll({
            where:{
                special:true
            }
        })
        const parsedSpecialProducts = specialProducts.map(product=>product.id)
    
        const wantedInvitation = await invitation.findOne({
            where:{
                sale_account_id:thisInvitation.sale_account_id
            }
        })
        const wantedSaleAccount = await SaleAccount.findOne({
            where:{
                id:thisInvitation.sale_account_id
            }
        })
    
        let changed =false
        await Promise.all(
            Object.keys(wantedInvitation.self_tree_positions).map(async thisUser=>{
                const allOrders = await order.findAll({
                    where:{
                        owner_id:thisUser
                    }
                })
    
                const thisMonthsOrders = allOrders.filter(order=>calculateIfThisMonth(order.createdAt))
    
                const allRefunds = await refund.findAll({
                    where:{
                        user_id:thisUser
                    }
                })
    
                const thisMonthsRefunds = allRefunds.filter(refund=>calculateIfThisMonth(refund.createdAt))
    
                const levelOfUser = wantedInvitation.self_tree_positions[thisUser].level 
    
                const totalPoint1ThatShouldBe = calculateTotalPoint1(thisMonthsOrders,thisMonthsRefunds,levelOfUser,) // TODO IMPLEMENT THIS 
    
                if(wantedInvitation.self_tree_positions[thisUser].point1 !== totalPoint1ThatShouldBe){
                    changed = true
                    console.log(wantedInvitation.self_tree_positions[thisUser].point1,totalPoint1ThatShouldBe);
                    wantedInvitation.self_tree_positions[thisUser].point1 = totalPoint1ThatShouldBe
                }
            })
        )
        
        // after you make sure everyones points are correct 
        if(changed){
            wantedInvitation.changed('self_tree_positions', true);
            console.log("changed");
            await locker.lockAndWait(`invitation-${wantedInvitation.sale_account_id}`, 60 * 1000)
            await wantedInvitation.save()
            await locker.unlock(`invitation-${wantedInvitation.sale_account_id}`)
        }
    
    
        const self_orders = await order.findAll({
            where:{
                owner_id:wantedSaleAccount.owner_id
            }
        })
        const this_months_self_orders = self_orders.filter(order=>calculateIfThisMonth(order.createdAt))
        const self_refunds = await refund.findAll({
            where:{
                user_id:wantedSaleAccount.owner_id
            }
        })
        const this_months_self_refunds = self_refunds.filter(refund=>calculateIfThisMonth(refund.createdAt))
    
        const shouldbeself_gained_point1 = await calculateShouldBeSelfGainedPoint1(this_months_self_orders,this_months_self_refunds,parsedSpecialProducts) // TODO IMPLEMENT THIS
    
        let self_gained_false =false
        console.log(wantedSaleAccount.self_gained_point1,shouldbeself_gained_point1);
        if(wantedSaleAccount.self_gained_point1!== shouldbeself_gained_point1){
            console.log(wantedSaleAccount.self_gained_point1,shouldbeself_gained_point1);
            self_gained_false = true
            wantedSaleAccount.self_gained_point1 = shouldbeself_gained_point1



            // not locked 
            await wantedSaleAccount.save()







            wantedInvitation.self_tree_positions[wantedSaleAccount.owner_id].point1 = shouldbeself_gained_point1
            wantedInvitation.changed('self_tree_positions', true);
            await locker.lockAndWait(`invitation-${wantedInvitation.sale_account_id}`, 60 * 1000)
            await wantedInvitation.save()
            await locker.unlock(`invitation-${wantedInvitation.sale_account_id}`)
        }
    
    
        if(changed || self_gained_false) await flagedBehaviorForAll()
    
        console.log(`check done for all tree for ${wantedInvitation.sale_account_id}`)
        return true

    }
    catch(e){
        console.log(e);
        return false
    }
    }


function calculateTotalPoint1(thisMonthsOrders,thisMonthsRefunds,levelOfUser){
    let total = 0

    thisMonthsOrders.map((thisOrder)=>{
        console.log(thisOrder.price / giveDependingOnLevel(levelOfUser));
        total += thisOrder.price / giveDependingOnLevel(levelOfUser)
    })
    thisMonthsRefunds.map((thisRefund)=>{
        console.log(thisRefund.price / giveDependingOnLevel(levelOfUser));
        total -= thisRefund.price / giveDependingOnLevel(levelOfUser)
    })

    return total

}
async function calculateShouldBeSelfGainedPoint1(self_orders,self_refunds,specialProducts){
    let total = 0

    console.log(self_orders);
    await Promise.all(
    self_orders.map((thisOrder)=>{
        if(!thisOrder.saleAccount_id){
            console.log(thisOrder.products);
            Object.keys(thisOrder.products).map((thisProduct)=>{
                if(specialProducts.includes(parseInt(thisProduct))){
                    console.log(thisOrder.products[thisProduct].price / 13);
                    total += thisOrder.products[thisProduct].price / 13
                    return
                }
            })
            return
        }
        total += thisOrder.price / 13
    }))

    await Promise.all(
    self_refunds.map((thisRefund)=>{
        if(!thisRefund.sale_account_id){
            return
}
        total -= thisRefund.price / 13
    }))

    return total

}
function giveDependingOnLevel(level,isSaleAccount){
    switch(level){
        case 0:
            return 13
        case 1:
            return 13
        case 2:
            return 26
        case 3:
            return 34.6
        case 4:
            return 52
        case 5:
            return 52
        case 6:
            return 52
        default:
            return 52
        }
}