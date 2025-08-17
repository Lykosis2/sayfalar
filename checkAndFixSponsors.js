import locker from "./providers/locker";

export default async function checkAndFixSponsor(thisUser,user,sponsors,invitation,SaleAccount){
    const usersSponsors = await sponsors.findOne({where:{owner_id:thisUser.id}})
    const usersAccount = await user.findOne({where:{id:thisUser.id}})
    const referenceNumber = usersAccount.sponsor

    const firstLevelSponsor = await SaleAccount.findOne({where:{referenceNumber:referenceNumber}})
    if(!firstLevelSponsor){
        if(!usersSponsors){
            console.log("triggered");
            const userHasASaleAccount = await SaleAccount.findOne({where:{owner_id:thisUser.id}})
            if(userHasASaleAccount){
                console.log("triggered");
                const newSponsor = await sponsors.create({owner_id:thisUser.id,level1:"c0470e22-3f7d-4fd4-8b53-bfc6641c15ac",level2:"",level3:"",level4:"",level5:"",level6:""})
                await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
                await newSponsor.save()
                await locker.unlock(`sponsors-${thisUser.owner_id}`)
                if(thisUser.sponsor !== "72729454"){
                    await locker.lockAndWait(`user-${thisUser.id}`, 60 * 1000)
                    console.log(`updated user id ${thisUser.id}`)
                    await user.update({sponsor:"72729454"},{where:{id:thisUser.id}},{hooks:false})
                    await locker.unlock(`user-${thisUser.id}`)
                }
                console.log(`check done for id ${thisUser.id}`)
                return
            }
            else{
                const newSponsor = await sponsors.create({owner_id:thisUser.id,level1:"2582a601-956b-4076-a6b3-bd40e11df286",level2:"",level3:"",level4:"",level5:"",level6:""})
                await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
                await newSponsor.save()
                await locker.unlock(`sponsors-${thisUser.owner_id}`)
                if(thisUser.sponsor !== "80562"){
                    await locker.lockAndWait(`user-${thisUser.id}`, 60 * 1000)
                    console.log(`updated user id ${thisUser.id}`)
                    await user.update({sponsor:"80562"},{where:{id:thisUser.id}},{hooks:false})
                    await locker.unlock(`user-${thisUser.id}`)
                }
                console.log(`check done for id ${thisUser.id}`)
                return
            }
        }
        usersSponsors.level1 = "2582a601-956b-4076-a6b3-bd40e11df286"
        usersSponsors.level2 =""
        usersSponsors.level3 =""
        usersSponsors.level4 =""
        usersSponsors.level5 =""
        usersSponsors.level6 =""

        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)

        await locker.lockAndWait(`user-${thisUser.id}`, 60 * 1000)
        console.log(`updated user id ${thisUser.id}`)
        await user.update({sponsor:"80562"},{where:{id:thisUser.id}},{hooks:false})
        await locker.unlock(`user-${thisUser.id}`)
        console.log(`check done for id ${thisUser.id}`)
        return 

    }

if(firstLevelSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286" && (usersAccount.id !== "e90f9e65-db89-45d3-8c6e-52b0d7bbaf35" && usersAccount.id!=="b9547d60-b55f-4b94-90b7-9c058789ed68" &&usersAccount.id!=="83ed577d-379f-4597-a943-a5150655b514")){
    const userHasASaleAccount = await SaleAccount.findOne({where:{owner_id:thisUser.id}})
    if(userHasASaleAccount){
        console.log("triggered");
        usersSponsors.level1 = "6456d13d-2ba0-4eff-b520-dfd2718b31d4"
        usersSponsors.level2=""
        usersSponsors.level3=""
        usersSponsors.level4=""
        usersSponsors.level5=""
        usersSponsors.level6=""
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)

        await locker.lockAndWait(`user-${thisUser.id}`, 60 * 1000)
        console.log(`updated user id ${thisUser.id}`)
        await user.update({sponsor:"86180486"},{where:{id:thisUser.id}},{hooks:false})
        await locker.unlock(`user-${thisUser.id}`)

        console.log(`check done for id ${thisUser.id}`)
        return
    }else{
        let changed = false
        if(!!usersSponsors.level2){
            usersSponsors.level2 = ""
            changed = true
        }
        if(!!usersSponsors.level3){
            usersSponsors.level3 = ""
            changed = true
        }
        if(!!usersSponsors.level4){
            usersSponsors.level4 = ""
            changed = true
        }
        if(!!usersSponsors.level5){
            usersSponsors.level5 = ""
            changed = true
        }
        if(!!usersSponsors.level6){
            usersSponsors.level6 = ""
            changed = true
        }
        if(usersAccount.sponsor !== 80562){
            await locker.lockAndWait(`user-${thisUser.id}`, 60 * 1000)
            console.log(`updated user id ${thisUser.id}`)
            await user.update({sponsor:"80562"},{where:{id:thisUser.id}},{hooks:false})
            await locker.unlock(`user-${thisUser.id}`)
        }
        if(usersAccount.has_saleAccount){
            usersAccount.has_saleAccount = false
            await locker.lockAndWait(`user-${thisUser.id}`, 60 * 1000)
            await usersAccount.save()
            await locker.unlock(`user-${thisUser.id}`)
        }
        if(changed){
            console.log("here");
            await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
            await usersSponsors.save()
            await locker.unlock(`sponsors-${thisUser.owner_id}`)
            console.log(`check done for id ${thisUser.id}`)
            return
        }
    }
}
    
    if(usersSponsors.level1 !== firstLevelSponsor.id){
        usersSponsors.level1 = firstLevelSponsor.id
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
    }
    if(firstLevelSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286" || firstLevelSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || firstLevelSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || firstLevelSponsor.id === "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
        console.log(`check done for id ${thisUser.id}`)
        return
    }
    const firstLevelSponsorsUser = await user.findOne({where:{id:firstLevelSponsor.owner_id}})

    const secondLevelSponsor = await SaleAccount.findOne({where:{referenceNumber:firstLevelSponsorsUser.sponsor}})

    if(!secondLevelSponsor){

        //Implement this part 
        console.log("triggered");
        usersSponsors.level2 = "6456d13d-2ba0-4eff-b520-dfd2718b31d4"
        usersSponsors.level3 =""
        usersSponsors.level4 =""
        usersSponsors.level5 =""
        usersSponsors.level6 =""
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
        await locker.lockAndWait(`user-${firstLevelSponsorsUser.id}`, 60 * 1000)
        console.log(`updated user id ${thisUser.id}`)
        await user.update({sponsor:"86180486"},{where:{id:firstLevelSponsorsUser.id}},{hooks:false})
        await locker.unlock(`user-${firstLevelSponsorsUser.id}`)
        console.log(`check done for id ${thisUser.id}`)
        return
    }

    if(usersSponsors.level2 !== secondLevelSponsor.id){
        usersSponsors.level2 = secondLevelSponsor.id
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
    }
    if(secondLevelSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286" || secondLevelSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || secondLevelSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || secondLevelSponsor.id === "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
        console.log(`check done for id ${thisUser.id}`)
        return
    }
    const secondLevelSponsorsUser = await user.findOne({where:{id:secondLevelSponsor.owner_id}})

    const thirdLevelSponsor = await SaleAccount.findOne({where:{referenceNumber:secondLevelSponsorsUser.sponsor}})
    if(!thirdLevelSponsor){
        console.log("triggered");
        usersSponsors.level3 ="c0470e22-3f7d-4fd4-8b53-bfc6641c15ac"
        usersSponsors.level4 =""
        usersSponsors.level5 =""
        usersSponsors.level6 =""
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
        await locker.lockAndWait(`user-${secondLevelSponsorsUser.id}`, 60 * 1000)
        console.log(`updated user id ${thisUser.id}`)
        await user.update({sponsor:"72729454"},{where:{id:secondLevelSponsorsUser.id}},{hooks:false})
        await locker.unlock(`user-${secondLevelSponsorsUser.id}`)
        console.log(`check done for id ${thisUser.id}`)
        return
    }
    if(usersSponsors.level3 !== thirdLevelSponsor.id){
        usersSponsors.level3 = thirdLevelSponsor.id
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
    }
    if(thirdLevelSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286" || thirdLevelSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || thirdLevelSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || thirdLevelSponsor.id === "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
        console.log(`check done for id ${thisUser.id}`)
        return
    }

    const thirdLevelSponsorsUser = await user.findOne({where:{id:thirdLevelSponsor.owner_id}})


    const fourthLevelSponsor = await SaleAccount.findOne({where:{referenceNumber:thirdLevelSponsorsUser.sponsor}})
    if(!fourthLevelSponsor){
        console.log("triggered");
        usersSponsors.level4 ="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"
        usersSponsors.level5 =""
        usersSponsors.level6 =""
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
        await locker.lockAndWait(`user-${thirdLevelSponsorsUser.id}`, 60 * 1000)
        console.log(`updated user id ${thisUser.id}`)
        await user.update({sponsor:"86180486"},{where:{id:thirdLevelSponsorsUser.id}},{hooks:false})
        await locker.unlock(`user-${thirdLevelSponsorsUser.id}`)
        console.log(`check done for id ${thisUser.id}`)
        return
    }
    if(usersSponsors.level4 !== fourthLevelSponsor.id){
        usersSponsors.level4 = fourthLevelSponsor.id
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
    }
    if(fourthLevelSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286" || fourthLevelSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || fourthLevelSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || fourthLevelSponsor.id === "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
        console.log(`check done for id ${thisUser.id}`)
        return
    }
    const fourthLevelSponsorsUser = await user.findOne({where:{id:fourthLevelSponsor.owner_id}})
  

    const fifthLevelSponsor = await SaleAccount.findOne({where:{referenceNumber:fourthLevelSponsorsUser.sponsor}})
    if(!fifthLevelSponsor){
        console.log("triggered");
        usersSponsors.level5 ="c0470e22-3f7d-4fd4-8b53-bfc6641c15ac"
        usersSponsors.level6 =""
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
        await locker.lockAndWait(`user-${fourthLevelSponsorsUser.id}`, 60 * 1000)
        console.log(`updated user id ${thisUser.id}`)
        await user.update({sponsor:"72729454"},{where:{id:fourthLevelSponsorsUser.id}},{hooks:false})
        await locker.unlock(`user-${fourthLevelSponsorsUser.id}`)
        console.log(`check done for id ${thisUser.id}`)
        return
    }


    if(usersSponsors.level5 !== fifthLevelSponsor.id){
        usersSponsors.level5 = fifthLevelSponsor.id
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
    }
    if(fifthLevelSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286" || fifthLevelSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || fifthLevelSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || fifthLevelSponsor.id === "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
        console.log(`check done for id ${thisUser.id}`)
        return
    }

    const fifthLevelSponsorsUser = await user.findOne({where:{id:fifthLevelSponsor.owner_id}})

    const sixthLevelSponsor = await SaleAccount.findOne({where:{referenceNumber:fifthLevelSponsorsUser.sponsor}})

    if(!sixthLevelSponsor){
        console.log("triggered");
        usersSponsors.level6 ="6456d13d-2ba0-4eff-b520-dfd2718b31d4"
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
        await locker.lockAndWait(`user-${fifthLevelSponsorsUser.id}`, 60 * 1000)
        console.log(`updated user id ${thisUser.id}`)
        await user.update({sponsor:"86180486"},{where:{id:fifthLevelSponsorsUser.id}},{hooks:false})
        await locker.unlock(`user-${fifthLevelSponsorsUser.id}`)
        console.log(`check done for id ${thisUser.id}`)
        return
    }
    if(usersSponsors.level6 !== sixthLevelSponsor.id){
        usersSponsors.level6 = sixthLevelSponsor.id
        await locker.lockAndWait(`sponsors-${thisUser.owner_id}`, 60 * 1000)
        await usersSponsors.save()
        await locker.unlock(`sponsors-${thisUser.owner_id}`)
    }

    if(sixthLevelSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286" || sixthLevelSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || sixthLevelSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || sixthLevelSponsor.id === "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
        console.log(`check done for id ${thisUser.id}`)
        return
    }



console.log(`check done for id ${thisUser.id}`)
    return 


}