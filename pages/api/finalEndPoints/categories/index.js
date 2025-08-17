import { getAllCategories } from '@/lib/admin/category'

export default function handlers(req, res) {
  switch (req.method) {
    case 'GET':
      return GET(req, res)
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}

async function GET(req, res) {
  try {
    const categories = await getAllCategories()
    console.log(categories)

    return res.send({
      categories: [
        {
          id: null,
          value: 0,
          label: 'Tüm Kategoriler',
          icon: `${process.env.NEXT_PUBLIC_CDN_URL}/categories/all`,
        },
        ...categories.map(
          (cat, index) => ({
            id: cat.id,
            value: cat.id ,
            label: cat.name,
            icon: `${process.env.NEXT_PUBLIC_CDN_URL}/categories/${cat.id}`,
          }),
        ),
      ],
    })
  }
  catch (e) {
    console.log(e)
    return res.status(500).send({
      error: e,
    })
  }
}
