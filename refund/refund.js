import documentUsersSponsors from '../bonuslar/uye/documentUsersSponsor'
import makeRefundForThisMonthUser from '../iade/makeRefundForThisMonthUye'
import makeRefundForThisMonthMusteri from '../iade/makeRefundForThisMonthMusteri'
import makeRefundForOtherMonthMusteri from '../iade/makeRefundForOtherMonthMusteri'
import makeRefundForOtherMonthUye from '../iade/makeRefundForOtherMonthUye'
import deleteAccountOfUser from '../deleteAccountOfUser'
import calculateIfThisMonth from '../calculateIfThisMonth'
import User from '@/models/user'
import deleteAccountofUserAndDeleteItFromOtherMonthsSponsors from '../deleteAccountofUserAndDeleteItFromOtherMonthsSponsors'
import SaleAccountModel from '../../models/saleAccount'
import SponsorsModel from '../../models/sponsors'
import UserWeeklyMonthlyTableModel from "../../models/userWeeklyMonthlyTable"
import InvitationModel from '../../models/invitation'
import hissedarBonusu from "../../models/hissedarBonusu"
import OrderModel from "../../models/order"
import importantPanic from '../errorHandle/importantPanic'
import recalculateTree from './recalculateTree'
import { Sequelize } from 'sequelize'
import locker from '../providers/locker'
export async function refund(refund, deleteAccount) {
  const orderModel = await OrderModel()
  if(!orderModel) {
    await importantPanic('Order model not found','refund')
  }
  const saleAccountModel = SaleAccountModel()
  if(!saleAccountModel) {
    await importantPanic('Sale Account model not found','refund')
  }
  const sponsorModel = SponsorsModel()
  if(!sponsorModel) {
    await importantPanic('Sponsors model not found','refund')
  }
  const userWeeklyMonthlyTableModel = UserWeeklyMonthlyTableModel()
  if(!userWeeklyMonthlyTableModel) {
    await importantPanic('User Weekly Monthly Table model not found','refund')
  }
  const invitationModel = InvitationModel()
  if(!invitationModel) {
    await importantPanic('Invitation model not found','refund')
  }
  const hissedarBonusuModel = hissedarBonusu()
  if(!hissedarBonusuModel) {
    await importantPanic('Hissedar Bonusu model not found','refund')
  }
  const userModel = User()
  if(!userModel) {
    await importantPanic('User model not found','refund')
  }
  console.log(refund);
  console.log(deleteAccount);
/*
order_id:order_id,
user_id:user_id,
sale_account_id:has_saleAccount ? saleAccoutId : null,
products:products,
price:price,
point1:point1,
*/
  const order = await orderModel.findOne({
    where: {
      id: refund.order_id,
    },
  })

  if (!order || !order.id || !order.price || !order.owner_id || !order.products || !order.createdAt || !order.updatedAt) { // order.statusu de ekle ekleme mantigi gelince TODO
    return false
  }

  // TODO: Check if order is refundable (not refunded already)

  // If this month, deduct from unconfirmed balance and deduct from this month's table
  // Go to sponsors and deduct from their tables
  // Go from sale account to invitations

  const sponsorsOfRefunder = await sponsorModel.findOne({
    where: {
      owner_id: refund.user_id,
    },
  })

  const documentedSponsors = await documentUsersSponsors(sponsorsOfRefunder)
  const refundPrice = refund.price
  const refundPoint1 = refund.point1
  const refunderMemberUserId = refund.user_id
  const refunderUyeAccount = await saleAccountModel.findOne({
    where: {
      id: refund.sale_account_id,
    },
  })
  const isRefunderMember = !!refunderUyeAccount
  const refunderMemberId = refund.sale_account_id ? refund.sale_account_id : null
  const refundersWeeklyTable = await userWeeklyMonthlyTableModel.findOne({
    where: {
      saleAccount_id: refund.sale_account_id,
    },
  })
  const orderCreation = new Date(order.createdAt)
  const refundIsThisMonth =  calculateIfThisMonth(orderCreation)
  // daha iyi yap bunu




//Eksik kısım burası


// TODO : IF U DELETE USER TAKE MONEY FROM THEM REFUNDED AMOUNT   

console.log(refundIsThisMonth);
console.log(isRefunderMember);

const orderStatus = order.status
// PROD TEST DONE 
if(isRefunderMember && refundIsThisMonth){
  if(orderStatus !== 5) return false //TODO ODEME GELINCE BUNU DEGISTIR
  const refundCorrect = await makeRefundForThisMonthUser(true,documentedSponsors,refundPrice,refunderMemberId,refunderMemberUserId,invitationModel,saleAccountModel)

  await Promise.all(
    Object.keys(refund.products).map(async key=>{
      if(!order.products[key]) return 
      order.products[key].count - refund.products[key].count > 0 ? 
      order.products[key].count -= refund.products[key].count :
      delete order.products[key]
      order.changed('products', true);
    })
  )
  order.status = 6
  await order.save()
  return refundCorrect

}




  // Probably no problem
  else if (!isRefunderMember && refundIsThisMonth) {
    console.log(orderStatus);
    if (orderStatus !== 5) return false // TODO ODEME GELINCE BUNU DEGISTIR
    const refundCorrect = await makeRefundForThisMonthMusteri(refunderMemberUserId, documentedSponsors, refundPrice, invitationModel, saleAccountModel, hissedarBonusuModel)
    // Delete the refund from order
    console.log(order)
    await Promise.all(
      Object.keys(refund.products).map(async (key) => {
        if (!order.products[key])
          return
        order.products[key].count - refund.products[key].count > 0
          ? order.products[key].count -= refund.products[key].count
          : delete order.products[key]
        order.changed('products', true)
      }),
    )
    order.status = 6
    await locker.lockAndWait(`order-${order.id}`)
    await order.save()
    await locker.unlock(`order-${order.id}`)
    return refundCorrect
    // checkRefundMadeCorrectly(false) TODO IMPLEMENT THIS
  }




// Probably no problem
else if(isRefunderMember && !refundIsThisMonth){
  if(order.status !== 5) return false // TODO ODEME GELINCE BUNU DEGISTIR
  console.log("triggered");
  const refundCorrect = await makeRefundForOtherMonthUye(refunderMemberId,documentedSponsors,refundPrice,userWeeklyMonthlyTableModel,saleAccountModel,refunderMemberUserId)

  await Promise.all(
    Object.keys(refund.products).map(async key=>{
      if(!order.products[key]) return 
      order.products[key].count - refund.products[key].count > 0 ? 
      order.products[key].count -= refund.products[key].count :
      delete order.products[key]
      order.changed('products', true);
    })
  )
  order.status = 6
  await locker.lockAndWait(`order-${order.id}`)
  await order.save()
  await locker.unlock(`order-${order.id}`)
  console.log(refunderUyeAccount.last_months_real_point1);
  const updatedUyeAccount = await saleAccountModel.findOne({
    where:{
      id:refunderMemberId
    }
  })
  const updatedRefundersWeeklyTable = await userWeeklyMonthlyTableModel.findOne({
    where:
    {saleAccount_id:refunderMemberId},
    order: [
      [Sequelize.fn('ABS', Sequelize.fn('DATEDIFF', Sequelize.col('createdAt'), Sequelize.literal('CURRENT_TIMESTAMP'))), 'ASC'],
      ['createdAt', 'DESC']    ],
  })

  if(refunderUyeAccount && refundersWeeklyTable) await recalculateTree(updatedRefundersWeeklyTable,updatedUyeAccount) 
  console.log(refunderUyeAccount.last_months_real_point1);  
  return refundCorrect
}

  // Probably no problem
  else if (!isRefunderMember && !refundIsThisMonth) {
    if (orderStatus !== 5)
      return false // TODO ODEME GELINCE BUNU DEGISTIR
    const refundCorrect = await makeRefundForOtherMonthMusteri(refunderMemberUserId, documentedSponsors, refundPrice, userWeeklyMonthlyTableModel, hissedarBonusuModel, saleAccountModel,refunderMemberUserId)
    await Promise.all(
      Object.keys(refund.products).map(async (key) => {
        if (!order.products[key])
          return
        order.products[key].count - refund.products[key].count > 0
          ? order.products[key].count -= refund.products[key].count
          : delete order.products[key]
        order.changed('products', true)
      }),
    )
    order.status = 6
    await locker.lockAndWait(`order-${order.id}`)
    await order.save()
    await locker.unlock(`order-${order.id}`)
    return refundCorrect
  }
  return true
}
