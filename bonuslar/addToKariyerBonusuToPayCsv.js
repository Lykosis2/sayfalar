import axios from 'axios'
import minioClient from '../providers/minio'
import locker from '../providers/locker'

export default async function addToKariyerBonusuToPayCsv(toPay, saleAccount_id, iban,isSirket) {
    // ONLY REQUEST FROM SERVER ACCCEPTED

    const bonusDir = 'bonus/kariyerBonusu'
    const bonusLockKey = 'career'
    await locker.lockAndWait(`${bonusLockKey}-bonus`)
    const initialLine = 'Üye ID,Ödenecek Tutar,IBAN\n'
    const line = `${saleAccount_id},${toPay},${iban},${isSirket}\n`

    try {
      const existingFile = await minioClient.getObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`)
      const existingFileStr = await streamToString(existingFile)
      const csv = `${existingFileStr}${line}`
      await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`, csv, {
        "Content-Type": 'text/csv',
      })
    }
    catch (error) {
      if (error.code === 'NoSuchKey') {
        await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`, initialLine, {
          "Content-Type": 'text/csv',
        })
        const existingFile = await minioClient.getObject(process.env.MINIO_BUCKET_PRIVATE, `${bonusDir}/this_months.csv`)
        const existingFileStr = streamToString(existingFile)
        console.log(existingFileStr)
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
  
    await locker.unlock('career-bonus')
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
