import * as bcrypt from 'bcrypt'
import AdminUserModel from '@/models/adminUser'
import { verifyOTP } from '@/lib/2fa'
import * as session from '@/lib/admin/session'

export default async function POST(request, res) {
  try{

    let body = request.body
    if (typeof request.body === 'string')
      body = JSON.parse(request.body)
  
    const myUser = AdminUserModel()

    const user = await myUser.findOne({ where: { email: body?.email?.trim() } }).catch((e)=>console.log(e))
    // console.log(user.twoFaSecret, body.token2FA);
    // console.log(verifyOTP(user.twoFaSecret, body.token2FA));
    if (user && (await bcrypt.compare(body.password, user.password)) && verifyOTP(user.twoFaSecret, body.token2FA)) {
      const { password, twoFaSecret, ...userWithoutPassword } = user
      console.log(userWithoutPassword);
      const newSession = await session.createAdminSessionFromUser(userWithoutPassword)
      console.log(newSession);
      const result = {
        ...userWithoutPassword,
        session: newSession,
        sessionToken: newSession.randomStr,
        userId: newSession.userId,
      }
  
      res.status(200).json(result)
    }
    else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  }
  catch(e){
    console.log(e);
    return res.status(500).json({message:"hata "})
  }
}
