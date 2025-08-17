import * as bcrypt from 'bcrypt'
import { signJwtAccessToken } from '/lib/jwt'
import User from '@/models/user'
import saleAccount from '@/models/saleAccount'

export default async function handler(request, res) {
  if (request.method !== 'POST')
    return res.status(405).end()
  try {
    let body = request.body
    console.log(body);
    if (typeof request.body === 'string')
      body = JSON.parse(request.body)

    const myUser = User()
    const SaleAccount = saleAccount()
    const userData = await myUser.findOne({ where: { email: body.email } })
    if (!userData)
      return res.status(401).json({ message: 'Invalid credentials' })

    const user = userData.dataValues

    if (user && (await bcrypt.compare(body.password, user.password))) {
      const { password, ...userWithoutPassword } = user
      const accessToken = signJwtAccessToken(userWithoutPassword)
      const { dataValues } = user

      const hasSaleAccount = await SaleAccount.findOne({ where: { owner_id: user.id } })

      const result = { ...userWithoutPassword, ...dataValues, accessToken, hasSaleAccount: !!hasSaleAccount, saleAccountId: hasSaleAccount?.dataValues?.id ,referenceNumber:hasSaleAccount?.dataValues?.referenceNumber,iban:hasSaleAccount?.dataValues?.IBAN,is_company:hasSaleAccount?.dataValues?.is_company}
      return res.status(200).json(result)
    }
    else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
