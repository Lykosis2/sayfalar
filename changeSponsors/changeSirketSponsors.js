import checkAndFixIfProblemInTree from "../errorHandle/CheckTree/checkAndFixIfProblemInTree";
import checkAndSolveProblems from "../errorHandle/CheckTree/checkAndSolveProblems";
import noSponsors from "../errorHandle/CheckTree/noSponsors";
import importantPanic from "../errorHandle/importantPanic";
import changePositionAccordiglyAndAdd from "./changePositionAccordiglyAndAdd";
import locker from '@/lib/providers/locker'

export default async function changeSirketSponsors(invitation,userId,sponsors,changeSponsorId,usersAccount,saleAccount){

  // optionally that can be done with any sponsorId 


  // change placeste bug var onu coz 
  // üye silmeyi test et  
  try{

    const basicJson = {
      "72729454":"c0470e22-3f7d-4fd4-8b53-bfc6641c15ac",
      "86180486":"6456d13d-2ba0-4eff-b520-dfd2718b31d4",
      "89960994":"c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"
    }
    const realSponsors = await sponsors.findOne({where:{owner_id:userId}}).catch(async err => await importantPanic(err))
  
    if(!realSponsors){
      await noSponsors(userId,sponsors,saleAccount)
    }
      // Change the sponsor from the table   
      if(changeSponsorId &&  (changeSponsorId === '72729454' || changeSponsorId === '86180486' || changeSponsorId === '89960994')) {
          realSponsors.level1 = basicJson[changeSponsorId] // sponsor changed 
          const companyAccountTree = await invitation.findOne({where:{sale_account_id:basicJson[changeSponsorId]}}).catch(async err => await importantPanic(err))
          const mainTree = await invitation.findOne({where:{sale_account_id:"2582a601-956b-4076-a6b3-bd40e11df286"}}).catch(async err => await importantPanic(err))
          const userInSelfTree = !!mainTree.self_tree_positions[userId]
          const userInUnassignedTree = !!mainTree.unassigned_tree_positions[userId]
  
          if(!userInSelfTree && !userInUnassignedTree){
            await checkAndSolveProblems(userId)
          }
  
          // TODO MAKE A LOGIC SO IF BOTH TRUE RETURN FALSE
          if(userInSelfTree){
            const userAsTree = mainTree.self_tree_positions[userId]
            delete mainTree.self_tree_positions[userId]
            await changePositionAccordiglyAndAdd(companyAccountTree,userAsTree,userId)
            companyAccountTree.invitation_level1 = {...companyAccountTree.invitation_level1,...{[userId]:"Beginner"}}
            delete mainTree.invitation_level1[userId]
            mainTree.changed("invitation_level1",true)
            mainTree.changed("self_tree_positions",true)
            companyAccountTree.changed("unassigned_tree_positions",true)

            //await locker.lockAndWait(`invitation-${mainTree.sale_account_id}`)
            await mainTree.save().catch(async err=>await importantPanic(err))
            //await locker.unlock(`invitation-${mainTree.sale_account_id}`)
            await locker.flag(mainTree.sale_account_id)

            //await locker.lockAndWait(`invitation-${companyAccountTree.sale_account_id}`)
            await companyAccountTree.save().catch(async err=>await importantPanic(err))
            //await locker.unlock(`invitation-${companyAccountTree.sale_account_id}`)
            await locker.flag(companyAccountTree.sale_account_id)

            //await locker.lockAndWait(`sponsors-${realSponsors.owner_id}`)
            await realSponsors.save().catch(async err=>await importantPanic(err))
            //await locker.unlock(`sponsors-${realSponsors.owner_id}`)

          }
          else if (userInUnassignedTree){
            const userAsTree = mainTree.unassigned_tree_positions[userId]
            delete mainTree.unassigned_tree_positions[userId]
            await changePositionAccordiglyAndAdd(companyAccountTree,userAsTree,userId)
            companyAccountTree.invitation_level1 = {...companyAccountTree.invitation_level1,...{[userId]:"Beginner"}}
            delete mainTree.invitation_level1[userId]
            mainTree.changed("invitation_level1",true)
            mainTree.changed("unassigned_tree_positions",true)
            companyAccountTree.changed("unassigned_tree_positions",true)

            //await locker.lockAndWait(`invitation-${mainTree.sale_account_id}`)
            await mainTree.save().catch(async err=>await importantPanic(err))
            //await locker.unlock(`invitation-${mainTree.sale_account_id}`)
            await locker.flag(mainTree.sale_account_id)

            //await locker.lockAndWait(`invitation-${companyAccountTree.sale_account_id}`)
            await companyAccountTree.save().catch(async err=>await importantPanic(err))
            //await locker.unlock(`invitation-${companyAccountTree.sale_account_id}`)
            await locker.flag(companyAccountTree.sale_account_id)

            //await locker.lockAndWait(`sponsors-${realSponsors.owner_id}`)
            await realSponsors.save().catch(async err=>await importantPanic(err))
            //await locker.unlock(`sponsors-${realSponsors.owner_id}`)
  
          }
      }
  }
  catch(err){
    await checkAndFixIfProblemInTree(userId)
    await importantPanic(err)
  }
    
    
    // Take it from the table of the sirket hesabı table and put it one of the componies account 
    



}

