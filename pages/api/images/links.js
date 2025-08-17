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

  // {"images":[{"id":1,"type":"slider1","link":"","createdAt":"2023-11-28T11:16:14.000Z","updatedAt":"2023-11-28T11:16:18.000Z"},{"id":2,"type":"slider2","link":"","createdAt":"2023-11-28T11:16:18.000Z","updatedAt":"2023-11-28T11:16:18.000Z"}]}
  // to:
  // {"slider1": "https://xxx"}
  const links = {}
  images.forEach((image) => {
    links[image.type] = image.link
  })

  res.status(200).json(links)
}
