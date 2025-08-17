import { getAdminSession } from "@/lib/admin/session";
import refund from "@/models/refund";
const Refund = refund()
export default async function handler(req, res) {
    if(req.method === "OPTIONS") return res.status(204).end()
    console.log(req.headers.userid);
    console.log(req.headers.randomstr);
    const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
console.log(session);
if(!session) return res.status(401).end()
    switch (req.method) {
        case 'GET':
        await GET(req, res)
        break
        default:
        res.status(405).end() // Method Not Allowed
        break
    }
}


async function GET(req, res) {
    const allRefunds = await Refund.findAll()
    const retunVal = []
    allRefunds.forEach((refund) => {
        retunVal.push(refund.dataValues)
    }
    )   
    console.log(retunVal);
    res.status(200).json({ refunds: retunVal })

}