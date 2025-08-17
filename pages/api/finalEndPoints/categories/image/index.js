import formidable, { errors as formidableErrors } from 'formidable'
import getServerSession from '@/lib/getServerSession'
import { getCategoryById, uploadCategoryImage } from '@/lib/admin/category'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
*/
export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const session = await getServerSession(req, res)

  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.query
  const product = await getCategoryById(id)
  if (!product)
    return res.status(404).json({ error: 'Category not found' })

  const form = formidable({})
  let files
  let fields
  try {
    [fields, files] = await form.parse(req)
  }
  catch (err) {
    // example to check for a very specific error
    if (err.code === formidableErrors.maxFieldsExceeded) {
      res.status(400).json({ error: 'Max fields exceeded' })
      return
    }
    console.error(err)
    res.status(500).end()
    return
  }

  if (!['image/jpeg', 'image/webp', 'image/png'].includes(files.file[0].mimetype)) {
    res.status(400).json({ error: 'Invalid file type' })
    return
  }

  const filepath = files.file[0].filepath

  await uploadCategoryImage(filepath, id, files.file[0].mimetype)
  res.status(201).end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}
