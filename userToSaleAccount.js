import User from "@/models/user"
import saleAccount from "@/models/saleAccount"
import Invitation from "@/models/invitation"
import checkSaleAccountCreatedSuccessfully from "./checkSaleAccountCreatedSuccessfully"
import locker from "./providers/locker"
import importantPanic from "./errorHandle/importantPanic"
import tanistirmaGeliriVer from "./bonuslar/tanistirmageliriver"
import Sponsors from "../models/sponsors"
import noSponsor from "./errorHandle/noSponsor"

const user = User()
const SaleAccount = saleAccount()
const invitation = Invitation()
const sponsorsModel = Sponsors()
export default async function userToSaleAccount(params) {
    try{
        locker.lockAndWait(`userToSaleAccount-${params.owner_id}`, 60 * 1000)
        const owner_id = params.owner_id
        console.log(params.firstPoint1);
        let theSaleAccountThatIsSet = null;
        const userAccount = await user.findOne({
            where: {
                id: owner_id
            }}
            )
        if(!userAccount) await importantPanic("user not found")
        if(userAccount.hasSaleAccount) return false
        
        const changedSponsorId = userAccount.sponsor===80562 ?  params.changedSponsorId : null
        console.log(!changedSponsorId);

        if(!changedSponsorId && userAccount.sponsor !==80562 && userAccount.sponsor !==72729454 && userAccount.sponsor !==86180486 && userAccount.sponsor !==89960994){
           console.log("helo");
           theSaleAccountThatIsSet = userAccount.sponsor
        }
        else if(changedSponsorId && (changedSponsorId !== 80562 || changedSponsorId !== 72729454|| changedSponsorId !== 86180486|| changedSponsorId !== 89960994)){
            console.log("helo");
            userAccount.sponsor = changedSponsorId
            //await locker.lockAndWait(`user-${owner_id}`, 60 * 1000)
            await userAccount.save().catch(err=>console.log(err))   
            //await locker.unlock(`user-${owner_id}`)

            theSaleAccountThatIsSet = changedSponsorId
        }
        else {
            console.log("helo");
            const randomNumbers = ["72729454","86180486","89960994"]
            const randomNumber = Math.floor(Math.random() * 3)
            userAccount.sponsor = randomNumbers[randomNumber];
            console.log("triggered");
            userAccount.changed("sponsor",true)
            console.log("triggered");

            //await locker.lockAndWait(`user-${owner_id}`, 60 * 1000)
            await userAccount.save().catch(err=>console.log(err))
            //await locker.unlock(`user-${owner_id}`)
            
            console.log("triggered");
            theSaleAccountThatIsSet = randomNumbers[randomNumber]
        }
        const userSaleAccount = await SaleAccount.create({
            owner_id: owner_id,
            specialOrders: params.specialOrders,
            IBAN: params.iban,
            self_gained_point1: !params?.firstPoint1 ? 50 : params.firstPoint1,
            active: true
        })


        let usersTree = await invitation.findOne({
                where:{
                    sale_account_id: userSaleAccount.id
                }
            }).catch(async err=>{
                console.log(err) 
                await importantPanic(err)})
            console.log("triggered");
        if(!usersTree){
            //wait 1 second and try again
            await new Promise(resolve=>setTimeout(resolve,1000))
            usersTree = await invitation.findOne({
                where:{
                    sale_account_id: userSaleAccount.id
                }
            }).catch(async err=>{
                console.log(err) 
                await importantPanic(err)})

        }
        usersTree.self_tree_positions[owner_id].point1 = !params?.firstPoint1  ? 50 : params.firstPoint1
        usersTree.changed("self_tree_positions",true)
        //await locker.lockAndWait(`invitation-${usersTree.sale_account_id}`, 60 * 1000)
        await usersTree.save().catch(err=>console.log(err))
        //await locker.unlock(`invitation-${usersTree.sale_account_id}`)
        console.log("here");

        console.log('sale account created');
        userAccount.has_saleAccount = true
        console.log("here");

        //await locker.lockAndWait(`user-${owner_id}`, 60 * 1000)
        await userAccount.save()
        //await locker.unlock(`user-${owner_id}`)
        console.log("here");

        const checkFirstPoint1 = !params?.firstPoint1 ? 50 : params.firstPoint1
        const checked = await checkSaleAccountCreatedSuccessfully(userSaleAccount,usersTree,userAccount,owner_id,params.specialOrders,params.iban,checkFirstPoint1,changedSponsorId)
        console.log("here");


        if(!checked) {
            await importantPanic("saleAccount creation error ")
        }

        console.log("sale account created successfully");
    
        // return res.status(200).json({message: 'success', userSaleAccount: theSaleAccountThatIsSet})    
        const getFirstSponsor = await sponsorsModel.findOne({where:{owner_id:owner_id}})
        console.log("here");
        if(!getFirstSponsor) await importantPanic("HELP SALEACCOUNT SHITTED")
        const getSponsorsSaleAccocount = await SaleAccount.findOne({where:{id:getFirstSponsor.level1}})
        await tanistirmaGeliriVer(getSponsorsSaleAccocount,checkFirstPoint1*13)
        await locker.unlock(`userToSaleAccount-${params.owner_id}`)
        await locker.flag(userSaleAccount.id)
        return userSaleAccount

    }
    catch(err){
        console.log(err);
        await importantPanic(err)
        return false
    }

}
