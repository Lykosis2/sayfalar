import getServerSession from '@/lib/getServerSession'
import UserModel from '@/models/user'
import ProductModel from '@/models/product'

export default async function handler(req, res) {
  const userSession = await getServerSession(req, res)
  if (!userSession) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    })
  }

  switch (req.method) {
    case 'GET':
      return GET(req, res, userSession)
    case 'POST':
      return POST(req, res, userSession)
    case 'DELETE':
      return DELETE(req, res, userSession)
  }
}

async function GET(req, res, userSession) {
  const userId = userSession.payload.id
  console.log(userId)

  const userModel = await UserModel()

  const user = await userModel.findOne({
    where: {
      id: userId,
    },
  }).catch((err) => {
    console.log(err)
  },
  )
  console.log(user.favorites)
  return res.status(200).json(user.favorites?.favorites)
}

async function POST(req, res, userSession) {
  const userId = userSession.payload.id

  const newFavoriteId = req.body.id

  const productModel = await ProductModel()
  const userModel = await UserModel()

  const product = await productModel.findOne({
    where: {
      id: newFavoriteId,
    },
  })

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    })
  }

  const user = await userModel.findOne({
    where: {
      id: userId,
    },
  })

  const newFavorites = new Set([...user.favorites.favorites, newFavoriteId])

  await userModel.update({
    favorites: {
      favorites: [...newFavorites],
    },
  }, {
    where: {
      id: userId,
    },
  })

  return res.status(200).json({
    success: true,
    message: 'Favorite added',
  })
}

async function DELETE(req, res, userSession) {
  const userId = userSession.payload.id

  const { id } = req.query

  const userModel = await UserModel()

  const user = await userModel.findOne({
    where: {
      id: userId,
    },
  })

  const favorites = user.favorites.favorites

  favorites.splice(favorites.indexOf(id), 1)

  await userModel.update({
    favorites: {
      favorites,
    },
  }, {
    where: {
      id: userId,
    },
  })

  return res.status(200).json({
    success: true,
    message: 'Favorite deleted',
  })
}
