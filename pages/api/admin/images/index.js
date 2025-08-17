import { getAdminSession } from '@/lib/admin/session'
import ImagesModel from '@/models/images'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  const session = await getAdminSession(req.headers.userid, req.headers.randomstr)

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
  const imagesModel = ImagesModel()
  const images = await imagesModel.findAll()

  res.status(200).json({ images })
}

async function POST(req, res) {
  const imagesModel = ImagesModel()
  let body = req.body 
  if (typeof body === 'string') {
    body = JSON.parse(body)
  }
  const existingImage = await imagesModel.findOne({ where: { type: body.type } })
  if (!existingImage) {
    await imagesModel.create({
      type: body.type,
      link: body.link,
    })
  }
  else {
    await imagesModel.update({
      link: body.link,
    }, {
      where: { type: body.type },
    })
  }

  res.status(200).json('OK')
}
