import transporter from '@/lib/providers/nodemailer'

// Function to send emails
export async function sendBulkEmails(emailList, generateMessageCallback) {
  for (const item of emailList) {
    try {
      // Generate email message from callback
      const message = generateMessageCallback(item)

      // Send mail with defined transport object
      const info = await transporter.sendMail(message)

      console.log('Message sent: %s', info.messageId)

      // Wait for 30 seconds before sending the next mail (2 mails per minute)
      await new Promise(resolve => setTimeout(resolve, 30000))
    }
    catch (error) {
      console.error('Error sending email:', error)
    }
  }
}

// // Example usage
// const emailList = [
//   { to: 'recipient1@example.com', name: 'John Doe' },
//   { to: 'recipient2@example.com', name: 'Jane Doe' },
// ]
//
// sendBulkEmails(emailList, (item) => {
//   return {
//     from: '"Sender Name" <your-email@gmail.com>',
//     to: item.to,
//     subject: 'Hello ✔',
//     text: `Hello ${item.name}`,
//     html: `<b>Hello ${item.name}</b>`,   
//   }
// })
