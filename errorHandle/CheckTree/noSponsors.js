import User from "../../../models/user"
import importantPanic from "../importantPanic"
import checkAndFixIfProblemInTree from "./checkAndFixIfProblemInTree"
import checkAndSolveProblems from "./checkAndSolveProblems"
export default async function noSponsors(id,sponsors,saleAccount){
    const user = User()
    const usersAccount = await user.findOne({where:{id:id}})
    if(!usersAccount){
        await importantPanic('User not found','fixTree')
        return false
    }
    const usersSponsors = await sponsors.findOne({where:{owner_id:id}})
    if(usersSponsors){
        await checkAndSolveProblems(id)
        return true
    }
    if(!usersSponsors){
        const levelValues = await determineLevels(user,usersAccount,saleAccount)
        await sponsors.create({
            owner_id:id,
            level1:levelValues.level1,
            level2:levelValues.level2,
            level3:levelValues.level3,
            level4:levelValues.level4,
            level5:levelValues.level5,
            level6:levelValues.level6,
        }).catch(async (err)=>{
            await importantPanic('Error while creating sponsors',err.message)
            return false
        })  
    }
}
const determineLevels = async function (user,userAccount,saleAccount) {
    const levelValues = {

    }
    const firstSponsor = await saleAccount.findOne({where:{referenceNumber:userAccount?.sponsor}})
    if(!firstSponsor){
        await importantPanic('First sponsor not found','fixTree')
        return res.status(400).json({message:'User not found'})
    }
if(firstSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || firstSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || firstSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a" || 
firstSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286"){
    levelValues['level1'] = firstSponsor?.id 
    levelValues['level2'] = null
    levelValues['level3'] = null
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    return levelValues
}
levelValues['level1'] = firstSponsor?.id
const userAccountOfFirstSponsor = await user.findOne({where:{id:firstSponsor?.owner_id}})
const secondSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfFirstSponsor?.sponsor}})
if(!secondSponsor){
    levelValues['level2'] = null
    levelValues['level3'] = null
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    return levelValues
}
if(secondSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || secondSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || secondSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    levelValues['level2'] = secondSponsor?.id
    levelValues['level3'] = null
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    return levelValues
}
levelValues['level2'] = secondSponsor?.id
const userAccountOfSecondSponsor = await user.findOne({where:{id:secondSponsor?.owner_id}})
const thirdSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfSecondSponsor?.sponsor}})
if(!thirdSponsor){
    levelValues['level3'] = null
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    return levelValues
}
if(thirdSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || thirdSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || thirdSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    levelValues['level3'] = thirdSponsor?.id
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    return levelValues
}
levelValues['level3'] = thirdSponsor?.id
const userAccountOfThirdSponsor = await user.findOne({where:{id:thirdSponsor?.owner_id}})
const fourthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfThirdSponsor?.sponsor}})
if(!fourthSponsor){
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    return levelValues
}
if(fourthSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || fourthSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || fourthSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    levelValues['level4'] = fourthSponsor?.id
    levelValues['level5'] = null
    levelValues['level6'] = null
    return levelValues
}
levelValues['level4'] = fourthSponsor?.id
const userAccountOfFourthSponsor = await user.findOne({where:{id:fourthSponsor?.owner_id}})
const fifthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfFourthSponsor?.sponsor}})
if(!fifthSponsor){
    levelValues['level5'] = null
    levelValues['level6'] = null
    return levelValues
}
if(fifthSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || fifthSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || fifthSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    levelValues['level5'] = fifthSponsor?.id
    levelValues['level6'] = null
    return levelValues
}
levelValues['level5'] = fifthSponsor?.id
const userAccountOfFifthSponsor = await user.findOne({where:{id:fifthSponsor?.owner_id}})
const sixthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfFifthSponsor?.sponsor}})
if(!sixthSponsor){
    levelValues['level6'] = null
    return levelValues
}
levelValues['level6'] = sixthSponsor?.id
return levelValues



  
  }
