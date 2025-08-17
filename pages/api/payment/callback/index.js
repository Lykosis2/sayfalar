import OrderModel from '@/models/order'
import UserModel from '@/models/user'
import userToSaleAccount from '@/lib/userToSaleAccount'
import givePointsInOrder from '@/lib/givePointsInOrder'
import generateAndSaveBill from '@/lib/bill'
import locker from '@/lib/providers/locker'
import safeMemberDiscount from '../../../../lib/safeMemberDiscount'
import product from '@/models/product'
import { handleIyzicoCallback } from '../../../../lib/providers/iyzico'
import akposCallbackHandle from '../../../../lib/akposCallbackHandle'

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
  */
export default async function handler(req, res) {
  // TODO tum orderları gonderen verden timeSpan    randomString su verileri cikar KULLANICI ICIN   
  const all = await locker.showAllLocks()
  console.log(all);
  console.log(req.body)
  if(!req) {
    res.setHeader('Content-Type', 'text/html');

    // Write your HTML content as a string
    const htmlContent = `
 <!DOCTYPE html>
 <html>
     <head>
         <title>Payment Callback</title>
         <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
         <style>
             body {
                 font-family: 'Arial', sans-serif;
                 background-color: #f4f4f4;
                 margin: 0;
                 padding: 20px;
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 height: 100vh;
             }
             .container {
                 text-align: center;
                 background: white;
                 padding: 50px;
                 border-radius: 8px;
                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
             }
             h1 {
                 color: #ff0000;
                 font-family: 'Arial', sans-serif;
             }
             p {
                 color: #666;
                 font-family: 'Arial', sans-serif;

             }
         </style>
     </head>
     <body>
         <div class="container">
             <h1>Odeme Gerceklesmedi</h1>
             <p>Odemede bir sorun oldu ya da mesaj akbank tarafindan gonderilmiyor 3 saniye icinde anasayfaya yonlendiriliceksiniz.</p>
         </div>
         <script>
 
             // Redirect after 3 seconds
             setTimeout(function() {
                 window.location.href = '/home';
             }, 3000);
         </script>
     </body>
 </html>
 `;
 return res.send(htmlContent);
  }
  if(!req.body) {
    res.setHeader('Content-Type', 'text/html');

    // Write your HTML content as a string
    const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Payment Callback</title>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    text-align: center;
                    background: white;
                    padding: 50px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #ff0000;
                    font-family: 'Arial', sans-serif;
                }
                p {
                    color: #666;
                    font-family: 'Arial', sans-serif;
   
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Odeme Gerceklesmedi</h1>
                <p>Odemede bir sorun oldu ya da mesaj akbank tarafindan gonderilmiyor 3 saniye icinde anasayfaya yonlendiriliceksiniz.</p>
            </div>
            <script>
    
                // Redirect after 3 seconds
                setTimeout(function() {
                    window.location.href = '/home';
                }, 3000);
            </script>
        </body>
    </html>
    `;
 return res.send(htmlContent);
  }


  const orderModel = await OrderModel()
  if (!orderModel) {
    await importantPanic('Order model not found', 'fixTree')
  }
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const body = req.body
  console.log(body)
  const orderData = await orderModel.findOne({
    where: {
      id: body.OrderId,
    },
  }).catch(async (e) => {
    await informTheAdmin(e)
    console.log(e)
  })
  console.log(orderData)
  if (!orderData) {
    res.status(404).end()
    return
  }

  const order = orderData.dataValues
  
  if(orderData.status === 2 ){
    res.status(400).end()
    return
  }
 

  
  console.log(orderData.timeSpan);
  console.log(orderData.randomString);
  const fromAkbank = await akposCallbackHandle(req.body,orderData)
  if(!fromAkbank)  {
    res.setHeader('Content-Type', 'text/html');

    // Write your HTML content as a string
    const htmlContent = `
 <!DOCTYPE html>
 <html>
     <head>
         <title>Payment Callback</title>
         <style>
             body {
                 font-family: 'Arial', sans-serif;
                 background-color: #f4f4f4;
                 margin: 0;
                 padding: 20px;
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 height: 100vh;
             }
             .container {
                 text-align: center;
                 background: white;
                 padding: 50px;
                 border-radius: 8px;
                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
             }
             h1 {
                 color: #ff0000;
             }
             p {
                 color: #666;
             }
         </style>
     </head>
     <body>
         <div class="container">
             <h1>Odeme Gercekleşmedi</h1>
             <p>Odemede bir sorun oldu ya da mesaj akbank tarafindan gonderilmiyor 3 saniye icinde anasayfaya yonlendiriliceksiniz.</p>
         </div>
         <script>
 
             // Redirect after 3 seconds
             setTimeout(function() {
                 window.location.href = '/home';
             }, 3000);
         </script>
     </body>
 </html>
 `;
 return res.send(htmlContent);
  }

  await orderData.update({
    // Order is being processed
    status: 2,
  })


  const productModel = product()
  

  const userModel = await UserModel()
  if (!userModel) {
    await importantPanic('User model not found', 'fixTree')
  }

  

  // Throws error if request is invalid or failed (skip)
  // const body = await handleIyzicoCallback(req.body)
  
  // TODO: do something

  

  // if (order.status !== 0) {
  //   // Order is not in the state: "payment pending"
  //   // Avoids double payment, payment after cancellation
  //   res.status(400).end()
  //   return
  // }

  
  console.log(order)


await Promise.all(
  Object.keys(order.products).map(async (product) => {
    const productData = await productModel.findOne({
      where:{
        id:product
      }
    })
    console.log(productData)
    await locker.lockAndWait(`product-${product}`)
    await productData.update({
      stock:productData.stock - order.products[product].count >= 0 ? productData.stock - order.products[product].count: 0
    })
    await locker.unlock(`product-${product}`)

  })
)


  const user = await userModel.findOne({
    where: {
      id: order.owner_id,
    },
  }).catch(e => console.log(e))
  const allProducts = await productModel.findAll()
  const parsedAllProducts = {}
  allProducts.forEach(product => {
    parsedAllProducts[product.id] = product
  })
  console.log(user)

  const orderProductsArray = Object.values(order.products)

  const regularProducts = orderProductsArray.filter(product => !product.special)
  const regularProductsTotalPrice = regularProducts.reduce((acc, product) => acc * 100 + (user.has_saleAccount ? safeMemberDiscount(product.price):product.price )* 100 * product.count, 0) / 100
  console.log(regularProductsTotalPrice)

  const specialProducts = orderProductsArray.filter(product => product.special > 0)
  console.log(specialProducts)
  const highestSpecailProductPrice = specialProducts.length > 0 ? specialProducts.sort((a, b) => b.price - a.price)[0].price : 0
  console.log(highestSpecailProductPrice)
  const specialProductsTotalPrice = specialProducts.reduce((acc, product) => acc * 100 + product.price * 100 * product.count, 0) / 100
  console.log(specialProductsTotalPrice)
  let willcreateSaleAccount = false
  for (const product of specialProducts) {
    if (product.special === 1) {
      if (!user.has_saleAccount) {
        willcreateSaleAccount = true
        break
      }
    }
    else {
    // throw new Error('Invalid special product type')
      return res.status(400).json({ message: 'Invalid special product type' })
    }
  }
  console.log(willcreateSaleAccount)
  // Do something, give points and all that stuff (only work with regular products)

  console.log(regularProductsTotalPrice)

  console.log(specialProductsTotalPrice)
  // Üye alışverisinde kapanmamış lock var 
  console.log("puan")
  const givenPoints = await givePointsInOrder(
    user.has_saleAccount,
    user.id,
    order.saleAccount_id,
    regularProducts,
    specialProducts,
    regularProductsTotalPrice,
    specialProductsTotalPrice,
    highestSpecailProductPrice,
    willcreateSaleAccount,
  )
  console.log("hellopuan verildi ");
  console.log(givenPoints);
  // Odemmeye yapa tıkladı
  // once sordum degıscen mı diye
  // yeni olanı yazdı
  // odeme bitince ona degisti

  // true false oldugunda

  // true false oldugunda

  if (willcreateSaleAccount) {
    await userToSaleAccount({
      owner_id: user.id,
      changedSponsorId: order.sponsorChangeId,
      iban: order.iban,
      firstPoint1: highestSpecailProductPrice / 13,
      specialOrders: {
        [order.id]: specialProducts.reduce((acc, product) => {
          acc[product.id] = product

          return acc
        }, {}),
      },
    })
  }


   

  console.log(orderProductsArray);
  console.log(order.id.toString());
  // TODO SALI GUNU HALLET BUNU 
    generateAndSaveBill([{
      orderNo: order.id.toString(),
      status: '2',
      customerFullName: `${order.name} ${order.surname}`,
      paymentTypeId: 1,
      billingTc: user.tcNumber,
      billingAddress: order.addressData.address,
      billingCity: order.addressData.city,
      billingCountry: 'Türkiye',
      billingDistrict: order.addressData.district,
      billingFullName: `${order.name} ${order.surname}`,
      orderDate: new Date().toISOString(),
      orderId: order.id.toString(),
      items: orderProductsArray.map(product => ({
        itemId: product.id.toString(),
        title: parsedAllProducts[product.id].name,
        name: parsedAllProducts[product.id].name,
        price: (user.has_saleAccount ? safeMemberDiscount(product.price):product.price )*0.8,
        siteSku: product.id.toString(),
        status: '2',
        vatAmount: (user.has_saleAccount ? safeMemberDiscount(product.price):product.price ) * 0.2,
        vatRate: 20,
        barcode: product.barcodeNo,
        quantity: product.count,
        totalAmountWithVat: (user.has_saleAccount ? safeMemberDiscount(product.price):product.price ) * product.count,
        finalTotalAmountWithVat: (user.has_saleAccount ? safeMemberDiscount(product.price):product.price ) * product.count,
        sku: product.id.toString(),  
      })),
      finalTotalAmountWithVat:order.price,
      totalAmount: order.price,
    }])
   res.setHeader('Content-Type', 'text/html');

   // Write your HTML content as a string
   const htmlContent = `
<!DOCTYPE html>
<html>
    <head>
        <title>Payment Callback</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                text-align: center;
                background: white;
                padding: 50px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #32a852;
            }
            p {
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Payment Processed Successfully</h1>
            <p>Your payment was processed. You will be redirected shortly.</p>
        </div>
        <script>
            // Clear the 'cart' from localStorage
            localStorage.removeItem('cart');

            // Redirect after 3 seconds
            setTimeout(function() {
                window.location.href = '/home';
            }, 3000);
        </script>
    </body>
</html>
`;

   // Send the HTML content
   return res.send(htmlContent);
}
