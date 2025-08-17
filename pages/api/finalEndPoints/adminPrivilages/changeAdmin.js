import { getAdminSession } from "../../../../lib/admin/session";
import AdminUser from "../../../../models/adminUser";

export default async function handler(req, res) {
    if(req.method === "OPTIONS") return res.status(204).end()
    console.log(req.headers.userid,req.headers.randomstr);
    const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
    console.log(session);
if (!session || !session.superAdmin)
    return res.status(401).json({ error: 'Unauthorized' })
    switch (req.method) {
        case 'PATCH':
        await PATCH(req, res)
        break
        case 'DELETE':
        await DELETE(req, res)
        break
        case 'GET':
        await GET(req, res)
        break
        default:
        res.status(405).end() // Method Not Allowed
        break
    }
    
}
async function PATCH(req,res){
    const adminUser = AdminUser()
    const {
        name,
        surname,
        phoneNumber,
        email,
        password,
        superAdmin
    } = req.body
    const {
        id
    } = req.query
    if(id === "18c4a4fd-776e-4d64-8fde-227bd3bba39b" || id === "f8c7e019-3b73-4856-a87d-f7ba0b99a4bc") return res.status(401).json({message:"Unauthorized"})
    await adminUser.update({
        name,
        surname,
        phoneNumber,
        password,
        email,
        superAdmin
    },{where:{id}})
    res.status(200).json({message:"Admin Updated"})
}

async function DELETE(req,res){
    const adminUser = AdminUser()
    const {
        email
    } = req.query
    if(email === "parlapancagan0907@gmail.com" || email === "john.doe@example.com") return res.status(401).json({message:"Unauthorized"})
    await adminUser.destroy({where:{email:email}})
    res.status(200).json({message:"Admin Deleted"})
}
async function GET(req,res){
    const adminUser = AdminUser()
    const {email} = req.query
    if(!email) return res.status(404).json({message:"Admin Not Found"})
    const user = await adminUser.findOne({where:{email}})
    if(!user) return res.status(404).json({message:"Admin Not Found"})
    res.status(200).json(user)
}