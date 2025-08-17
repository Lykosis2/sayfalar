import ImagesModel from '@/models/images'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        await GET(req, res)
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
