import { getAdminSession } from "../../../../lib/admin/session";
import AdminUser from "../../../../models/adminUser";

export default async function handler(req,res){
    if(req.method === "OPTIONS") return res.status(204).end()
    console.log(req.headers.userid,req.headers.randomstr);
    const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
    console.log(session);
if (!session || !session.superAdmin)
    return res.status(401).json({ error: 'Unauthorized' })
    switch (req.method) {
        case 'GET':
        await GET(req, res)
        break
        default:
        res.status(405).end() // Method Not Allowed
        break
    }
}
async function GET(req,res){
    const adminUser = AdminUser()
    const allAdmins = await adminUser.findAll()
    res.status(200).json(allAdmins)
}