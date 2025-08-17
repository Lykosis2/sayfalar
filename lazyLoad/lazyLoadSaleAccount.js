export default async function lazyLoadSaleAccount() {
  try {
    const saleAccount = await import ('@/models/saleAccount')
    return result
  }
  catch (err) {
    console.log('Error in lazyLoadSaleAccount', err)
    return false
  }
}
