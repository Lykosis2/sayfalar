import { adminOpts } from '@/middleware'
import getServerSession from '@/lib/getServerSession'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '@/lib/admin/category'
import { getAdminSession } from '@/lib/admin/session'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
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
    res.status(500).json({
      error: e.message,
    })
  }
}

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
async function GET(req, res) {
  if (req.query.id) {
    const category = await getCategoryById(req.query.id)
    res.status(200).json({ category })
    return
  }
  const categories = await getAllCategories()
  res.status(200).json({ categories })
}

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
async function POST(req, res) {
  const createdCategory = await createCategory(req.body)
  res.status(201).json({ createdCategory })
}

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
async function PATCH(req, res) {
  const updatedCategory = await updateCategory(req.query.id, req.body)
  res.status(200).json({ updatedCategory })
}

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
async function DELETE(req, res) {
  await deleteCategory(req.query.id)
  res.status(204).end()
}
