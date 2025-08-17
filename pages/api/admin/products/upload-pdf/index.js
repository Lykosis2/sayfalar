import formidable, { errors as formidableErrors } from 'formidable'
import getServerSession from '@/lib/getServerSession'
import { getProductById, uploadProductPDF } from '@/lib/admin/products'
import { getAdminSession } from '@/lib/admin/session'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  console.log(req.headers);
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
console.log(session);


  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.query
  const product = await getProductById(id)
  if (!product)
    return res.status(404).json({ error: 'Product not found' })

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

  if (!['application/pdf'].includes(files.file[0].mimetype)) {
    res.status(400).json({ error: 'Invalid file type' })
    return
  }

  const filepath = files.file[0].filepath

  await uploadProductPDF(filepath, id)
  res.status(201).end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}
