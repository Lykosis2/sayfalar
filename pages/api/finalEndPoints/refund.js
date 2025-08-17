import order from "@/models/order";
import refund from "@/models/refund";
import getServerSession from "../../../lib/getServerSession";
import { getAdminSession } from "../../../lib/admin/session";
import { refund as refundFunction } from "@/lib/refund/refund";
import saleAccount from "@/models/saleAccount";
import findIfDeleteUser from "@/lib/findIfDeleteUser";
import importantPanic from "../../../lib/errorHandle/importantPanic";
import informTheAdmin from "../../../lib/errorHandle/informTheAdmin";
import safeMemberDiscount from "../../../lib/safeMemberDiscount";
const Refund = refund()
export default async function handler(req, res) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(req.method);
    if(req.method === "OPTIONS") return res.status(204).end()
  switch (req.method) {
    case 'POST':
      await POST(req, res)
      break
    case 'PATCH':
      await PATCH(req, res)
      break
    case 'GET':
      await GET(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}

// Error change the logic of deleting product from order when refund accepted
async function POST(req, res) {
    //user 
    try{
        const SaleAccount = saleAccount()
        let body = req.body
        if(typeof body === "string") body = JSON.parse(body)
        console.log(body);
        const {user_id,order_id,saleAccoutId,products} = body 
         const usersSession = await getServerSession(req,res)
     

        console.log(usersSession);
        if(!usersSession && !admin_request) return res.status(403).end()
        console.log(user_id);
    console.log(usersSession.user.id);
        if(user_id !== usersSession.user.id && !admin_request) return res.status(403).end()
        console.log(order_id);
    console.log(products);
        if(!order_id) return res.status(502).end()
        if(!products) return res.status(502).end()


        const Refund = await refund();
        if(!Refund) {   
            await importantPanic('Refund not found','refund')
            return res.status(500).end()
        }
        const Order= await order();
        if(!Order) {
            await importantPanic('Order not found','refund')
            return res.status(500).end()
        }
        const alreadyTried = await Refund.findOne({
            where:{
                order_id:order_id,
                user_id:user_id
            }
        })
        if(alreadyTried) return res.status(403).end()
        const findPrices = await Order.findOne({
            where:{
                id:order_id,
                owner_id:user_id
            }
        }).catch(async(e)=>{
            await importantPanic('Order not found','refund')
        })
        if(!findPrices) return res.status(404).end()
        console.log(findPrices);
        const has_saleAccount = findPrices.is_saleAccount ? await SaleAccount.findOne({where:{id:findPrices.saleAccount_id}}) ?? false : false
        console.log(has_saleAccount);
        let price = 0
        let point1 = 0
        let has_special = false 
       



        await Promise.all(
            Object.keys(products).map((key)=>{
                if(!findPrices.products[key]) return 
                const count = products[key].count ? products[key].count : null
                console.log(count);
                if(!count) return
                if(count > findPrices.products[key].count) return
                price += (has_saleAccount ? safeMemberDiscount(findPrices.products[key].price) : findPrices.products[key].price ) * count
                if(findPrices.products[key].special === 1) has_special = true
                console.log(price);
                point1 += findPrices.products[key].point1 * count
                console.log(point1);
            }))
        if(has_special){
            return res.status(403).json({message:"special product can not be refunded please contact with admin"})
        }
        await Refund.create({
            order_id:order_id,
            user_id:user_id,
            sale_account_id:has_saleAccount ? has_saleAccount.id : null,
            products:products,
            price:price,
            point1:point1,
        })
        findPrices.status = 5;
        findPrices.save()
    return res.status(200).json({ price, point1 })
  }
  catch (e) {
    console.log(e)
    await importantPanic('Refund not found','refund')
    return res.status(500).end()
  }
}
async function PATCH(req, res) {
    //admin
    //check admin
    try{
        console.log("PATCH");
        let body = req.body
        if(typeof body === "string") body = JSON.parse(body)
        if(!body) return res.status(502).end()
        const adminSession = await getAdminSession(req.headers.userid,req.headers.randomstr)
        console.log(adminSession);
        if(!adminSession) return res.status(401).end()
        const nowUTC = new Date(); 
        const nowUTCPlus3 = new Date(nowUTC.getTime() + (3 * 60 * 60 * 1000));
        console.log(nowUTCPlus3)
        const hoursUTCPlus3 = nowUTCPlus3.getUTCHours();
        const isBetween2And3UTCPlus3 = hoursUTCPlus3 >= 2 && hoursUTCPlus3 < 3;
        console.log(isBetween2And3UTCPlus3)
        if(isBetween2And3UTCPlus3){
          return res.status(400).json({ message: 'Refunds are closed' })
        }
        const {refundId,accepted} = body
        if(!refundId) return res.status(502).end()
        const refundFind = await Refund.findOne({
            where:{
                id:refundId
            }
        })
        console.log(refundFind);
        if(!refundFind) return res.status(404).end()
        if(refundFind.active === false) return res.status(403).end()
        console.log(accepted);
        if(accepted){
            try{
                const SaleAccount = saleAccount()
                if(!SaleAccount) {
                    await importantPanic('SaleAccount not found','refund')
                    return res.status(500).end()
                }
                const findIfDeleteUsers = await findIfDeleteUser(refundFind,SaleAccount)
                await refundFunction(refundFind,findIfDeleteUsers)
                refundFind.active = false
                await refundFind.save()
                return res.status(200).json({refund:refundFind,accepted:true})
            }
            catch(e){
                console.log(e);
                await importantPanic('Refund not found','refund')
                return res.status(500).end()
            }
            
        }
        else{
            try{

                const Order =await order()
                console.log("hello");
                refundFind.active = false
                console.log(refundFind);
                const orderFound = await Order.findOne({where:{
                    id:refundFind.order_id
                }}).catch(async(err)=>{await informTheAdmin("NOOOOOOOOOO");console.log(err);})
                console.log(orderFound);
                if(!orderFound) {
                    console.log("hello");
                    await informTheAdmin("Non real order tried to refund")
                }
                console.log("hello");
                orderFound.status = 7 
                await orderFound.save()
                await refundFind.save()
                return res.status(200).json({refund:refundFind,accepted:false})
            }
            catch(err){
                console.log(err);
                await importantPanic("ERROR",err.message)
            }
        }
    }
    catch(err){
        console.log(err);
        await importantPanic('Refund not found','refund')
        return res.status(500).end()
    }
}

//     else {
//       refundFind.active = false
//       await refundFind.save()
//       return res.status(200).json({ refund: refundFind, accepted: false })
//     }
//   }
//   catch (err) {
//     console.log(err)
//     return res.status(500).end()
//   }
// }
// async function GET(req, res) {
//   // admin or self user
//   try {
//     const { id } = req.query
//     const session = getServerSession(req, res)

//     if (!session)
//       return res.status(401).end()
//     if (!session.user)
//       return res.status(401).end()
//     if (!(session.user.id === id))
//       return res.status(401).end()

//     const Refund = await refund()

//     const allRefund = await Refund.findAll({
//       order: [
//         ['createdAt', 'DESC'],
//       ],
//     })

//     return res.status(200).json({ allRefund })
//   }
//   catch (e) {
//     console.log(e)
//     return res.status(500).end()
//   }
// }
