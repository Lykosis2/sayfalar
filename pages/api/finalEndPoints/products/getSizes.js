import product from '@/models/product'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await GET(req, res)
    default:
      return res.status(405).json({
        message: 'method not allowed',
      })
  }
}

async function GET(req, res) {
  const Product = product()
  const setOfSizes = new Set()
  try {
    const result = await Product.findAll()
    result.forEach((product) => {
      setOfSizes.add(product.size)
    })

    const returnVal = [
      { value: 0, label: 'Tüm Boyutlar' },
    ]

    Array.from(setOfSizes).forEach((size, index) => {
      returnVal.push({ value: index + 1, label: `${size} ml` })
    })

    res.status(200).json({ sizes: returnVal })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
