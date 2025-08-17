import locker from "../providers/locker"

export default async function resetTheSaleAccount(pathcedSaleAccount,SaleAccount) {
  try {
    const updatedSaleAccont = await SaleAccount.findOne({ where: { id: pathcedSaleAccount.id } })

    updatedSaleAccont.real_point1 = 0
    updatedSaleAccont.active = false
    updatedSaleAccont.self_gained_point1 = 0
    updatedSaleAccont.organizasyonGeliri = 0
    updatedSaleAccont.ekipGeliri = 0
    updatedSaleAccont.musteriGeliri = 0
    updatedSaleAccont.tanistirmaGeliri = 0
    updatedSaleAccont.unconfirmed_balance = 0
    //await locker.lockAndWait(`saleAccount-${updatedSaleAccont.id}`, 60 * 1000)
    await updatedSaleAccont.save()
    console.log(updatedSaleAccont.id);
    console.log(updatedSaleAccont.real_point1);
    await locker.unlock(`saleAccount-${updatedSaleAccont.id}`)

    return true
  }
  catch (err) {
    console.log(err)
    return false
  }
}
