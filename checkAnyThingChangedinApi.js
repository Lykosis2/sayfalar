import saleAccount from "../models/saleAccount";
import User from "../models/user";

export default async function checkAnyThingChangedinApi(UserFromToken) {
    const user = User()
    const SaleAccount = saleAccount()
    const foundUser = await user.findOne({where:{id:UserFromToken.id}})
    if(!foundUser) return true
    console.log(UserFromToken);
    if(UserFromToken.hasSaleAccount){
        console.log("triggered");
        const saleAccountOfUser = await SaleAccount.findOne({where:{owner_id:UserFromToken.id}})
        console.log("triggered");
        if(!saleAccountOfUser) return true
        console.log("triggered");
        if(saleAccountOfUser.is_company !== UserFromToken.is_company) return true
        console.log("triggered");
        if(saleAccountOfUser.IBAN !== UserFromToken.iban) return true
        console.log("triggered");
    }
    console.log("triggered");
    if(foundUser.name !== UserFromToken.name) return true
    console.log("triggered");
    if(foundUser.surname !== UserFromToken.surname) return true
    console.log("triggered");
    if(foundUser.phoneNumber !== UserFromToken.phoneNumber) return true
    console.log("triggered");
    if(foundUser.email !== UserFromToken.email) return true
    console.log("triggered");
    return false
}