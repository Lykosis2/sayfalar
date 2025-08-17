import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '@/lib/admin/products'
import { getAdminSession } from '@/lib/admin/session'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export default async function handler(req, res) {


  // TODO HASH THE RANDOMSTR
  if(req.method === "OPTIONS") return res.status(204).end(),
  console.log(req.headers.userid);
  console.log(req.headers.randomstr);
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  console.log(req.body)
  console.log(session);
  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

  try {
    switch (req.method) {
      case 'GET':
        await GET(req, res)
        break
      case 'POST':
        await POST(req, res)
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
  catch (e) {
    console.log(e)
    res.status(500).end()
  }
}

async function GET(req, res) {
  if (req.query.id) {
    const product = await getProductById(req.query.id)
    res.status(200).json({ product })
    return
  }
  const products = await getAllProducts()
  res.status(200).json({ products })
}

async function POST(req, res) {
  try{
    if (!req.body)
      return res.status(400).end()
    if(typeof req.body === 'string')
      req.body = JSON.parse(req.body)
    
    const createdProduct = await createProduct(req.body)
    res.status(201).json({ createdProduct })
  }
  catch(e){
    console.log(e);
    return res.status(500).end()
  }
}

async function PATCH(req, res) {
  try{
    console.log(req.body);
    const parsedBody = JSON.parse(req.body)

    console.log(parsedBody);
    const updatedProduct = await updateProduct(req.query.id, parsedBody)
    res.status(200).json({ updatedProduct })
  }
  catch(e){
    console.log(e);
    return res.status(500).end()
  }
}

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
async function DELETE(req, res) {
  await deleteProduct(req.query.id)
  res.status(204).end()
}
