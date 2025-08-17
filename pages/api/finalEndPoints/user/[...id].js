import User from '@/models/user'

const user = User()
export default async function handler(req, res) {
  console.log(req.query)
  switch (req.method) {
    case 'GET':
      await GET(req, res)
      break
    case 'PUT':
      await PUT(req, res)
      break
    case 'PATCH':
      await PATCH(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
// Works
async function GET(req, res) {
  // Make sure wanted user is authentaicated and authorized and the same as the user in the token
  const { id } = req.query
  console.log(id[0])
  if (id) {
    try {
      const result = await user.findByPk(id[0])
      if (result && result.dataValues && result.dataValues.password) {
        delete result.dataValues.password;
      }
      const returnVal = {}
      if (result && result.dataValues && result.dataValues.password) {
        delete result.dataValues.password;
      }
      
      if (result && result.dataValues && result.dataValues.addressData) {
        result.dataValues.addressData = Object.keys(result.dataValues.addressData).reduce((acc, key) => {
          const addressItem = result.dataValues.addressData[key];
          addressItem.id = key;
          acc[key] = addressItem;
          return acc;
        }, {});
      }
      
      console.log(result);
      if (result)
        return res.status(200).json({ user: result })

      else
        return res.status(404).json({ error: 'User not found' })
    }
    catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
async function PATCH(req, res) {
  // Normal changes
  const { id } = req.query
  const { change } = req.body

  if (id) {
    try {
      const result = await User.findByPk(id)
      if (result) {
        await result.update(change)
        return res.status(200).json({ message: 'User updated successfully' })
      }
      else {
        return res.status(404).json({ error: 'User not found' })
      }
    }
    catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
async function PUT(req, res) {
  // Make sure wanted user is authentaicated and authorized and the same as the user in the token
  // Password change
  const { id } = req.query
  const { changedPassword } = req.body
  // confirm again and change an gmail so it can be confirmed
  if (id) {
    try {
      const result = await User.findByPk(id[0])
      if (result) {
        await result.update({ password: changedPassword })
        return res.status(200).json({ message: 'Password changed successfully' })
      }
      else {
        return res.status(404).json({ error: 'User not found' })
      }
    }
    catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
