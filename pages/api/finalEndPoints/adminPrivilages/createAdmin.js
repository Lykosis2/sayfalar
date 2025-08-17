import { getAdminSession } from "../../../../lib/admin/session";
import AdminUser from "../../../../models/adminUser";
import speakeasy from 'speakeasy'
export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  console.log(req.headers.userid,req.headers.randomstr);
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  console.log(session);
if (!session || !session.superAdmin)
    return res.status(401).json({ error: 'Unauthorized' })
    switch (req.method) {
        case 'POST':
        await POST(req, res)
        break
        default:
        res.status(405).end() // Method Not Allowed
        break
    }
    }
async function POST(req, res) {
    const adminUser = AdminUser()
    const {
        name,
        surname,
        phoneNumber,
        email,
        password,
        superAdmin
    } = req.body
    console.log(email);
    console.log(password);

    function generate2FASecret() {
        const secret = speakeasy.generateSecret({
          length: 20,
          step: 30,
        });
        return secret;
      }
      const randomStr = generate2FASecret().base32;
        console.log(randomStr);
        try{

            await adminUser.create({
                name,
                surname,
                phoneNumber,
                password,
                email,
                superAdmin,
                twoFaSecret:randomStr,
                is2FAEnabled:true
            })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({message:"hata "})
        }
    res.status(200).json({message:"Admin Created",twoFaSecret:randomStr})
}
