import { z } from 'zod'
import { getOneCardFromDb, init3dsInitialize } from '@/lib/providers/iyzico'
import { getProductById } from '@/lib/admin/products'
import getServerSession from '@/lib/getServerSession'
import { getCategoriesByProductId, getCategoryById } from '@/lib/admin/category'
import OrderModel from '@/models/order'
import SaleAccountModel from '@/models/saleAccount'
import UserModel from '@/models/user'
import safeMemberDiscount from '@/lib/safeMemberDiscount'
import locker from '@/lib/providers/locker'
import getImportantPanic from '../../../lib/getImportantPanic'
import importantPanic from '../../../lib/errorHandle/importantPanic'
import akpos3dsInitialize from '../../../lib/akpos3dsInitialize'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
  */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }
  const inImportantPanic =await getImportantPanic()
  if(inImportantPanic) return res.status(400).json({ message: 'Payments are closed' })

  const orderModel = await OrderModel()
  if(!orderModel){
    await importantPanic('Order model not found','fixTree')
  }
  const userModel = await UserModel()
  if(!userModel){
    await importantPanic('User model not found','fixTree')
  }

  const userSession = await getServerSession(req, res)
  if (!userSession) {
    res.status(401).json({
      error: 'Unauthorized',
    })
    return
  }


  const nowUTC = new Date(); 
  const nowUTCPlus3 = new Date(nowUTC.getTime() + (3 * 60 * 60 * 1000));
  console.log(nowUTCPlus3)
  const hoursUTCPlus3 = nowUTCPlus3.getUTCHours();
  const isBetween2And3UTCPlus3 = hoursUTCPlus3 >= 2 && hoursUTCPlus3 < 3;
  console.log(isBetween2And3UTCPlus3)
  if(isBetween2And3UTCPlus3){
    return res.status(400).json({ message: 'Payments are closed' })
  }
  try {
    const saleAccountModel = await SaleAccountModel()
    if(!saleAccountModel){
      await importantPanic('SaleAccount model not found','fixTree')
    }
    const user = userSession.payload
    if (!user)
      return res.status(401).end()
    const userSaleAccount = await saleAccountModel.findOne({ where: { owner_id: user.id } })
    console.log(req.body);


    const bodyValidator = z.object({
      sponsorChangeId: z.optional(z.string()),
      iban: z.optional(z.string()),
      products: z.array(z.object({
        id: z.number(),
        count: z.number().min(1),
      })),
      computedLastPrice: z.number(), // for verification to avoid price mismatch, check this before initiating iyzico
      identityNumber: z.string(),
      addressID: z.string(),
      // cardID: z.string(),
      // cvc: z.string().optional(),
      cardNo: z.string().min(16).max(16),
      cardUserName: z.string().min(3).max(50),
      cardEndDate: z.string().min(5).max(5),
      cardCvc: z.string().min(3).max(4),
    })

    const bodyValidation = bodyValidator.safeParse(req.body)
    if (!bodyValidation.success) {
      res.status(400).json({
        error: bodyValidation.error,
      })
      return
    }

    const body = bodyValidation.data

    const userFromDb = await userModel.findOne({ where: { id: userSession.payload.id } }) // TODO : MAKE SESSION
    if (!userFromDb) {
      res.status(400).json({
        error: 'User not found.',
      })
      return
    }

    const address = userFromDb.addressData[body.addressID]
    if (!address) {
      res.status(400).json({
        error: 'Address not found.',
      })
      return
    }
    console.log(address)
    // Get and verify products (id, available stock)
    const products = await Promise.all(body.products.map(async (product) => {
      console.log(product, 'product wtf?')
      const productDataRaw = await getProductById(product.id).catch(async (err) => {
        console.error(err)
        await importantPanic('Product not found','fixTree')
      })
      if (!productDataRaw) {
        res.status(400).json({
          error: 'Product not found.',
        })
        return
      }

      const productData = productDataRaw.dataValues

      // Add category data
      const categoryProductRels = await getCategoriesByProductId(product.id).then(categories => categories.map(category => category.dataValues))
      console.log(categoryProductRels)
      let rawCategory
      if (categoryProductRels[0]?.category_id)
        rawCategory = await getCategoryById(categoryProductRels[0].category_id)
      let category = { name: 'Diğer' }
      if (rawCategory?.dataValues)
        category = rawCategory?.dataValues
      productData.firstCategory = category

      if (productData.stock < product.count) {
        res.status(400).json({
          error: 'Product out of stock.',
        })
        return
      }

      return {
        ...productData,
        _count: product.count,
      }
    }))

    if (products.find(product => product.special === 1) && (!body.iban) && (!userSaleAccount)) {
      res.status(400).json({
        error: 'Iban required.',
      })
      return
    }

    const totalPrice = products.reduce((total, product) => {
      const productPrice = userSaleAccount ? safeMemberDiscount(product.price) : product.price
      // Safe float arithmetic
      return total + (productPrice * 100 * product._count)
    }, 0) / 100
    console.log(totalPrice)
    if (totalPrice !== body.computedLastPrice) {
      console.log('Price mismatch!', totalPrice, body.computedLastPrice)
      res.status(400).json({
        error: 'Price mismatch.',
      })
      return
    }
    console.log(totalPrice);


    const productsById = products.map(product => ({
      id: product.id,
      count: product._count,
      size: product.size,
      special: product.special,
      price: product.price,
      point1: product.point1,
      images: product?.images?.images,
      barcodeNo: product.barcodeNo,
    })).reduce((acc, product) => {
      acc[product.id] = product

      return acc
    }, {})

    function generateSecureRandomString() {
      //generate random number between 1 and 1000000000 
      const random = Math.floor(Math.random() * 1000000000000000) + 1;
      //convert random number to string
      const randomString = random.toString();
      return randomString
  }
  function getCurrentFormattedTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours() + 3).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
  
      return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

    const randomString = generateSecureRandomString(24);
    const TimeSpan = getCurrentFormattedTime();

      const order = await orderModel.create({
      name: user.name,
      surname: user.surname,
      is_saleAccount: !!userSaleAccount,
      saleAccount_id: userSaleAccount?.id,
      owner_id: user.id,
      sponsorChangeId: body.sponsorChangeId,
      iban: body.iban,
      identityNumber: body.identityNumber,
      products: productsById,
      price: totalPrice,
      status: 0,
      paymentMethod: body.paymentMethod === 'iyzico' ? 0 : -1,
      addressData: {
        address: address.address,
        city: address.city,
        district: address.district,
        neighborhood: address.neighborhood,
        postalCode: address.postalCode,
      },
      randomString: randomString,
      timeSpan: TimeSpan,
      
    })

    // const iyzicoAddressData = {
    //   contactName: `${order.name} ${order.surname}`,
    //   city: address.city,
    //   country: 'TR',
    //   address: address.address,
    //   zipCode: address.postalCode,
    // }

   // const card = await getOneCardFromDb(user.id, body.cardID)
    // if (!card) {
    //   res.status(400).json({
    //     error: 'Card not found.',
    //   })
    //   return
    // }
    // console.log(card);
    // const iyzicoPaymentCardData = {
    //   cardUserKey: card.cardUserKey,
    //   cardToken: card.cardToken,
    //   cvc: body.cvc,
    // }

    // const iyzicoPaymentCardData = {
    //   cardHolderName: body.paymentInfo.cardHolderName,
    //   cardNumber: body.paymentInfo.cardNumber,
    //   expireMonth: body.paymentInfo.expireMonth,
    //   expireYear: body.paymentInfo.expireYear,
    //   cvc: body.paymentInfo.cvc,
    //   registerCard: '0',
    // }

    // console.log(products[0])
    // console.log(body);

    
      // const paymentInitResponse = await init3dsInitialize({
      //   locale: 'tr',
      //   conversationId: order.id,
      //   price: totalPrice,
      //   paidPrice: totalPrice,
      //   currency: 'TRY',
      //   installment: 1,
      //   // TODO: success callback url
      //   callbackUrl: 'https://lykosis.com/api/payment/callback',
      //   paymentCard: {
      //     ...iyzicoPaymentCardData,
      //   },
      //   buyer: {
      //     id: user.id,
      //     name: user.name,
      //     surname: user.surname,
      //     email: user.email,
      //     identityNumber: body.identityNumber,
      //     registrationAddress: address.address,
      //     ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      //     city: address.city,
      //     country: 'Turkey',
      //     zipCode: address.zipCode,
      //   },
      //   shippingAddress: {
      //     ...iyzicoAddressData,
      //     country: 'TR',
      //   },
      //   billingAddress: {
      //     ...iyzicoAddressData,
      //     country: 'TR',
      //   },
      //   basketItems: products.map(product => ({
      //     id: product.id,
      //     name: product.name,
      //     category1: product.firstCategory.name,
      //     itemType: 'PHYSICAL',
      //     price: userSaleAccount ? (safeMemberDiscount(product.price) * 100 * product._count / 100).toFixed(2)  : (product.price * 100 * product._count / 100).toFixed(2),
      //   })),
      // })

      const paymentInitResponse = await akpos3dsInitialize(order.id,order.price*100,body.cardUserName,body.cardNo,body.cardEndDate,body.cardCvc,order,TimeSpan,randomString)


      // console.log(paymentInitResponse);
      if (paymentInitResponse.status === 'success') {
        res.status(200).json({
          htmlContent: paymentInitResponse.threeDSHtmlContent, // error here
        })
      }
      else {
        console.error(paymentInitResponse)
        res.status(400).json({
          error: 'Payment initiation failed.',
        })
      } 
  }
  catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Internal server error.',
      message: error.message,
      stack: error.stack,
    })
  }
}
