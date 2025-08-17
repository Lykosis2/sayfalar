import { getServerSession } from 'next-auth'
import { adminOpts } from '@/middleware'
import UserModel from '@/models/user'
import { sendBulkEmails } from '@/lib/email/sendBulk'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export default async function handler(req, res) {
  const session = await getServerSession(req, res, adminOpts)

  if (!session)
    return res.status(401).json({ error: 'Unauthorized' })

  try {
    switch (req.method) {
      case 'POST':
        res.status(200).end()
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

async function POST(req, res) {
  const notificationEmail = {
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html,
  }

  const userModel = await UserModel()
  const allUsers = await userModel.findAll()
  const emails = allUsers.map(u => u.email)
  const emailList = emails.map((email) => {
    return {
      to: email,
    }
  })

  // Send in the background, no await
  sendBulkEmails(emailList, (emailData) => {
    return {
      from: process.env.SMTP_FROM,
      to: emailData.to,
      subject: notificationEmail.subject,
      // In the future we can replace {{name}} with emailData.name or things like this by getting from above
      // like: "Hi Halil, ..."
      text: notificationEmail.text,
      html: notificationEmail.html,
    }
  })

  res.status(200).end()
}
