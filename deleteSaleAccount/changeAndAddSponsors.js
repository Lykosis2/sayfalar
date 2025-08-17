import findLevelOfSponsor from './findLevelOfSponsor'

export default async function changeAndAddSponsors(sponsor, deletedUserSaleAccountId, User, SaleAccount, sponsors) {
  let returnVal = null
  console.log(sponsor);
  console.log(sponsor);
  try{

    returnVal = await findLevelOfSponsor(sponsor, deletedUserSaleAccountId, User, SaleAccount, sponsors)
  }
  catch(err){
    console.log(err);
  }
  return returnVal
}
