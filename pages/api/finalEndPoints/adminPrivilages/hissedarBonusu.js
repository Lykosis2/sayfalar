import locker from '@/lib/providers/locker'
import minioClient from '@/lib/providers/minio'

export default async function handler(req, res) {
  if(req.method === "OPTIONS") return res.status(204).end()
  
  const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })
  
  switch (req.method) {
    case 'POST':
      return await POST(req, res)
    case 'GET':
      return res.status(200).json({ message: 'ok' })
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}

async function POST(req, res) {
  // ONLY REQUEST FROM SERVER ACCCEPTED
  // const { toPay, saleAccount_id, iban } = req.body
  // console.log(process.cwd())
  // const oldFileExists = existsSync(`${process.cwd()}/public/csv/kariyerBonusu/this_months.csv`)
  // if (!oldFileExists) {
  //   const csvHeader = 'Üye ID,Ödenecek Tutar,IBAN\n'
  //   writeFileSync(`${process.cwd()}/public/csv/kariyerBonusu/this_months.csv`, csvHeader, 'utf8')
  // }
  //
  // const oldFileStr = readFileSync(`${process.cwd()}/public/csv/kariyerBonusu/this_months.csv`, 'utf8')
  // const csv = `${oldFileStr}${saleAccount_id},${toPay},${iban}\n`
  // writeFileSync(`${process.cwd()}/public/csv/kariyerBonusu/this_months.csv`, csv, 'utf8')
  const bonusDir = 'bonus/hissedarBonusu'
  const bonusLockKey = 'hissedar'
  locker.lockAndWait(`${bonusLockKey}-bonus`)
  const { toPay, saleAccount_id, iban, isSirket } = req.body
  const initialLine = 'Üye ID,Ödenecek Tutar,IBAN\n'
  const line = `${saleAccount_id},${toPay},${iban},${isSirket}\n`

  // try getting existing file and append to it
  // if not exists, create new file and append to it with the initial line
  try {
    const existingFile = await minioClient.getObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`)
    const existingFileStr = await streamToString(existingFile)
    const csv = `${existingFileStr}${line}`
    await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`, csv, {
      ContentType: 'text/csv',
    })
  }
  catch (error) {
    if (error.code === 'NoSuchKey') {
      await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`, initialLine, {
        ContentType: 'text/csv',
      })
      const existingFile = await minioClient.getObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`)
      const existingFileStr = streamToString(existingFile)
      console.log(existingFileStr)
      const csv = `${existingFileStr}${line}`
      await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`, csv, {
        ContentType: 'text/csv',
      })
    }
    else {
      console.error('An error occured while trying to append to existing file: ', error)
    }
  }

  console.log(toPay, saleAccount_id)

  locker.unlock('hissedar-bonus')
  return res.status(200).json({ message: 'ok' })
}
function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)))
    stream.on('error', err => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

