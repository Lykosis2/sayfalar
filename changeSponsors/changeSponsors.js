import checkAndSolveProblems from "../errorHandle/CheckTree/checkAndSolveProblems";
import noSponsors from "../errorHandle/CheckTree/noSponsors";
import importantPanic from "../errorHandle/importantPanic";
import changePositionAccordiglyAndAdd from "./changePositionAccordiglyAndAdd";
import locker from '@/lib/providers/locker'

export default async function changeSponsors(invitation,userId,sponsors,changeSponsorId,SaleAccount,usersAccount){

  // optionally that can be done with any sponsorId 


  // change placeste bug var onu coz 
  // üye silmeyi test et
  
  try{
    locker.flag("2582a601-956b-4076-a6b3-bd40e11df286")
    const realSponsors = await sponsors.findOne({where:{owner_id:userId}})
    console.log("LOS POYOS HERMANOS V2 WTF IS TRIGGERING THIS ")
    console.log(realSponsors);
    if(!realSponsors){
      await noSponsors(userId,sponsors,SaleAccount)
    }
      // Change the sponsor from the table   
      const addLevels = {
        level1:"",
        level2:"",
        level3:"",
        level4:"",
        level5:"",
        level6:"",
      }
   
          const usersSponsor = await SaleAccount.findOne({where:{referenceNumber:changeSponsorId}})
          console.log(usersSponsor);
          const sponsor = await sponsors.findOne({where:{owner_id:userId}})
          console.log(sponsor);
          const sponsorsSponsors = await sponsors.findOne({where:{owner_id:usersSponsor.owner_id}})
          sponsor.level1 = usersSponsor.id
          addLevels.level1 = usersSponsor.id
          const checkedLevel2 = !sponsorsSponsors.level1 || sponsorsSponsors.level1 === "2582a601-956b-4076-a6b3-bd40e11df286" ? "": sponsorsSponsors.level1
          sponsor.level2 = checkedLevel2
          addLevels.level2 = checkedLevel2
          const checkedLevel3 = !sponsorsSponsors.level2 || sponsorsSponsors.level2 === "2582a601-956b-4076-a6b3-bd40e11df286" ? "": sponsorsSponsors.level2
          sponsor.level3 = checkedLevel3
          addLevels.level3 = checkedLevel3
          const checkedLevel4 = !sponsorsSponsors.level3 || sponsorsSponsors.level3 === "2582a601-956b-4076-a6b3-bd40e11df286" ? "": sponsorsSponsors.level3
          sponsor.level4 = checkedLevel4
          addLevels.level4 = checkedLevel4
          const checkedLevel5 = !sponsorsSponsors.level4 || sponsorsSponsors.level4 === "2582a601-956b-4076-a6b3-bd40e11df286" ? "": sponsorsSponsors.level4
          sponsor.level5 = checkedLevel5
          addLevels.level5 = checkedLevel5
          const checkedLevel6 = !sponsorsSponsors.level5 || sponsorsSponsors.level5 === "2582a601-956b-4076-a6b3-bd40e11df286" ? "": sponsorsSponsors.level5
          sponsor.level6 = checkedLevel6
          addLevels.level6 = checkedLevel6
          await locker.lockAndWait(`sponsors-${sponsor.owner_id}`, 60 * 1000)
          await sponsor.save().catch(async err=>importantPanic(err))
          await locker.unlock(`sponsors-${sponsor.owner_id}`)
          const sirketsInvitationTable = await invitation.findOne({where:{sale_account_id:"2582a601-956b-4076-a6b3-bd40e11df286"}}).catch(async err=>importantPanic(err))
          const userInSelfTree = !!sirketsInvitationTable.self_tree_positions[userId]
          const userInUnassignedTree = !!sirketsInvitationTable.unassigned_tree_positions[userId]
          if(!userInSelfTree && !userInUnassignedTree){
            await checkAndSolveProblems(userId)
          }
          console.log(addLevels);


          // TODO PROBLEM 
          if(userInSelfTree){
            delete sirketsInvitationTable.self_tree_positions[userId] 
            delete sirketsInvitationTable.invitation_level1[userId]
            sirketsInvitationTable.changed("invitation_level1",true)
            sirketsInvitationTable.changed("self_tree_positions",true)

            await locker.lockAndWait(`invitation-${sirketsInvitationTable.sale_account_id}`, 60 * 1000)
            await sirketsInvitationTable.save().catch(async err=>importantPanic(err))
            await locker.unlock(`invitation-${sirketsInvitationTable.sale_account_id}`)
          }
          else if (userInUnassignedTree){
            delete sirketsInvitationTable.unassigned_tree_positions[userId] 
            delete sirketsInvitationTable.invitation_level1[userId]
            sirketsInvitationTable.changed("invitation_level1",true)
            sirketsInvitationTable.changed("unassigned_tree_positions",true)

            await locker.lockAndWait(`invitation-${sirketsInvitationTable.sale_account_id}`, 60 * 1000)
            await sirketsInvitationTable.save().catch(async err=>importantPanic(err))
            await locker.unlock(`invitation-${sirketsInvitationTable.sale_account_id}`)  
          }

          console.log("here");

          // Do the addition here 
          await Promise.all(

            Object.keys(addLevels).map(async level=>{
              if(addLevels[level] === "") return
              const wantedSponsorsAccount = await invitation.findOne({where:{sale_account_id:addLevels[level]}}).catch(async err=>importantPanic(err))

              wantedSponsorsAccount[`invitation_${level}`]= {...wantedSponsorsAccount[`invitation_${level}`],...{[userId]:"Beginner"}}
              wantedSponsorsAccount.changed(`invitation_${level}`,true)

              wantedSponsorsAccount.unassigned_tree_positions = {...wantedSponsorsAccount.unassigned_tree_positions,...{[userId]:{point1:0,balance:0,position:null,changeable:true,saleAccount_id:null,has_saleAccount:false}}}
              wantedSponsorsAccount.changed("unassigned_tree_positions",true)
              
              await locker.lockAndWait(`invitation-${wantedSponsorsAccount.sale_account_id}`, 60 * 1000)
              await wantedSponsorsAccount.save().catch(async err=>importantPanic(err))
              await locker.unlock(`invitation-${wantedSponsorsAccount.sale_account_id}`)
              await locker.flag(wantedSponsorsAccount.sale_account_id)
            })
          )

          console.log("here");




      
  }
  catch(err){
    console.log(err);
    console.log("here");
    await checkAndSolveProblems(userId)
    await importantPanic(err)
  }
  



}

