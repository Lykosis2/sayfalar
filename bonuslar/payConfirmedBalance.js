import locker from '../providers/locker'
import minioClient from '../providers/minio'

export default async function payConfirmedBalance(saleAccount_id, toPay, iban,isSirket) {
  const bonusDir = 'bonus/otherPays'
  const bonusLockKey = 'other'
  locker.lockAndWait(`${bonusLockKey}-bonus`)

  const initialLine = 'Üye ID,Ödenecek Tutar,IBAN\n'

  const line = `${saleAccount_id},${toPay},${iban},${isSirket}\n`

  // try getting existing file and append to it
  // if not exists, create new file and append to it with the initial line
  try {
    const existingFile = await minioClient.getObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`)
    console.log('hello')

    const existingFileStr = await streamToString(existingFile)
    console.log('hello')

    const csv = `${existingFileStr}${line}`
    console.log('hello')

    await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`, csv, {
      "Content-Type": 'text/csv',
    })
    console.log('hello')
  }
  catch (error) {
    if (error.code === 'NoSuchKey') {
      console.log('hello')

      await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`, initialLine, {
        "Content-Type": 'text/csv',
      })
      const existingFile = await minioClient.getObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`)
      const existingFileStr = await streamToString(existingFile)
      const csv = `${existingFileStr}${line}`
      await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`, csv, {
        "Content-Type": 'text/csv',
      })
    }
    else {
      console.error('An error occured while trying to append to existing file: ', error)
    }
  }

  console.log(toPay, saleAccount_id)
  console.log('hello')
  locker.unlock('career-bonus')
  return
}
 
function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)))
    stream.on('error', err => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })

}
