import User from "../../models/user";
import saleAccount from "../../models/saleAccount";
import checkAndSolveProblems from "./CheckTree/checkAndSolveProblems";
export default async function noSponsor(sponsors,userId){
    // const user = User()
    // const SaleAccount = saleAccount()
   
    // const findIfhaveSaleAccount = await SaleAccount.findOne({where:{owner_id:userId}}) 
    // const findIfHaveSaleAccountInUser = await user.findOne({where:{id:userId}}).has_saleAccount
    // if((findIfhaveSaleAccount && !findIfHaveSaleAccountInUser) || (!findIfhaveSaleAccount && findIfHaveSaleAccountInUser) ){
    //     saleAccountUserMismatch(userId)
    //     return
    // }
    // if(findIfHaveSaleAccountInUser){
    //     await checkAndSolveProblems(userId)
    // }
    // else{
    //     await sponsors.create({owner_id:userId,level1:"2582a601-956b-4076-a6b3-bd40e11df286",level2:null,level3:null,level4:null,level5:null,level6:null})
    //     return
    // }
}