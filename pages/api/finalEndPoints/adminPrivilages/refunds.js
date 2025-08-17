import { getAdminSession } from "../../../../lib/admin/session"
import refund from "../../../../models/refund"

export default async function handler(req,res){
    console.log(req.method);
    if(req.method === "OPTIONS") return res.status(204).end()
    console.log(req.headers.userid,req.headers.randomstr);
    const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
    console.log(session);
  if (!session ) return res.status(401).json({ error: 'Unauthorized' })
    switch(req.method){
        case 'GET':
            await GET(req,res)
            return 
        default:
            res.status(400).json({message:'error'})
    }
}
async function GET(req,res){
    const Refund = await refund()
    
    const allRefund = await Refund.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
    })
    const returnVal = {}
        allRefund.forEach((refund)=>{
            returnVal[refund.id] = refund
        })
    return res.status(200).json({refunds:allRefund})

}