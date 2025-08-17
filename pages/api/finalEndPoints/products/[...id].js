import product from '@/models/product'
import SaleAccountModel from '@/models/saleAccount'
import getServerSession from '@/lib/getServerSession'
import safeMemberDiscount from '@/lib/safeMemberDiscount'

const Product = product()
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await GET(req, res)
      break
    case 'PATCH':
      await PATCH(req, res)
      break
    case 'DELETE':
      await DELETE(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
async function GET(req, res) {
  const { id } = req.query
  console.log(id);
  if (id) {
    try {
      const saleAccountModel = await SaleAccountModel()
      const session = await getServerSession(req, res)
      let isMember = false
      if (session) {
        const saleAccount = await saleAccountModel.findOne({ where: { owner_id: session?.payload?.id } })
        isMember = !!saleAccount
      }

      const result = await Product.findByPk(id[0])
      if (result) {
        console.log(result);
       
        return res.status(200).json({
          product: {
            ...result.dataValues,
            price: isMember ? safeMemberDiscount(result.dataValues.price) : result.dataValues.price,
          },
        })
      }

      else { return res.status(404).json({ error: 'Product not found' }) }
    }
    catch (error) {
      console.log(
        error
      );
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
async function PATCH(req, res) {
  const { id } = req.query
  const { change } = req.body
  console.log(id)
  if (id) {
    try {
      const result = await Product.findByPk(id[0])
      if (result) {
        await result.update(change)
        return res.status(200).json({ message: 'Product updated successfully' })
      }
      else {
        return res.status(404).json({ error: 'Product not found' })
      }
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
async function DELETE(req, res) {
  const { id } = req.query
  if (id) {
    try {
      const result = await Product.destroy({ where: { id } })
      if (result)
        res.status(200).json({ message: 'Product deleted successfully' })

      else
        res.status(404).json({ error: 'Product not found' })
    }
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
