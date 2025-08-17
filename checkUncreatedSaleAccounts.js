import order from "../models/order";
import product from "../models/product";
import saleAccount from "../models/saleAccount";
import userToSaleAccount from "./userToSaleAccount";

export default async function checkUncreatedSaleAccounts(){
    // get all orders
    const Order = await order()
    const SaleAccount = saleAccount()
    const products = await product()
    const allOrders = await Order.findAll()
    const allProducts = await products.findAll()
    const parseProducts = {}
    allProducts.forEach(product => {
        parseProducts[product.id] = product.dataValues
    })

    // get all special ones 
    const specialOrders = allOrders.filter(order => {
        return Object.keys(order.products).some(product => parseProducts[product].special) && (order.status === 2 || order.status === 3 || order.status === 4) && new Date() - new Date(order.createdAt) < 7 * 24 * 60 * 60 * 1000
    } )

    const parsedSpecialOrders = specialOrders.map(order => order.dataValues)

    const owners = parsedSpecialOrders.map(order => order.owner_id)

    const uniqueOwners = [...new Set(owners)]

    console.log(uniqueOwners);

    const allSaleAccounts = await SaleAccount.findAll()

    let nonSaleAccountOwners = uniqueOwners.filter(owner => !allSaleAccounts.some(saleAccount => saleAccount.owner_id === owner))

    console.log(nonSaleAccountOwners);

    // loop throught all and create saleAccount for them 
    for(let i = 0; i < nonSaleAccountOwners.length; i++){
        const owner_id = nonSaleAccountOwners[i]
        const specialOrders = parsedSpecialOrders.filter(order => order.owner_id === owner_id && !!order.iban )
        await userToSaleAccount({
            owner_id: owner_id,
            changedSponsorId: specialOrders[0]?.sponsorChangeId ?? null ,
            iban: specialOrders[0]?.iban,
            firstPoint1: 50,
            specialOrders: {
              [specialOrders[0].id]: specialOrders[0].reduce((acc, product) => {
                acc[product.id] = product
      
                return acc
              }, {}),
            },
          })
    }
    
    return
}

    