import { getAdminSession } from "../../../../lib/admin/session";
import saleAccount from "../../../../models/saleAccount";
import User from "../../../../models/user";

export default async function handler(req, res) {
    if(req.method === "OPTIONS") return res.status(204).end()
    console.log(req.headers.userid,req.headers.randomstr);
    const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
    console.log(session);
  if (!session ) return res.status(401).json({ error: 'Unauthorized' })    
  console.log(req.method);
  switch (req.method) {
        case 'GET':
        return await GET(req, res)
        case 'PATCH':
        return await PATCH(req, res)
    }
}
async function GET(req,res){
    const user = User()
    const SaleAccount = saleAccount()
    const foundUser = await user.findOne({where:{email:req?.query?.email}})
    if(!foundUser) return res.status(404).json({message:"User not found"})
    const saleAccountOfUser = await SaleAccount.findOne({where:{owner_id:foundUser.id}})
    if(!saleAccountOfUser) {
        return res.status(200).json({
            user:{
            id:foundUser.id,
            name:foundUser.name,
            surname:foundUser.surname,
            email:foundUser.email,
            phoneNumber:foundUser.phoneNumber,
            password:foundUser.password,
            isSaleAccount:false,
            isCompany:false,
            iban:null,
        }})
    }
    else{
        console.log(saleAccountOfUser.IBAN);
        return res.status(200).json({user:{
            id:foundUser.id,
            name:foundUser.name,
            surname:foundUser.surname,
            email:foundUser.email,
            phoneNumber:foundUser.phoneNumber,
            isSaleAccount:true,
            isCompany:saleAccountOfUser.is_company,
            iban:saleAccountOfUser.IBAN,
        }})
    }
}
async function PATCH(req,res){
    try{

        const user = User()
        const SaleAccount = saleAccount()
        const {
            name,
            surname,
            phoneNumber,
            email,
            password,
            isSaleAccount,
            isCompany,
            iban,
        } = req.body
        const {
            id
        } = req.query
        const foundUser = await user.findOne({where:{id}})
        console.log(foundUser);
        console.log(isCompany);
        console.log(isSaleAccount);
        console.log(password);
        console.log(!password);
        if(!foundUser) return res.status(404).json({message:"User not found"})
        if(!password) {
            await user.update({
                name,
                surname,
                phoneNumber,
                email,
            },{where:{id}})
            if(isSaleAccount){
                const saleAccountOfUser = await SaleAccount.findOne({where:{owner_id:id}})
                if(!saleAccountOfUser) return res.status(404).json({message:"Sale Account not found"})
                await SaleAccount.update({
                    is_company:isCompany,
                    IBAN:iban,
                },{where:{owner_id:id}})
            }
            return res.status(200).json({message:"User Updated"})
        }
        else{
            const myUser =await user.findOne({where:{id}})
            myUser.name = name
            myUser.surname = surname
            myUser.phoneNumber = phoneNumber
            myUser.email = email
            myUser.password = password
            myUser.changed('password', true);
            await myUser.save()
            console.log(password);
            if(isSaleAccount){
                const saleAccountOfUser = await SaleAccount.findOne({where:{owner_id:id}})
                if(!saleAccountOfUser) return res.status(404).json({message:"Sale Account not found"})
                await SaleAccount.update({
                    is_company:isCompany,
                    IBAN:iban,
                },{where:{owner_id:id}})
            
            }
            return res.status(200).json({message:"User Updated"})  
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).end()
    }
}