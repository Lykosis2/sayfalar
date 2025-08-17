import User from '@/models/user'
import saleAccount from '../../../../models/saleAccount'
import getImportantPanic from '../../../../lib/getImportantPanic'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await POST(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}

// Works
async function POST(req, res) {
  const inImportantPanic =await  getImportantPanic()
  if(inImportantPanic) return res.status(400).json({ message: 'Registration is closed' })
  const user = User()
  const SaleAccount = saleAccount()
  let body = req.body
  if (typeof req.body === 'string')
    body = JSON.parse(req.body)

  console.log(body)
  const { name, surname, profilepicture, identityNumber: tcNumber, gender, email, phoneNumber, age, password, sponsor } = body
  try {
    const now = Date.now()
    const nowUTC = new Date(); 
    const nowUTCPlus3 = new Date(nowUTC.getTime() + (3 * 60 * 60 * 1000));
    console.log(nowUTCPlus3)
    const hoursUTCPlus3 = nowUTCPlus3.getUTCHours();
    const isBetween2And3UTCPlus3 = hoursUTCPlus3 >= 2 && hoursUTCPlus3 < 3;
    console.log(isBetween2And3UTCPlus3)
    if(isBetween2And3UTCPlus3){
      return res.status(400).json({ message: 'Registration is closed' })
    }
    const createdUser = await user.create({ name, surname, password, profilepicture, tcNumber, gender, email, phoneNumber, age, sponsor })
    const end = Date.now()
    console.log(end - now)
    const userWithoutPassword = { ...createdUser.get() }
    delete userWithoutPassword.password
    const nonNullSponsor = !!sponsor ?  sponsor : 80562
    console.log(nonNullSponsor);
    const sponsorsInformations = await SaleAccount.findOne({ where: { referenceNumber: nonNullSponsor } })
    const sponsorsUserAccount = await user.findOne({ where: { id: sponsorsInformations.owner_id } })
    const sponsorsInfo = {
      name: sponsorsUserAccount.name,
      surname: sponsorsUserAccount.surname,
      referenceNumber: sponsorsInformations.referenceNumber,
    }
    console.log(sponsorsInfo);
    const result = { message: 'User created successfully', user: userWithoutPassword ,sponsorsInformations:sponsorsInfo}
    return res.status(200).json(result)
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error creating user' })
  }
}
