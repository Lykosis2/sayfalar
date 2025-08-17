import Invitation from "../models/invitation"
import order from "../models/order"
import product from "../models/product"
import saleAccount from "../models/saleAccount"
import User from "../models/user"

export default async function treeHealthCheck(){
    const SaleAccount = saleAccount()
    const allSaleAccounts = await SaleAccount.findAll()
    const invitation = Invitation()
    const allInvitations = await invitation.findAll()
    const user = User()
    const allUsers = await user.findAll()
    const Order = await order()
    const Product = await product()
    const allOrders = await Order.findAll()
    const saleAccountount = allSaleAccounts.length
    const invitationCount = allInvitations.length
    const usersThatHasSaleAccount = allUsers.filter(user=>user.has_saleAccount)
    const userCountForSaleAccount = usersThatHasSaleAccount.length
    const allProducts = await Product.findAll()
    const parseProducts = {}
    allProducts.forEach(product=>{
        parseProducts[product.id] = product.dataValues
    })

    console.log(saleAccountount);
    console.log(invitationCount);
    console.log(userCountForSaleAccount);

    if(
        saleAccountount !== invitationCount ||
        saleAccountount !== userCountForSaleAccount ||
        invitationCount !== userCountForSaleAccount
        ) {
        console.log("tree health check failed");
        const saleAccountOnes = allSaleAccounts.map(saleAccount=>saleAccount.owner_id)
        console.log(saleAccountOnes);
        console.log(userCountForSaleAccount);
        const nonHaveUsers = usersThatHasSaleAccount.filter(user=>!saleAccountOnes.includes(user.id))
        console.log(nonHaveUsers);
        const parsedNonHaveUsers = nonHaveUsers.map(user=>user.dataValues)
        console.log(parsedNonHaveUsers);
        const specialOrders = allOrders.filter(order => {
            return Object.keys(order.products).some(product => parseProducts[product].special) && (order.status === 2 || order.status === 3 || order.status === 4) && new Date() - new Date(order.createdAt) < 7 * 24 * 60 * 60 * 1000
        })
        const parsedSpecialOrders = specialOrders.map(order => order.dataValues)
        console.log(specialOrders);
        const intentionalUsers= parsedNonHaveUsers.filter(user=>!specialOrders.some(order=>order.owner_id === user.id))
        console.log(intentionalUsers);
        await Promise.all(intentionalUsers.map(async thisUser=>{
            await user.update({
                has_saleAccount: false
            },{where:{id:thisUser.id}})
        }))
        console.log("tree health check failed");
        const remaining = parsedNonHaveUsers.filter(user=>intentionalUsers.some(intentionalUser=>intentionalUser.id === user.id))
        console.log(remaining);
        for(let i = 0; i < remaining.length; i++){
            const owner_id = remaining[i]
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
        }


        return 




}