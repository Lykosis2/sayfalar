import Invitation from "../models/invitation"
import saleAccount from "../models/saleAccount"
import Sponsors from "../models/sponsors"
import noInvitation from "./errorHandle/CheckTree/noInvitation"
import importantPanic from "./errorHandle/importantPanic"
import unassignedToSelfTree from "./placeToTree/unassignedToSelfAssigned"
import locker from "./providers/locker"

const sponsors = Sponsors()
const invitation = Invitation()
const SaleAccount = saleAccount()

export default async function flagedBehavior(sale_account_id) {
    try{
        if(!invitation){
            await importantPanic('Invitation model not found','fixTree')
        }
        if(!SaleAccount){
            await importantPanic('SaleAccount model not found','fixTree')
        }
        const usersSaleAccount = await SaleAccount.findOne({ where: { id: sale_account_id } })
        if(!usersSaleAccount){
            console.log("here");
            await informTheAdmin('SaleAccount not found','fixTree')
            return false
        }
    
        const usersInvit = await invitation.findOne({ where: { sale_account_id: sale_account_id } })
        if(!usersInvit){
          if(usersSaleAccount){
            await noInvitation(usersSaleAccount.id,invitation,SaleAccount,sponsors)
          }
          else{
            await informTheAdmin('SaleAccount not found','fixTree');return false
          }
        }
        if(!usersInvit.self_tree_positions[usersSaleAccount.owner_id]){
            usersInvit.self_tree_positions[usersSaleAccount.owner_id] = {
                level:1,
                title:usersSaleAccount.title,
                point1:0,
                balance:0,
                position:0,
                changeable:false,
                saleAccount_id:usersSaleAccount.id,
                has_saleAccount:true,
            }
            usersInvit.changed('self_tree_positions', true)
            await locker.lockAndWait(`invitation-${usersInvit.sale_account_id}`, 60 * 1000)
            console.log(`user updated ${usersInvit.sale_account_id}`)
            await usersInvit.save()
            await locker.unlock(`invitation-${usersInvit.sale_account_id}`)
        }
        await unassignedToSelfTree(usersInvit, usersSaleAccount)
        return true
    }

    catch(err){
        console.log(err);
        return false
    }

}
