import findLeftSideOfTree from '@/lib/findLeftSideOfTree'
import findSmallBranch from '@/lib/findSmallBranch'
import Invitation from '@/models/invitation'
import saleAccount from '@/models/saleAccount'
import User from '@/models/user'

const SaleAccount = saleAccount()
const invitation = Invitation()
const user = User()
export default async function handler(req, res) {
  console.log('hi')
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
  // User to saleAccount part
  // send here a request after orders openSaleAccount is true be careful of CORS and block other requests to this endpoint
  const start = Date.now()
  console.log('hi')
  const returnVal = {
    real_point1: 0,
    self_gained_point1: 0,
    real_title: 0,
    unconfirmed_balance: 0,
    active: false,
    self_tree_positions: {},
    long_tree_positions: {},
    short_tree_positions: {},

  }
  const id = req.query.id
  console.log(id)
  const usersAccount = await SaleAccount.findByPk(id).catch((err) => {
    console.log('Error: ', err)
  },
  )
  console.log(usersAccount)
  const usersTree = await invitation.findOne({ where: { sale_account_id: id } }).catch((err) => {
    console.log('Error: ', err)
  },
  )
  console.log(usersTree)
  if (!usersAccount)
    return res.status(404).json({ message: 'Sale Account not found' })
  returnVal.real_point1 = usersAccount.real_point1
  returnVal.self_gained_point1 = usersAccount.self_gained_point1
  returnVal.real_title = usersAccount.real_title
  returnVal.unconfirmed_balance = usersAccount.unconfirmed_balance
  returnVal.registered_user = usersAccount.registered_user
  returnVal.active = usersAccount.active
  const temp = {}
  console.log(usersTree.self_tree_positions)
  await Promise.all(
    Object.keys(usersTree.self_tree_positions).map (async (key) => {
      await user.findByPk(key).then((user) => {
        temp[key] = { ...usersTree.self_tree_positions[key], name: user.name, surname: user.surname, profilepicture: user.profilepicture, phoneNumber: user.phoneNumber }
      }).catch((err) => {
        console.log('Error: ', err)
      },
      )
    }),
  )
  returnVal.self_tree_positions = { ...temp }
  const value = findSmallBranch(usersTree.self_tree_positions)
  if (value[2]) {
    await Promise.all(
      Object.keys(returnVal.self_tree_positions).map((key) => {
        if (findLeftSideOfTree(returnVal.self_tree_positions[key].position))
          returnVal.long_tree_positions[key] = returnVal.self_tree_positions[key]
        else
          returnVal.short_tree_positions[key] = returnVal.self_tree_positions[key]
      }),
    )
  }
  else {
    await Promise.all(
      Object.keys(returnVal.self_tree_positions).map((key) => {
        if (findLeftSideOfTree(returnVal.self_tree_positions[key].position))
          returnVal.short_tree_positions[key] = returnVal.self_tree_positions[key]
        else
          returnVal.long_tree_positions[key] = returnVal.self_tree_positions[key]
      }),
    )
  }

  returnVal.musteri_geliri_val = usersAccount.musteriGeliri
  returnVal.ekip_geliri_val = usersAccount.ekipGeliri
  returnVal.tanistirma_geliri_val = usersAccount.tanistirmaGeliri
  returnVal.organizasyon_geliri_val = usersAccount.organizasyonGeliri
  returnVal.title = usersAccount.title
  returnVal.last_months_title = usersAccount.last_months_title
  returnVal.two_month_ago_title = usersAccount.two_month_ago_title
  console.log(returnVal)
  console.log(Date.now() - start)
  return res.status(200).json({ tree: returnVal })
}
