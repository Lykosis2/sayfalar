import Invitation from "@/models/invitation"
import saleAccount from "@/models/saleAccount"
import Sponsors from "@/models/sponsors"
import importantPanic from "./errorHandle/importantPanic"
import locker from "./providers/locker"
const SaleAccount = saleAccount()
const sponsors = Sponsors()
const invitation = Invitation()
export default async function checkSaleAccountCreatedSuccessfully(userSaleAccount,usersTree,userAccount,owner_id,specialOrders,iban,firstPoint1,changeSponsor,changedSponsorId){
    try{
        const start = performance.now()

        let generalSaleAccount = userSaleAccount
        let generalTree = usersTree
        if(!generalSaleAccount){
            generalSaleAccount = await SaleAccount.create({
                owner_id: owner_id,
                specialOrders: specialOrders,
                IBAN: iban,
            }).catch(async err=>await importantPanic(err))
        }
        if(!usersTree){
            // TODO ADD RACE CONDITION HERE OR SYSTEM GO BUM BUM 
            generalTree = await invitation.create({
                sale_account_id: generalSaleAccount.id,
                self_tree_positions: {
                    [owner_id]: {
                        point1: firstPoint1,
                        point2: 0,
                        point3: 0,
                        point4: 0,
                        point5: 0,
                        point6: 0,
                    },
                },
                level1: {},
                level2: {},
                level3: {},
                level4: {},
                level5: {},
                level6: {},
            }).catch(async err=>await importantPanic(err))
        }
        if(!userAccount){
            console.log("IMPOSIBLE SITUATION");
            await importantPanic("IMPOSIBLE SITUATION")
        }
    
        if(userAccount.sponsor === 80562 && changeSponsor && changedSponsorId !== 80562 && changedSponsorId !== 72729454 && changedSponsorId !== 86180486 && changedSponsorId !== 89960994){
            userAccount.sponsor = changedSponsorId
            await userAccount.save().catch(async err=>await importantPanic(err))
        }
    
        const usersSponsors = sponsors.findOne({
            where:{
                owner_id:owner_id
            }
    }).catch(async err=>await importantPanic(err))
    
        if(!usersSponsors){
            console.log("IMPOSIBLE SITUATION");
            await importantPanic("IMPOSIBLE SITUATION")
        }
    
        if(usersSponsors){
            //First of all delete is 2582a601-956b-4076-a6b3-bd40e11df286 is in sponsors 
            // then make sure sponsors table is correct 
            let changed = false
            if(usersSponsors.level1 === "2582a601-956b-4076-a6b3-bd40e11df286"){
                await importantPanic("IMPOSIBLE SITUATION")
            }
            if(usersSponsors.level2 === "2582a601-956b-4076-a6b3-bd40e11df286"){
                console.log("here");
                usersSponsors.level2 = null
                changed = true
            }
            if(usersSponsors.level3 === "2582a601-956b-4076-a6b3-bd40e11df286"){
                console.log("here");
                usersSponsors.level3 = null
                changed = true
            }
            if(usersSponsors.level4 === "2582a601-956b-4076-a6b3-bd40e11df286"){
                console.log("here");
                usersSponsors.level4 = null
                changed = true
            }
            if(usersSponsors.level5 === "2582a601-956b-4076-a6b3-bd40e11df286"){
                console.log("here");
                usersSponsors.level5 = null
                changed = true
            }
            if(usersSponsors.level6 === "2582a601-956b-4076-a6b3-bd40e11df286"){
                console.log("here");
                usersSponsors.level6 = null
                changed = true
            }
            if(changed){
                console.log("here");
                await locker.lockAndWait(`sponsors-${owner_id}`)
                await usersSponsors.save().catch(async err=>await importantPanic(err))
                await locker.unlock(`sponsors-${owner_id}`)
            }
    
            const usersRealSponsor = SaleAccount.findOne({
                where:{
                    referenceNumber:userAccount.sponsor
                }
            })
            if(!usersRealSponsor){
                console.log("IMPOSIBLE SITUATION");
                await importantPanic("IMPOSIBLE SITUATION")
            }
            if(usersSponsors.level1 !==usersRealSponsor.owner_id){
                usersSponsors.level1 = usersRealSponsor.owner_id
                const sponsorsOfSponsor = await Sponsors.findOne({
                    where:{
                        owner_id:usersRealSponsor.owner_id
                    }
                })
                if(!sponsorsOfSponsor){
                    console.log("IMPOSIBLE SITUATION");
                    await importantPanic("IMPOSIBLE SITUATION")
                }
                if(usersSponsors.level2 !== sponsorsOfSponsor.level1){
                    usersSponsors.level2 = sponsorsOfSponsor.level1
                }
                if(usersSponsors.level3 !== sponsorsOfSponsor.level2){
                    usersSponsors.level3 = sponsorsOfSponsor.level2
                }
                if(usersSponsors.level4 !== sponsorsOfSponsor.level3){
                    usersSponsors.level4 = sponsorsOfSponsor.level3
                }
                if(usersSponsors.level5 !== sponsorsOfSponsor.level4){
                    usersSponsors.level5 = sponsorsOfSponsor.level4
                }
                if(usersSponsors.level6 !== sponsorsOfSponsor.level5){
                    usersSponsors.level6 = sponsorsOfSponsor.level5
                }
                await usersSponsors.save().catch(async err=>await importantPanic(err))
            }
    
        }
    
        if(generalSaleAccount.self_gained_point1 !== firstPoint1){
            generalSaleAccount.self_gained_point1 = firstPoint1
            await generalSaleAccount.save().catch(async err=>await importantPanic("error"))
        }
        if(generalTree.self_tree_positions[owner_id].point1 !== firstPoint1){
            generalTree.self_tree_positions[owner_id].point1 = firstPoint1
            generalTree.changed("self_tree_positions",true)
            await generalTree.save().catch(async err=>await importantPanic("error"))
        }
        if(userAccount.has_saleAccount !== true){
            userAccount.has_saleAccount = true
            await userAccount.save().catch(async err=>await importantPanic("error"))
        }
        if(generalSaleAccount.IBAN !== iban){
            generalSaleAccount.IBAN = iban
            await generalSaleAccount.save().catch(async err=>await importantPanic("error"))
        }
        if(generalSaleAccount.specialOrders !== specialOrders){
            generalSaleAccount.specialOrders = specialOrders
            await generalSaleAccount.save().catch(async err=>await importantPanic("error"))
        }
        console.log("time taken",performance.now()-start);
        return true
    }
    catch(e){
        await importantPanic(e)
        return false 
    }

}