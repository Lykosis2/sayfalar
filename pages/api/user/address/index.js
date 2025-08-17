import getServerSession from '@/lib/getServerSession'
import UserModel from '@/models/user'

export default async function handler(req, res) {
  const userSession = await getServerSession(req, res)
  if (!userSession) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    })
  }

  console.log(req.method)
  switch (req.method) {
    case 'GET':
      return GET(req, res, userSession)
    case 'POST':
      return POST(req, res, userSession)
    case 'PATCH':
      return PATCH(req, res, userSession)
    case 'DELETE':
      return DELETE(req, res, userSession)
  }
}

export async function GET(req, res, userSession) {
  const userId = userSession.payload.id

  const userModel = await UserModel()

  const user = await userModel.findOne({
    where: {
      id: userId,
    },
  })

  return res.status(200).json(user.addressData)
}

async function POST(req, res, userSession) {
  try {
    const userId = userSession.payload.id

    const newAddressData = req.body

    const userModel = await UserModel()

    const user = await userModel.findOne({
      where: {
        id: userId,
      },
    })

    const randomId = Date.now().toString(36) + Math.random().toString(36).substring(2)

    await userModel.update({
      addressData: {
        ...user.addressData,
        [randomId]: newAddressData,
      },
    }, {
      where: {
        id: userId,
      },
    })

    return res.status(200).json({
      success: true,
      randomId,
    })
  }
  catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Error' })
  }
}

export async function PATCH(req, res, userSession) {
  const userId = userSession.payload.id

  const { id, ...newAddressData } = req.body
  if (!id || id === 'undefined' || id === 'null') {
    return res.status(400).json({
      success: false,
      message: 'id is required',
    })
  }

  const userModel = await UserModel()

  const user = await userModel.findOne({
    where: {
      id: userId,
    },
  })

  if (!user.addressData[id]) {
    return res.status(400).json({
      success: false,
      message: 'id is not found',
    })
  }

  if (!Object.keys(user.addressData).includes(id)) {
    return res.status(400).json({
      success: false,
      message: 'cannot edit an address that does not exist',
    })
  }

  await userModel.update({
    addressData: {
      ...user.addressData,
      [id]: newAddressData,
    },
  }, {
    where: {
      id: userId,
    },
  })

  return res.status(200).json({
    success: true,
  })
}

export async function DELETE(req, res, userSession) {
  const userId = userSession.payload.id

  const { id } = req.query

  const userModel = await UserModel()

  const user = await userModel.findOne({
    where: {
      id: userId,
    },
  })

  const addressData = user.addressData
  console.log(addressData, id, userId)

  delete addressData[id]

  await userModel.update({
    addressData,
  }, {
    where: {
      id: userId,
    },
  })

  return res.status(200).json({
    success: true,
  })
}
