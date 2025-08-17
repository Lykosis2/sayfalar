import SaleAccountModel from '@/models/saleAccount'
import UserModel from '@/models/user'

export default async function handler(req, res) {
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
  // Return all saleAccounts address name and real_titles and genders
  // Depending on that return a object like this

  const saleAccount = await SaleAccountModel()
  const userModel = await UserModel()

  try {
    let allSaleAccounts = await saleAccount.findAll()
    let usersWithSaleAccounts = await userModel.findAll({
      where: {
        has_saleAccount: true,
      },
    })

    allSaleAccounts = allSaleAccounts.map((saleAccount) => {
      return saleAccount.dataValues
    })

    usersWithSaleAccounts = usersWithSaleAccounts.map((user) => {
      return user.dataValues
    })

    const sortedSaleAccounts = allSaleAccounts.sort((a, b) => {
      return b.real_point1 - a.real_point1
    })

    const responseSaleAccounts = sortedSaleAccounts.map((saleAccount) => {
      const user = usersWithSaleAccounts.find((user) => {
        return user.id === saleAccount.owner_id
      })
      const genderSuffix = user.gender === 0 ? 'Bey' : 'Hanım'
      console.log(user)
      console.log(user.addressData)
      return {
        name: `${user.name} ${genderSuffix}`,
        real_title: saleAccount.real_title,
        latitude: Object.values(user?.addressData)?.[0]?.latitude ?? 37.7830 + (Math.random() * 0.05 - 0.025),
        longitude: Object.values(user.addressData)?.[0]?.longitude ?? 29.0963 + (Math.random() * 0.05 - 0.025),
      }
    }).reduce((acc, cur, currentIndex) => {
      acc[currentIndex.toString()] = cur
      return acc
    }, {})

    return res.status(200).json(responseSaleAccounts)
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

async function getCoordinatesFromAddress(address) {
  // https://www.google.com/maps/search/[address url encoded]
}
