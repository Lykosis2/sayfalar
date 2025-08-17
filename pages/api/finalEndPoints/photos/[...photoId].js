import formidable, { errors as formidableErrors } from 'formidable'
import getServerSession from '@/lib/getServerSession'
import minioClient from '@/lib/providers/minio'
import { getAdminSession } from '@/lib/admin/session'

export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  switch (req.method) {
    case 'PUT':
      await PUT(req, res)
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}

async function PUT(req, res) {
  // Make sure admin or else return 401
  // download given image to a static place in the server

  // slider1
  // slider2
  // slider3
  // slider4

  // topsmall1
  // topsmall2
  // topsmall3

  // downBig1
  // downSmall1
  // downSmall2
  // downSmall3
  // downSmall4

  // Confirm person is admin
  // If admin then take the given file and save it to the stabel aws s3 bucket

  try {
    const userSession = await getAdminSession(req.headers.userid, req.headers.randomstr)
    console.log(userSession)
    if (!userSession) {
      res.status(401).end()
      return
    }

    const availablePhotoIds = ['slider1', 'slider2', 'slider3', 'slider4', 'promotion1', 'promotion2', 'promotion3', 'bigPromotion1', 'bigPromotion2', 'bigPromotion3', 'bigPromotion4', 'bigPromotion5']
    const photoId = req.query.photoId[0]
    if (!availablePhotoIds.includes(photoId)) {
      res.status(400).end()
      return
    }

    const form = formidable({})
    let fields
    let files
    try {
      [fields, files] = await form.parse(req)
    }
    catch (err) {
      // example to check for a very specific error
      if (err.code === formidableErrors.maxFieldsExceeded) {

      }
      console.error(err)
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
      res.end(String(err))
      return
    }

    const filepath = files.file[0].filepath

    const uploadResult = await minioClient.fPutObject(process.env.MINIO_BUCKET_PUBLIC, `photos/${photoId}`, filepath, {
      "Content-Type": files.file[0].mimetype,
    })
    console.log(uploadResult, 'uploadResult')

    res.status(200).end()
  }
  catch (e) {
    console.log(e)
    res.status(500).end()
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
