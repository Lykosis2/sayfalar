
import User from "../../models/user";
import importantPanic from "./importantPanic";

const user = User();
// That means there is a problem in sponsors as well 

export default async function createNonExistingSponsorsAndCheckSponsors(SaleAccount,sponsors,invitation,id) {
    const foundUser = await user.findOne({ where: { id: id } }).catch(async err => {
        console.log(err);
        await importantPanic(err, "createNonExistingSponsorsForSaleAccount")
        return false
    })
    if (!foundUser) {
        await importantPanic(err, "createNonExistingSponsorsForSaleAccount")
        return false    
    }
    const usersSponsor = await SaleAccount.findOne({where:{referenceNumber:foundUser.sponsor}})
    if(!usersSponsor){
        foundUser.sponsor = 80562
        await foundUser.save()
        await sponsors.create({owner_id:id,level1:"2582a601-956b-4076-a6b3-bd40e11df286",level2:null,level3:null,level4:null,level5:null,level6:null}).catch(async err => {
            console.log(err);
            await importantPanic(err, "createNonExistingSponsorsForSaleAccount")
            return false
        }
        )
        return
    }
    // Make sure 6 sponsors and self true and check all of their trees and if there is a problem fix it
    else {


      const levelValues = await determineLevels(foundUser.sponsor, SaleAccount, sponsors)


      // First look at none null sponsors and all of the tree of the sponsors are there make sure then continue 








      
        // look at all sponsors tables and if the given user is not there add it 
        const firstSponsorsTree = await invitation.findOne({where:{sale_account_id:levelValues.level1}})
        if(!firstSponsorsTree){
            await importantPanic("firstSponsorsTree is not found")
            return
        }
        const inFirstSponsorsTree = Object.keys(firstSponsorsTree.self_tree_positions).includes(id) || Object.keys(firstSponsorsTree.unassigned_tree_positions).includes(id) 
        if(!inFirstSponsorsTree){
          firstSponsorsTree.registered_user += 1
          const level1 = await invitation.findOne({ where: { sale_account_id: firstSponsorsTree.id } })
          await locker.lockAndWait(`invitation-${level1.id}`, 30 * 1000)
          level1.invitation_level1 = { ...level1.invitation_level1, [owner_id]: 'Beginner' } // TODO : Revise this part if this part is necessary
          level1.unassigned_tree_positions = { ...level1.unassigned_tree_positions, [owner_id]: { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
          returnVal.level1 = { sponsor: level1.id, owner_id, title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
          await level1.save()
          await firstSponsorsTree.save()
          locker.unlock(`saleAccount-${levelValues.level1}`)
          locker.unlock(`invitation-${level1.id}`)
        }
        if(levelValues.level2 !== null){
            const secondSponsorsTree = await invitation.findOne({where:{sale_account_id:levelValues.level2}})
            if(!secondSponsorsTree){
                await importantPanic("secondSponsorsTree is not found")
                return
            }
            const inSecondSponsorsTree = Object.keys(secondSponsorsTree.self_tree_positions).includes(id) || Object.keys(secondSponsorsTree.unassigned_tree_positions).includes(id) 
            if(!inSecondSponsorsTree){
              secondSponsorsTree.registered_user += 1
              const level2 = await invitation.findOne({ where: { sale_account_id: secondSponsorsTree.id } })
              await locker.lockAndWait(`invitation-${level2.id}`, 30 * 1000)
              level2.invitation_level1 = { ...level2.invitation_level1, [owner_id]: 'Beginner' } // TODO : Revise this part if this part is necessary
              level2.unassigned_tree_positions = { ...level2.unassigned_tree_positions, [owner_id]: { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
              returnVal.level2 = { sponsor: level2.id, owner_id, title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
              await level2.save()
              await secondSponsorsTree.save()
              locker.unlock(`saleAccount-${levelValues.level2}`)
              locker.unlock(`invitation-${level2.id}`)
            }
        }
        if(levelValues.level3 !== null){
            const thirdSponsorsTree = await invitation.findOne({where:{sale_account_id:levelValues.level3}})
            if(!thirdSponsorsTree){
                await importantPanic("thirdSponsorsTree is not found")
                return
            }
            const inThirdSponsorsTree = Object.keys(thirdSponsorsTree.self_tree_positions).includes(id) || Object.keys(thirdSponsorsTree.unassigned_tree_positions).includes(id) 
            if(!inThirdSponsorsTree){
              thirdSponsorsTree.registered_user += 1
              const level3 = await invitation.findOne({ where: { sale_account_id: thirdSponsorsTree.id } })
              await locker.lockAndWait(`invitation-${level3.id}`, 30 * 1000)
              level3.invitation_level1 = { ...level3.invitation_level1, [owner_id]: 'Beginner' } // TODO : Revise this part if this part is necessary
              level3.unassigned_tree_positions = { ...level3.unassigned_tree_positions, [owner_id]: { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
              returnVal.level3 = { sponsor: level3.id, owner_id, title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
              await level3.save()
              await thirdSponsorsTree.save()
              locker.unlock(`saleAccount-${levelValues.level3}`)
              locker.unlock(`invitation-${level3.id}`)
            }
        }
        if(levelValues.level4 !== null){
            const fourthSponsorsTree = await invitation.findOne({where:{sale_account_id:levelValues.level4}})
            if(!fourthSponsorsTree){
                await importantPanic("fourthSponsorsTree is not found")
                return
            }
            const inFourthSponsorsTree = Object.keys(fourthSponsorsTree.self_tree_positions).includes(id) || Object.keys(fourthSponsorsTree.unassigned_tree_positions).includes(id) 
            if(!inFourthSponsorsTree){
              fourthSponsorsTree.registered_user += 1
              const level4 = await invitation.findOne({ where: { sale_account_id: fourthSponsorsTree.id } })
              await locker.lockAndWait(`invitation-${level4.id}`, 30 * 1000)
              level4.invitation_level1 = { ...level4.invitation_level1, [owner_id]: 'Beginner' } // TODO : Revise this part if this part is necessary
              level4.unassigned_tree_positions = { ...level4.unassigned_tree_positions, [owner_id]: { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
              returnVal.level4 = { sponsor: level4.id, owner_id, title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
              await level4.save()
              await fourthSponsorsTree.save()
              locker.unlock(`saleAccount-${levelValues.level4}`)
              locker.unlock(`invitation-${level4.id}`)
            }
        }
        if(levelValues.level5 !== null){
            const fifthSponsorsTree = await invitation.findOne({where:{sale_account_id:levelValues.level5}})
            if(!fifthSponsorsTree){
                await importantPanic("fifthSponsorsTree is not found")
                return
            }
            const inFifthSponsorsTree = Object.keys(fifthSponsorsTree.self_tree_positions).includes(id) || Object.keys(fifthSponsorsTree.unassigned_tree_positions).includes(id) 
            if(!inFifthSponsorsTree){
              fifthSponsorsTree.registered_user += 1
              const level5 = await invitation.findOne({ where: { sale_account_id: fifthSponsorsTree.id } })
              await locker.lockAndWait(`invitation-${level5.id}`, 30 * 1000)
              level5.invitation_level1 = { ...level5.invitation_level1, [owner_id]: 'Beginner' } // TODO : Revise this part if this part is necessary
              level5.unassigned_tree_positions = { ...level5.unassigned_tree_positions, [owner_id]: { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
              returnVal.level5 = { sponsor: level5.id, owner_id, title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
              await level5.save()
              await fifthSponsorsTree.save()
              locker.unlock(`saleAccount-${levelValues.level5}`)
              locker.unlock(`invitation-${level5.id}`)
            }
        }
        if(levelValues.level6 !== null){
            const sixthSponsorsTree = await invitation.findOne({where:{sale_account_id:levelValues.level6}})
            if(!sixthSponsorsTree){
                await importantPanic("sixthSponsorsTree is not found")
                return
            }
            const inSixthSponsorsTree = Object.keys(sixthSponsorsTree.self_tree_positions).includes(id) || Object.keys(sixthSponsorsTree.unassigned_tree_positions).includes(id) 
            if(!inSixthSponsorsTree){
              sixthSponsorsTree.registered_user += 1
              const level6 = await invitation.findOne({ where: { sale_account_id: sixthSponsorsTree.id } })
              await locker.lockAndWait(`invitation-${level6.id}`, 30 * 1000)
              level6.invitation_level1 = { ...level6.invitation_level1, [owner_id]: 'Beginner' } // TODO : Revise this part if this part is necessary
              level6.unassigned_tree_positions = { ...level6.unassigned_tree_positions, [owner_id]: { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
              returnVal.level6 = { sponsor: level6.id, owner_id, title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
              await level6.save()
              await sixthSponsorsTree.save()
              locker.unlock(`saleAccount-${levelValues.level6}`)
              locker.unlock(`invitation-${level6.id}`)
            }
        }
        await sponsors.create({owner_id:id,level1:levelValues.level1,level2:levelValues.level2,level3:levelValues.level3,level4:levelValues.level4,level5:levelValues.level5,level6:levelValues.level6}).catch(async err => {
            console.log(err);
            await importantPanic(err, "createNonExistingSponsorsForSaleAccount")
            return false
        }
        )
        return

    }
}

const determineLevels = async function (sponsor, saleAccount, sponsorTable) {
    try{
      const sirketHesabi = 80562
      const sponsorAccount = await saleAccount.findOne({ where: { referenceNumber: sponsor } })
    
      if (!sponsorAccount || sponsorAccount.referenceNumber === sirketHesabi) {
        return {
          level1: '2582a601-956b-4076-a6b3-bd40e11df286',
          level2: null,
          level3: null,
          level4: null,
          level5: null,
          level6: null,
        }
        /* In case of sponsor not existing we return şirket hesabı or the number is sirketHesabi
        */
      }
    
      const returnedObject = {
        level1: sponsorAccount.id ?? '2582a601-956b-4076-a6b3-bd40e11df286',
      }
      // turn
      if (sponsorAccount !== null && sponsorAccount !== undefined && sponsorAccount.owner_id !== null && sponsorAccount.owner_id !== undefined) {
        const sponsorsSponsers = await sponsorTable.findOne({ where: { owner_id: sponsorAccount.owner_id } })
        if (sponsorsSponsers !== null) {
          returnedObject.level2 = sponsorsSponsers.level1 ?? null
          returnedObject.level3 = sponsorsSponsers.level2 ?? null
          returnedObject.level4 = sponsorsSponsers.level3 ?? null
          returnedObject.level5 = sponsorsSponsers.level4 ?? null
          returnedObject.level6 = sponsorsSponsers.level5 ?? null
          return returnedObject
        }
        else {
          return {
            level1: sponsorAccount.id ?? '2582a601-956b-4076-a6b3-bd40e11df286',
            level2: null,
            level3: null,
            level4: null,
            level5: null,
            level6: null,
          }
        }
      }
    
      // After null checked again if error happens in the second null check code falls here
      else {
        return {
          level1: '2582a601-956b-4076-a6b3-bd40e11df286',
          level2: null,
          level3: null,
          level4: null,
          level5: null,
          level6: null,
        }
      }
    }
    catch(err){
      await informTheAdmin(err)
      return {
        level1: '2582a601-956b-4076-a6b3-bd40e11df286',
        level2: null,
        level3: null,
        level4: null,
        level5: null,
        level6: null,
      }
  
    }
  
  }
  