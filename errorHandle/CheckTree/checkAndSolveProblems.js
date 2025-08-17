import User from "../../../models/user"
import saleAccount from "../../../models/saleAccount"
import Sponsors from "../../../models/sponsors"
import Invitation from "../../../models/invitation"
import checkAndFixIfProblemInTree from "./checkAndFixIfProblemInTree"


export default async function checkAndSolveProblems(id) {
    const SaleAccount = saleAccount()
const user = User()
const sponsors = Sponsors()
const invitation = Invitation()
    const userAccount = await user.findOne({where:{id:id}})
    const usersSponsors = await sponsors.findOne({where:{owner_id:id}})
    if(!userAccount){
        await importantPanic('User not found','fixTree')
        return false
    }
    console.log("hello");
    const levelValues = await determineLevels(user,userAccount,SaleAccount,usersSponsors)
    console.log(levelValues);
    await checkAndFixIfProblemInTree(SaleAccount,levelValues,id,invitation,usersSponsors,userAccount,sponsors)
    return true
}

const determineLevels = async function (user,userAccount,saleAccount,usersSponsors) {
    const levelValues = {
        level1:null,
        level2:null,
        level3:null,
        level4:null,
        level5:null,
        level6:null
    }
    const firstSponsor = await saleAccount.findOne({where:{referenceNumber:userAccount?.sponsor}})
    console.log(firstSponsor);
    if(!firstSponsor){
       const userHasSaleAccount = await saleAccount.findOne({where:{owner_id:userAccount.id}})
       if(userHasSaleAccount){
        levelValues['level1'] = "6456d13d-2ba0-4eff-b520-dfd2718b31d4"
        levelValues['level2'] = null
        levelValues['level3'] = null
        levelValues['level4'] = null
        levelValues['level5'] = null
        levelValues['level6'] = null
        const checkedReturnValues = checkLevelValues(levelValues)
        return checkedReturnValues
       }
       else{
        levelValues['level1'] = "2582a601-956b-4076-a6b3-bd40e11df286"
        levelValues['level2'] = null
        levelValues['level3'] = null
        levelValues['level4'] = null
        levelValues['level5'] = null
        levelValues['level6'] = null
        const checkedReturnValues = checkLevelValues(levelValues)
        return checkedReturnValues
       
       }
    }
if(firstSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || firstSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || firstSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a" || 
firstSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286"){
    levelValues['level1'] = firstSponsor?.id 
    levelValues['level2'] = null
    levelValues['level3'] = null
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
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
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
if(secondSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || secondSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || secondSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    // check for duplicates 
    if(secondSponsor.id === levelValues['level1']){
        levelValues['level2'] = null
        levelValues['level3'] = null
        levelValues['level4'] = null
        levelValues['level5'] = null
        levelValues['level6'] = null
        const checkedReturnValues = checkLevelValues(levelValues)
        return checkedReturnValues
    }
    levelValues['level2'] = secondSponsor?.id
    levelValues['level3'] = null
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
levelValues['level2'] = secondSponsor?.id
const userAccountOfSecondSponsor = await user.findOne({where:{id:secondSponsor?.owner_id}})
const thirdSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfSecondSponsor?.sponsor}})
if(!thirdSponsor){
    levelValues['level3'] = null
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
if(thirdSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || thirdSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || thirdSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    levelValues['level3'] = thirdSponsor?.id
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
levelValues['level3'] = thirdSponsor?.id
const userAccountOfThirdSponsor = await user.findOne({where:{id:thirdSponsor?.owner_id}})
const fourthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfThirdSponsor?.sponsor}})
if(!fourthSponsor){
    levelValues['level4'] = null
    levelValues['level5'] = null
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
if(fourthSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || fourthSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || fourthSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    levelValues['level4'] = fourthSponsor?.id
    levelValues['level5'] = null
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
levelValues['level4'] = fourthSponsor?.id
const userAccountOfFourthSponsor = await user.findOne({where:{id:fourthSponsor?.owner_id}})
const fifthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfFourthSponsor?.sponsor}})
if(!fifthSponsor){
    levelValues['level5'] = null
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
if(fifthSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || fifthSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || fifthSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
    levelValues['level5'] = fifthSponsor?.id
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
levelValues['level5'] = fifthSponsor?.id
const userAccountOfFifthSponsor = await user.findOne({where:{id:fifthSponsor?.owner_id}})
const sixthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfFifthSponsor?.sponsor}})
if(!sixthSponsor){
    levelValues['level6'] = null
    const checkedReturnValues = checkLevelValues(levelValues)
    return checkedReturnValues
}
levelValues['level6'] = sixthSponsor?.id
const checkedReturnValues = checkLevelValues(levelValues)
return checkedReturnValues



  
}

function checkLevelValues(levelValues){
    console.log("hereeeee");
    console.log(levelValues);
    const values = Object.values(levelValues)
    const nonNullValues = values.filter((item)=>item !== null)
    const checkedReturnValues = {
        level1:null,
        level2:null,
        level3:null,
        level4:null,
        level5:null,
        level6:null
    }
    for (let i = 0; i < nonNullValues.length; i++) {
        const element = nonNullValues[i];
        const found = nonNullValues.find((item)=>item === element)
        if(found){
            checkedReturnValues[`level${i+1}`] = element
        }
    }
    return checkedReturnValues

}