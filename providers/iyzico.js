// @ts-expect-error Iyzipay does not have types for this
import Iyzipay from 'iyzipay'
import UserModel from '@/models/user'
import locker from './locker'

export const iyzipay = new Iyzipay({
  apiKey: process.env.IYZIPAY_API_KEY,
  secretKey: process.env.IYZIPAY_SECRET_KEY,
  uri: 'https://sandbox-api.iyzipay.com',
})

export async function init3dsInitialize(request) {
  return new Promise((resolve, reject) => {
    iyzipay.threedsInitialize.create(request, (err, result) => {
      if (err)
        reject(err)
      else
        resolve(result)
    })
  })
}
// Continue if no problems, otherwise throw error
export async function handleIyzicoCallback(body) {
  if (body.status !== 'success' || body.mdStatus !== '1')
    throw new Error('Iyzico callback failed')
  return body
}
export async function finishPayment(request) {
  return new Promise((resolve, reject) => {
    iyzipay.threedsPayment.create(request, (err, result) => {
      if (err)
        reject(err)
      else
        resolve(result)
    })
  })
}

// Card CRUD ops

/*
{
        cardAlias: 'card alias',
        cardHolderName: 'John Doe',
        cardNumber: '5528790000000008',
        expireMonth: '12',
        expireYear: '2030'
    }
  */
export async function saveCard(userId, cardInfo) {
  await locker.lockAndWait(`user-${userId}`, 30 * 1000)
  const userModel = await UserModel()
  const user = await userModel.findOne({ where: { id: userId } })
  console.log(cardInfo);
  return await new Promise((resolve, reject) => {
    console.log(user.cardUserKey);

    iyzipay.card.create({
      locale: Iyzipay.LOCALE.TR,
      email: user.email,
      cardUserKey: user?.cardUserKey ?? undefined,
      card: cardInfo,
    }, (err, result) => {
      if (err)
        return reject(err)
      console.log(result);
      

      if (result.status !== 'success') {
        locker.unlock(`user-${userId}`)
        reject(new Error('Iyzico card creation failed'))
        return

      }

      if (!user.cardUserKey)
        userModel.update({ cardUserKey: result.cardUserKey }, { where: { id: user.id } })

      const { status, locale, ...cardInfo } = result
      const cardsToSave = user.cardData.cards
      cardsToSave.push(cardInfo)
      cardInfo.id = Math.random().toString(36).substring(7)
      cardsToSave.name = cardInfo.cardAlias

      userModel.update({
        cardData: {
          cards: cardsToSave,
        },
      }, { where: { id: user.id } })

      locker.unlock(`user-${userId}`)

      resolve(result)
    })
  })
}

export async function getCardsFromDb(userId) {
  const user = await UserModel().findOne({ where: { id: userId } })
  console.log(user.cardData);
  if(!user.cardData) {
    user.cardData = {"cards":[]}
    await user.save()
  }
  return user.cardData.cards
}

export async function getCardsIyzico(userId) {
  const userModel = await UserModel()
  const user = await userModel.findOne({ where: { id: userId } })

  return new Promise((resolve, reject) => {
    iyzipay.cardList.retrieve({
      locale: Iyzipay.LOCALE.TR,
      cardUserKey: user.cardUserKey,
    }, (err, result) => {
      if (err)
        return reject(err)

      if (result.status !== 'success')
        throw new Error('Iyzico card list retrieval failed')

      resolve(result)
    })
  })
}

export async function getOneCardFromDb(userId, cardId) {
  const user = await UserModel().findOne({ where: { id: userId } })
  const card = user.cardData.cards.find(card => card.id === cardId)

  if (!card)
    throw new Error('Card not found')

  return card
}

export async function deleteCard(userId, cardId) {
  console.log(userId, cardId);
  await locker.lockAndWait(`user-${userId}`, 30 * 1000)
  console.log('locked');
  const userModel = await UserModel()
  const user = await userModel.findOne({ where: { id: userId } })
  console.log(user.cardData.cards);
  const card = user.cardData.cards.find(card => card.id === cardId)
  console.log(card);

  if (!card)
    throw new Error('Card not found')

  return new Promise((resolve, reject) => {
    iyzipay.card.delete({
      locale: Iyzipay.LOCALE.TR,
      cardUserKey: user.cardUserKey,
      cardToken: card.cardToken,
    }, (err, result) => {
      console.log(err);
      console.log(result);
      if (err)
        return reject(err)

      if (result.status !== 'success' ||( result.errorCode && result.errorCode !== '3010')){
        locker.unlock(`user-${userId}`).then(() => {
          reject(new Error('Iyzico card deletion failed'))
        }
        )
      }

      const cardsToSave = user.cardData.cards.filter(card => card.id !== cardId)

      userModel.update({
        cardData: {
          cards: cardsToSave,
        },
      }, { where: { id: user.id } })

    locker.unlock(`user-${userId}`).then(() => {

      resolve(result)
    })
    })
  })
}
