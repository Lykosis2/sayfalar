import formidable, { errors as formidableErrors } from 'formidable'
import getServerSession from '@/lib/getServerSession'
import minioClient from '@/lib/providers/minio'

export default async function handler(req, res) {
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
  try {
    const userSession = await getServerSession(req, res)
    if (!userSession) {
      res.status(401).end()
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
        res.writeHead(413, { 'Content-Type': 'text/plain' })
        res.end('Too large')
        return
      }
      console.error(err)
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
      res.end(String(err))
      return
    }

    if (!['image/jpeg', 'image/webp', 'image/png'].includes(files.file[0].mimetype)) {
      res.status(400).json({ error: 'Invalid file type' })
      return
    }

    const filepath = files.file[0].filepath

    const uploadResult = await minioClient.fPutObject(process.env.MINIO_BUCKET_PUBLIC, `pfp/${userSession.payload.id}`, filepath, {
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
