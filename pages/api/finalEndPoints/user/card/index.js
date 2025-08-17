import getServerSession from '@/lib/getServerSession'

import { deleteCard, getCardsFromDb, getCardsIyzico, saveCard } from '@/lib/providers/iyzico'

export default async function handler(req, res) {
  const userSession = await getServerSession(req, res)
  if (!userSession) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    })
  }

  switch (req.method) {
    case 'GET':
      return GET(req, res, userSession)
    case 'POST':
      return POST(req, res, userSession)
    case 'DELETE':
      return DELETE(req, res, userSession)
    default:
      return res.status(405).json({
        success: false,
        message: 'Method Not Allowed',
      })
  }
}

async function GET(req, res, userSession) {
  try {
    const userId = userSession.payload.id
    const cards = req.query.iyzico ? await getCardsIyzico(userId) : await getCardsFromDb(userId)
    console.log(cards);
    return res.status(200).json(cards)
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error fetching cards' })
  }
}

async function POST(req, res, userSession) {
  try {
    const userId = userSession.payload.id
    console.log(userId);
    const cardInfo = req.body
    console.log(cardInfo);
    const returnVal=await saveCard(userId, cardInfo)
    console.log('saved card');
    console.log(returnVal);
    return res.status(201).json({ success: true })
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error saving card' })
  }
}

async function DELETE(req, res, userSession) {
  try {
    const userId = userSession.payload.id
    const { id } = req.query
    await deleteCard(userId, id)
    return res.status(200).json({ success: true })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error deleting card' })
  }
}
