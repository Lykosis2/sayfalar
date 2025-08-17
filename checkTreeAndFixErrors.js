import flagedBehaviorForAll from "./flagedBehaviorForAll"
import locker from "./providers/locker"

export default async function checkTreeAndFixErrors(thisInvitation,user,sponsors,invitation,SaleAccount,allSponsors){
    //After the sponsors check now we know sponsors are correct 
    // now we can check the tree according to the sponsors 
    const wantedAccount = await invitation.findOne({where:{id:thisInvitation.id}})

    const level1 = allSponsors.filter(sponsor=>sponsor.level1 === wantedAccount.sale_account_id)

    const level1_ownerIds = level1.map(sponsor=>sponsor.owner_id)

    const level2 = allSponsors.filter(sponsor=>sponsor.level2 === wantedAccount.sale_account_id)

    const level2_ownerIds = level2.map(sponsor=>sponsor.owner_id)

    const level3 = allSponsors.filter(sponsor=>sponsor.level3 === wantedAccount.sale_account_id)

    const level3_ownerIds = level3.map(sponsor=>sponsor.owner_id)

    const level4 = allSponsors.filter(sponsor=>sponsor.level4 === wantedAccount.sale_account_id)

    const level4_ownerIds = level4.map(sponsor=>sponsor.owner_id)

    const level5 = allSponsors.filter(sponsor=>sponsor.level5 === wantedAccount.sale_account_id)

    const level5_ownerIds = level5.map(sponsor=>sponsor.owner_id)

    const level6 = allSponsors.filter(sponsor=>sponsor.level6 === wantedAccount.sale_account_id)

    const level6_ownerIds = level6.map(sponsor=>sponsor.owner_id)


    const checkIfSameAmmount = Object.keys(wantedAccount.self_tree_positions)-1 === level1_ownerIds.length + level2_ownerIds.length + level3_ownerIds.length + level4_ownerIds.length + level5_ownerIds.length + level6_ownerIds.length 
    console.log(checkIfSameAmmount);

    const SaleAccountOfThisInvitation = await SaleAccount.findOne({where:{id:wantedAccount.sale_account_id}})
    
    console.log(wantedAccount.self_tree_positions);
    console.log(SaleAccountOfThisInvitation.owner_id);
    console.log(wantedAccount.self_tree_positions[SaleAccountOfThisInvitation.owner_id]);
    if(!wantedAccount.self_tree_positions[SaleAccountOfThisInvitation.owner_id]){
        invitation.findOne({where:{id:thisInvitation.id}}).then(
            async res=>{
                res.self_tree_positions[SaleAccountOfThisInvitation.owner_id] = {
                    level:1,
                    title:SaleAccountOfThisInvitation.title,
                    point1:0,
                    balance:0,
                    position:0,
                    changeable:false,
                    saleAccount_id:SaleAccountOfThisInvitation.id,
                    has_saleAccount:true,
                }
                res.changed('self_tree_positions', true)
                await locker.lockAndWait(`invitation-${res.sale_account_id}`, 60 * 1000)
                console.log(`user updated ${res.sale_account_id}`)
                await res.save().then(async(res)=>{
                    console.log("res",res);
                    console.log(res.self_tree_positions[SaleAccountOfThisInvitation.owner_id])

                    
                }).catch(err=>console.log(err))
                await locker.unlock(`invitation-${res.sale_account_id}`)
            }
            ).catch(err=>console.log(err))
    }
        


        //there is a non added or non needed user in the tree 
        const addOnes = [...level1_ownerIds,...level2_ownerIds,...level3_ownerIds,...level4_ownerIds,...level5_ownerIds,...level6_ownerIds].filter(user=>!Object.keys(wantedAccount.self_tree_positions).includes(user))

        console.log(addOnes);

        let  deleteOnes = Object.keys(wantedAccount.self_tree_positions).filter(user=>![...level1_ownerIds,...level2_ownerIds,...level3_ownerIds,...level4_ownerIds,...level5_ownerIds,...level6_ownerIds].includes(user))

        deleteOnes = deleteOnes.filter((user)=>user !== SaleAccountOfThisInvitation.owner_id)
        console.log(deleteOnes);
        
        let flag = false
        if(addOnes.length > 0){
            flag = true
            await Promise.all(
            addOnes.map( async user=>{
                //find sponsor of this user 
                //find saleAccount of this user 
                const levelofSponsor = await sponsors.findOne({where:{owner_id:user}})
                const usersSaleAccount = await SaleAccount.findOne({where:{owner_id:user}})
                wantedAccount.unassigned_tree_positions[user] = {
                    level:levelofSponsor.level1 === user ? 1 : levelofSponsor.level2 === user ? 2 : levelofSponsor.level3 === user ? 3 : levelofSponsor.level4 === user ? 4 : levelofSponsor.level5 === user ? 5 : levelofSponsor.level6 === user ? 6 : 6,
                    title:usersSaleAccount ? usersSaleAccount.title : 0,
                    point1:0,
                    balance:0,
                    position:null,
                    changeable:false,
                    saleAccount_id:usersSaleAccount ? usersSaleAccount.id : null,
                    has_saleAccount:usersSaleAccount ? true : false,
                }


            })
        )
        wantedAccount.changed('unassigned_tree_positions', true)
        await locker.lockAndWait(`invitation-${wantedAccount.sale_account_id}`, 60 * 1000)
        console.log(`user updated ${thisInvitation.sale_account_id}`)
        await wantedAccount.save()
        await locker.unlock(`invitation-${wantedAccount.sale_account_id}`)
        }
        if(deleteOnes.length > 0){
            flag = true
            await Promise.all(
                deleteOnes.map( async user=>{
                    delete wantedAccount.self_tree_positions[user]
                })
            )
            wantedAccount.changed('self_tree_positions', true)
            await locker.lockAndWait(`invitation-${wantedAccount.sale_account_id}`, 60 * 1000)
            console.log(`user updated ${thisInvitation.sale_account_id}`)
            await wantedAccount.save()
            await locker.unlock(`invitation-${wantedAccount.sale_account_id}`)
        }

        console.log(flag);
        if(flag) await flagedBehaviorForAll()


    let treeChanged = false
    const updated = await invitation.findOne({where:{id:thisInvitation.id}})
    Object.keys(updated.self_tree_positions).map(async (user)=>{
        if(level1_ownerIds.includes(user)){
            if(updated.self_tree_positions[user].level !== 1){
                updated.self_tree_positions[user].level = 1
                treeChanged = true
            }
        }
        else if(level2_ownerIds.includes(user)){
            if(updated.self_tree_positions[user].level !== 2){
                updated.self_tree_positions[user].level = 2
                treeChanged = true
            }
        }
        else if(level3_ownerIds.includes(user)){
            if(updated.self_tree_positions[user].level !== 3){
                updated.self_tree_positions[user].level = 3
                treeChanged = true
            }
        }
        else if(level4_ownerIds.includes(user)){
            if(updated.self_tree_positions[user].level !== 4){
                updated.self_tree_positions[user].level = 4
                treeChanged = true
            }
        }
        else if(level5_ownerIds.includes(user)){
            if(updated.self_tree_positions[user].level !== 5){
                updated.self_tree_positions[user].level = 5
                treeChanged = true
            }
        }
        else if(level6_ownerIds.includes(user)){
            if(updated.self_tree_positions[user].level !== 6){
                updated.self_tree_positions[user].level = 6
                treeChanged = true
            }
        }

        console.log(treeChanged);
        if(treeChanged){
            updated.changed('self_tree_positions', true)
            await locker.lockAndWait(`invitation-${updated.sale_account_id}`, 60 * 1000)
            console.log(`user updated ${thisInvitation.sale_account_id}`)
            await updated.save()
            await locker.unlock(`invitation-${updated.sale_account_id}`)
        }

    })
 
    console.log(`tree checked and fixed for ${thisInvitation.sale_account_id}`)
    return 

}