import findLevelSixIfExist from './findLevelSixIfExists'

export default async function findLevelOfSponsor(sponsor,deletedUserSaleAccountId,User,SaleAccount,sponsors){
    console.log(sponsor);
    console.log(deletedUserSaleAccountId);
    const usersSponsors = await SaleAccount.findOne({where:{id:deletedUserSaleAccountId}})
    console.log(usersSponsors);
    console.log(usersSponsors?.dataValues?.owner_id);
    const usersSponsor = await sponsors.findOne({where:{owner_id:usersSponsors?.dataValues?.owner_id}})
    console.log(usersSponsor);

    if(sponsor.level1){
        if(sponsor.level1 === deletedUserSaleAccountId){
            sponsor.level1 = sponsor.level2
            sponsor.level2 = sponsor.level3
            sponsor.level3 = sponsor.level4
            sponsor.level4 = sponsor.level5
            sponsor.level5 = sponsor.level6
            const usersSponsors = await SaleAccount.findOne({where:{id:sponsor.level6}})
            if(!usersSponsors) {
              const user = await User.findOne({where:{id:sponsor.owner_id}}) 
              const saleAccount = await SaleAccount.findOne({where:{id:sponsor.level1}})
              console.log(saleAccount.referenceNumber);
              await user.update({sponsor:saleAccount.referenceNumber},{hooks:false})
              sponsor.level6 = null
              await sponsor.save()
              return
            }
            console.log(usersSponsors);
            console.log(usersSponsors?.dataValues?.owner_id);
            const usersSponsor = await sponsors.findOne({where:{owner_id:usersSponsors?.dataValues?.owner_id}})
            console.log(usersSponsor);
            const sixthLevel =  sponsor.level6 !== null ? await findLevelSixIfExist(sponsors,sponsor.level6,usersSponsor) ?? null :null
            sponsor.level6 = sixthLevel
            console.log(sponsor.owner_id);
            const user = await User.findOne({where:{id:sponsor.owner_id}}) 
            const saleAccount = await SaleAccount.findOne({where:{id:sponsor.level1}})
            console.log(saleAccount.referenceNumber);
            await user.update({sponsor:saleAccount.referenceNumber},{hooks:false})
            await user.save()

        }
    }
  
  if (sponsor.level2) {
    if (sponsor.level2 === deletedUserSaleAccountId) {
      sponsor.level2 = sponsor.level3
      sponsor.level3 = sponsor.level4
      sponsor.level4 = sponsor.level5
      sponsor.level5 = sponsor.level6
      const usersSponsors = await SaleAccount.findOne({where:{id:sponsor.level6}})
      if(!usersSponsors) {
        sponsor.level6 = null
        await sponsor.save()
        return 
      }
      console.log(usersSponsors);
      console.log(usersSponsors?.dataValues?.owner_id);
      const usersSponsor = await sponsors.findOne({where:{owner_id:usersSponsors?.dataValues?.owner_id}})
      console.log(usersSponsor);
      const sixthLevel = sponsor.level6 !== null ?await findLevelSixIfExist(sponsors, sponsor.level6,usersSponsor) ?? null : null
      sponsor.level6 = sixthLevel
      console.log(sponsor)
      await sponsor.save()
    }
  }
  if (sponsor.level3) {
    if (sponsor.level3 === deletedUserSaleAccountId) {
      sponsor.level3 = sponsor.level4
      sponsor.level4 = sponsor.level5
      sponsor.level5 = sponsor.level6
      const usersSponsors = await SaleAccount.findOne({where:{id:sponsor.level6}})
      if(!usersSponsors) {
        sponsor.level6 = null
        await sponsor.save()
        return
      }
      console.log(usersSponsors);
      console.log(usersSponsors?.dataValues?.owner_id);
      const usersSponsor = await sponsors.findOne({where:{owner_id:usersSponsors?.dataValues?.owner_id}})
      console.log(usersSponsor);
      const sixthLevel =sponsor.level6 !== null ? await findLevelSixIfExist(sponsors, sponsor.level6,usersSponsor) ?? null :null
      sponsor.level6 = sixthLevel
      console.log(sponsor)
      await sponsor.save()
    }
  }
  if (sponsor.level4) {
    if (sponsor.level4 === deletedUserSaleAccountId) {
      sponsor.level4 = sponsor.level5
      sponsor.level5 = sponsor.level6
      const usersSponsors = await SaleAccount.findOne({where:{id:sponsor.level6}})
      if(!usersSponsors) {
        sponsor.level6 = null
        await sponsor.save()
        return
      }
      console.log(usersSponsors);
      console.log(usersSponsors?.dataValues?.owner_id);
      const usersSponsor = await sponsors.findOne({where:{owner_id:usersSponsors?.dataValues?.owner_id}})
      console.log(usersSponsor);
      const sixthLevel = sponsor.level6!== null ?  await findLevelSixIfExist(sponsors, sponsor.level6,usersSponsor) ?? null :null
      sponsor.level6 =sixthLevel
      console.log(sponsor)
      await sponsor.save()
    }
  }
  if (sponsor.level5) {
    if (sponsor.level5 === deletedUserSaleAccountId) {
      sponsor.level5 = sponsor.level6
      const usersSponsors = await SaleAccount.findOne({where:{id:sponsor.level6}})
      if(!usersSponsors) {
        sponsor.level6 = null
        await sponsor.save()
        return
      }
      console.log(usersSponsors);
      const usersSponsor = await sponsors.findOne({where:{owner_id:usersSponsors?.dataValues?.owner_id}})
      console.log(usersSponsor);
      const sixthLevel = sponsor.level6 !==null ?  await findLevelSixIfExist(sponsors, sponsor.level6,usersSponsor) ?? null:null
      sponsor.level6 = sixthLevel
      console.log(sponsor)
      await sponsor.save()
    }
  }
  if (sponsor.level6) {
    if (sponsor.level6 === deletedUserSaleAccountId) {
      // Burda sorun var duzelt 
      console.log(sponsor.level6)
      console.log(deletedUserSaleAccountId)
      const usersSponsors = await SaleAccount.findOne({where:{id:deletedUserSaleAccountId}})
      const usersSponsor = await sponsors.findOne({where:{owner_id:usersSponsors?.dataValues.owner_id}})
      if(!usersSponsor) {
        sponsor.level6 = null
        await sponsor.save()
      }
      console.log(usersSponsor);
      const sixthLevel = await findLevelSixIfExist(sponsors, deletedUserSaleAccountId,usersSponsor) ?? null
      console.log(sixthLevel);
      sponsor.level6 = sixthLevel // handle exception
      console.log("please log this")
      console.log(sixthLevel);
      console.log(sponsor)
      await sponsor.save()
    }
  }
  console.log(`${sponsor.owner_id} changed`) // 1c7b9494-9919-47bf-a527-59f2a0938c83 changed called 4 times
  console.log(sponsor)
  await sponsor.save()
  return sponsor
}
