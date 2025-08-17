import User from "../../../models/user";
import importantPanic from "../importantPanic";
import informTheAdmin from "../informTheAdmin";
export default async function checkAndFixIfProblemInTree(saleAccount, levelValues, owner_id, invitation,usersSponsors,usersAccount,sponsors) {
    const user = User()
    try{
        console.log("hello");
        if(owner_id === "41b301d8-f328-4464-a5c9-13f822c37505" || owner_id === "e90f9e65-db89-45d3-8c6e-52b0d7bbaf35" || owner_id === "b9547d60-b55f-4b94-90b7-9c058789ed68" || owner_id === "83ed577d-379f-4597-a943-a5150655b514") return true
        console.log("hello");
        console.log(levelValues)
        console.log(usersSponsors);


        // Tested and working

        if(usersSponsors.level1 === '2582a601-956b-4076-a6b3-bd40e11df286'){
            if(usersSponsors.level2 === null && usersSponsors.level3 === null && usersSponsors.level4 === null && usersSponsors.level5 === null && usersSponsors.level6 === null){
                console.log("hello");
                const mainTree = await invitation.findOne({where:{sale_account_id:'2582a601-956b-4076-a6b3-bd40e11df286'}}).catch(err=>{
                    console.log("hello");
                    importantPanic("Main tree cant found")
                    return false
                })
                console.log("hi");
                console.log(mainTree)
                if(!mainTree) {importantPanic("level1 is 2582a601-956b-4076-a6b3-bd40e11df286 but mainTree is null");return}
                console.log("hi")
                if(mainTree.self_tree_positions[owner_id]?.level === 1 || mainTree.unassigned_tree_positions[owner_id]?.level === 1){
                    return true
                }
                else{
                    if(Object.keys(mainTree.self_tree_positions).includes(owner_id)){
                        console.log("hello");
                        mainTree.self_tree_positions[owner_id][level] =1 
                        mainTree.changed("self_tree_positions",true)
                        await mainTree.save()  
                    }
                    else if(Object.keys(mainTree.unassigned_tree_positions).includes(owner_id)){
                        console.log("hello");
                        console.log(mainTree.unassigned_tree_positions[owner_id].level);
                        mainTree.unassigned_tree_positions[owner_id].level =1
                        console.log(mainTree.unassigned_tree_positions[owner_id].level);
                        console.log("hi")
                        mainTree.changed("unassigned_tree_positions",true)
                        await mainTree.save()
                    }
                    else{
                        if(usersAccount.has_saleAccount){
                            console.log("hello");
                            const usersSaleAccount = await saleAccount.findOne({where:{owner_id:owner_id}})
                            if(!usersSaleAccount) {
                                console.log("hello");
                                usersAccount.has_saleAccount = false
                                console.log("LOS POYOS HERMANOS2");
                                await usersAccount.save()
                                // Musteri ekle
                                mainTree.unassigned_tree_positions[owner_id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                                mainTree.changed("unassigned_tree_positions",true)
                                await mainTree.save()
                            }
                            else{
                                console.log("hello");
                                mainTree.unassigned_tree_positions[owner_id] = { title: 0, level: 1, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0 
                                }
                                mainTree.changed("unassigned_tree_positions",true)
                                await mainTree.save()
                            }
                        }
                        else{
                            console.log("hello");
                            mainTree.unassigned_tree_positions[owner_id] ={ title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                            mainTree.changed("unassigned_tree_positions",true)
                            await mainTree.save()
                        }

                    }
                }
           
            }
            else {
                console.log("hello");
                if(usersSponsors.level2 !== null){
                    const nonnullperson = await invitation.findOne({where:{sale_account_id:usersSponsors.level2}}).catch(err=>{
                        importantPanic("level2 is not null but it should be null")
                        return false
                    })
                    if(!nonnullperson) {
                        console.log("hello");
                        await informTheAdmin("level2 is not null but it should be null in" + owner_id)
                        usersSponsors.level2 =null
                        await usersSponsors.save()
                        return "level2 is not null but it should be null"
                    }
                    else {if(Object.keys(nonnullperson.self_tree_positions).includes(owner_id)){
                        console.log("hello");
                        delete nonnullperson.self_tree_positions[owner_id]
                        nonnullperson.changed("self_tree_positions",true)
                        await nonnullperson.save()  
                    }
                    else if(Object.keys(nonnullperson.unassigned_tree_positions).includes(owner_id)){
                        console.log("hello");
                        delete nonnullperson.unassigned_tree_positions[owner_id]
                        nonnullperson.changed("unassigned_tree_positions",true)
                        await nonnullperson.save()
                    }
                    if(Object.keys(nonnullperson.invitation_level2).includes(owner_id)){
                        console.log("hello");
                        delete nonnullperson.invitation_level2[owner_id]
                        nonnullperson.changed("invitation_level2",true)
                        await nonnullperson.save()
                    }}
                    usersSponsors.level2 =null
                    await usersSponsors.save()
    
                }
                if(usersSponsors.level3 !== null){
                    console.log("hello");
                    const nonnullperson = await invitation.findOne({where:{sale_account_id:usersSponsors.level3}}).catch(err=>{
                        importantPanic("level3 is not null but it should be null")
                        return false
                    })

                    if(!nonnullperson) {
                        await informTheAdmin("level3 sponsor error")
                        usersSponsors.level3 = null
                        await usersSponsors.save()
                    }
    
                    else {if(Object.keys(nonnullperson.self_tree_positions).includes(owner_id)){
                        console.log("hello");
                        delete nonnullperson.self_tree_positions[owner_id]
                        nonnullperson.changed("self_tree_positions",true)
                        await nonnullperson.save()  
                    }
                    else if(Object.keys(nonnullperson.unassigned_tree_positions).includes(owner_id)){
                        console.log("hello");
                        delete nonnullperson.unassigned_tree_positions[owner_id]
                        nonnullperson.changed("unassigned_tree_positions",true)
                        await nonnullperson.save()
                    }
                    if(Object.keys(nonnullperson.invitation_level3).includes(owner_id)){
                        console.log("hello");
                        delete nonnullperson.invitation_level3[owner_id]
                        nonnullperson.changed("invitation_level3",true)
                        await nonnullperson.save()
                    }
    }
                    usersSponsors.level3 =null
                    await usersSponsors.save()
                    
    

                    
                }
                if(usersSponsors.level4 !== null){
                    const nonnullperson = await invitation.findOne({where:{sale_account_id:usersSponsors.level4}}).catch(err=>{
                        importantPanic("level4 is not null but it should be null")
                        return false
                    })
                    if(!nonnullperson) {
                        await informTheAdmin("level4 is not null but it should be null in" + owner_id)
                        usersSponsors.level4 =null
                        await usersSponsors.save()
                        
                    }
    
                    else{if(Object.keys(nonnullperson.self_tree_positions).includes(owner_id)){
                        delete nonnullperson.self_tree_positions[owner_id]
                        nonnullperson.changed("self_tree_positions",true)
                        await nonnullperson.save()  
                    }
                    else if(Object.keys(nonnullperson.unassigned_tree_positions).includes(owner_id)){
                        delete nonnullperson.unassigned_tree_positions[owner_id]
                        nonnullperson.changed("unassigned_tree_positions",true)
                        await nonnullperson.save()
                    }
                    if(Object.keys(nonnullperson.invitation_level4).includes(owner_id)){
                        delete nonnullperson.invitation_level4[owner_id]
                        nonnullperson.changed("invitation_level4",true)
                        await nonnullperson.save()
                    }
                }
                    usersSponsors.level4 =null
                    await usersSponsors.save()
                  
    
    
                }
                if(usersSponsors.level5 !== null){
                    const nonnullperson = await invitation.findOne({where:{sale_account_id:usersSponsors.level5}}).catch(err=>{
                        importantPanic("level5 is not null but it should be null")
                        return false
                    })
                    if(!nonnullperson) {
                        console.log("hello")
                        await informTheAdmin("level5 is not null but it should be null in" + owner_id)
                        usersSponsors.level5 =null
                        await usersSponsors.save()
                    }
                    else{
                    if(Object.keys(nonnullperson.self_tree_positions).includes(owner_id)){
                        delete nonnullperson.self_tree_positions[owner_id]
                        nonnullperson.changed("self_tree_positions",true)
                        await nonnullperson.save()  
                    }
                    else if(Object.keys(nonnullperson.unassigned_tree_positions).includes(owner_id)){
                        delete nonnullperson.unassigned_tree_positions[owner_id]
                        nonnullperson.changed("unassigned_tree_positions",true)
                        await nonnullperson.save()
                    }
                    if(Object.keys(nonnullperson.invitation_level5).includes(owner_id)){
                        console.log("hello");
                        delete nonnullperson.invitation_level5[owner_id]
                        nonnullperson.changed("invitation_level5",true)
                        await nonnullperson.save()
                    }

                }
                    usersSponsors.level5 =null
                    await usersSponsors.save()
                    console.log("hello");
                }
                if(usersSponsors.level6 !== null){
                    const nonnullperson = await invitation.findOne({where:{sale_account_id:usersSponsors.level6}}).catch(err=>{
                        console.log("triggered2")
                                                console.log("triggered2")
;importantPanic("level6 is not null but it should be null")
                        return false
                    })
                    if(!nonnullperson) {
                        console.log("hello")
                        await informTheAdmin("level6 is not null but it should be null in" + owner_id)
                        usersSponsors.level6 =null
                        await usersSponsors.save()
                      
                        return "level6 is not null but it should be null"
                    }
                    else{

                        if(Object.keys(nonnullperson.self_tree_positions).includes(owner_id)){
                            delete nonnullperson.self_tree_positions[owner_id]
                            nonnullperson.changed("self_tree_positions",true)
                            await nonnullperson.save()  
                        }
                        else if(Object.keys(nonnullperson.unassigned_tree_positions).includes(owner_id)){
                            delete nonnullperson.unassigned_tree_positions[owner_id]
                            nonnullperson.changed("unassigned_tree_positions",true)
                            await nonnullperson.save()
                        }
                        if(Object.keys(nonnullperson.invitation_level6).includes(owner_id)){
                            delete nonnullperson.invitation_level6[owner_id]
                            nonnullperson.changed("invitation_level6",true)
                            await nonnullperson.save()
                        }
                    }
    
                    usersSponsors.level6 =null
                    await usersSponsors.save()
                  
    
    
                }
                return
            }
            console.log("changed the sponsors")
            return "changed the sponsors"
        }

        let validLevels = [];
        let isValid = true;
        for (let i = 6; i >= 1; i--) {
            const levelKey = `level${i}`;
            const levelValue = levelValues[levelKey];
          
            if (levelValue !== null) {
              for (let j = i - 1; j >= 1; j--) {
                const lowerLevelKey = `level${j}`;
                const lowerLevelValue = levelValues[lowerLevelKey];
          
                if (lowerLevelValue === null) {
                  isValid = false;
                  break;
                }
              }
              if (isValid) {
                validLevels.unshift(levelValue);
              }
            }
          }
          console.log("hello");
        if(!isValid) {
            console.log("hello");
                                    console.log("triggered2")
;importantPanic("isValid is false")
            return false
        }
        if(validLevels.length <= 0 ) {
            console.log("hello");
                                    console.log("triggered2")
;importantPanic("validLevels.length is 0")
            return false
        }

       



        // Delete duplicates 

        console.log(usersSponsors);
        if(usersSponsors.level6 === usersSponsors.level1 || usersSponsors.level6 === usersSponsors.level2 || usersSponsors.level6 === usersSponsors.level3 || usersSponsors.level6 === usersSponsors.level4 || usersSponsors.level6 === usersSponsors.level5){
            usersSponsors.level6 = null 
            await usersSponsors.save()}

if(usersSponsors.level5 === usersSponsors.level1 || usersSponsors.level5 === usersSponsors.level2 || usersSponsors.level5 === usersSponsors.level3 || usersSponsors.level5 === usersSponsors.level4){
            usersSponsors.level5 = null 
            await usersSponsors.save()
        }

if(usersSponsors.level4 === usersSponsors.level1 || usersSponsors.level4 === usersSponsors.level2 || usersSponsors.level4 === usersSponsors.level3){
            usersSponsors.level4 = null 
            await usersSponsors.save()
        }

if(usersSponsors.level3 === usersSponsors.level1 || usersSponsors.level3 === usersSponsors.level2){
            usersSponsors.level3 = null 
            await usersSponsors.save()
        }

if(usersSponsors.level2 === usersSponsors.level1){
            usersSponsors.level2 = null 
            await usersSponsors.save()
        }



       // Delete unwanted sirket hesabi 
       
       
       if(usersSponsors.level2 === "2582a601-956b-4076-a6b3-bd40e11df286"){
        usersSponsors.level2 = null
        await usersSponsors.save()
       }
       if(usersSponsors.level3 === "2582a601-956b-4076-a6b3-bd40e11df286"){
        usersSponsors.level3 = null
        await usersSponsors.save()
       }
       if(usersSponsors.level4 === "2582a601-956b-4076-a6b3-bd40e11df286"){
        usersSponsors.level4 = null
        await usersSponsors.save()
       }
       if(usersSponsors.level5 === "2582a601-956b-4076-a6b3-bd40e11df286"){
        usersSponsors.level5 = null
        await usersSponsors.save()
       }
       if(usersSponsors.level6 === "2582a601-956b-4076-a6b3-bd40e11df286"){
        usersSponsors.level6 = null
        await usersSponsors.save()
       }

        // for this part make it so check them all from referenceNumber as well         
        const valueTable = {}
        console.log("ola muchacos")
        await Promise.all(
            validLevels.map(async(level,index)=>{
                valueTable[`level${index+1}`] = {}
                const usersInvit = await invitation.findOne({where:{sale_account_id:level}})
                const usersSaleAccount = await saleAccount.findOne({where:{id:level}})
                const usersAccount = await user.findOne({where:{id:usersSaleAccount.owner_id}})
                const usersSponsors = await sponsors.findOne({where:{owner_id:usersAccount.id}})
                valueTable[`level${index+1}`].usersInvit = usersInvit
                valueTable[`level${index+1}`].usersSaleAccount = usersSaleAccount
                valueTable[`level${index+1}`].usersAccount = usersAccount
                valueTable[`level${index+1}`].usersSponsors = usersSponsors
            })
        )
        console.log(valueTable)
        if(!valueTable.level1.usersInvit) {                        console.log("triggered2")
;importantPanic("level1.usersInvit is null"); return false}
        if(!valueTable.level1.usersSaleAccount) {                        console.log("triggered2")
;importantPanic("level1.usersSaleAccount is null"); return false}
        if(!valueTable.level1.usersAccount) {                        console.log("triggered2")
;importantPanic("level1.usersAccount is null"); return false}
        if(!valueTable.level1.usersSponsors) {                        console.log("triggered2")
;importantPanic("level1.usersSponsors is null"); return false}
    
        
    
        console.log("hello")
        // level1 
        if(valueTable.level1.usersInvit.self_tree_positions[owner_id]?.level !== 1 ) {
            console.log("hello");

            if(!!valueTable.level1.usersInvit.self_tree_positions[owner_id]){
                console.log("hello")
                valueTable.level1.usersInvit.self_tree_positions[owner_id].level = 1
                valueTable.level1.usersInvit.changed("self_tree_positions",true)
                await valueTable.level1.usersInvit.save()
                console.log("hello")

            } 
        }
        console.log(valueTable.level1.usersInvit.unassigned_tree_positions[owner_id])
    
        if(valueTable.level1.usersInvit.unassigned_tree_positions[owner_id]?.level !== 1) {
            console.log("hello");
            console.log(valueTable.level1.usersInvit.unassigned_tree_positions[owner_id])

            if(!!valueTable.level1.usersInvit.unassigned_tree_positions[owner_id]){
                valueTable.level1.usersInvit.unassigned_tree_positions[owner_id].level = 1
                valueTable.level1.usersInvit.changed("unassigned_tree_positions",true)
                console.log("hello")
                await valueTable.level1.usersInvit.save()
                console.log("hello")

            }
            else{ 
                if(usersAccount.has_saleAccount){
                const usersSaleAccount = await saleAccount.findOne({where:{owner_id:owner_id}})
                if(!usersSaleAccount) {
                    usersAccount.has_saleAccount = false
                    console.log("LOS POYOS HERMANOS13");
                    await usersAccount.save()
                    // Musteri ekle
                    valueTable.level1.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                    valueTable.level1.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level1.usersInvit.save()
                }
                else{
                    valueTable.level1.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 1, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0 
                    }
                    valueTable.level1.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level1.usersInvit.save()
                }
            }
            else {
                console.log("hello");

            valueTable.level1.usersInvit.unassigned_tree_positions[owner_id] ={ title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
            valueTable.level1.usersInvit.changed("unassigned_tree_positions",true)
            await valueTable.level1.usersInvit.save()
        }
            }
    }
    
        console.log("OOOOOOOOOOOOOOOOOOOOOOOOOO")
        console.log(usersSponsors.level1)
        console.log(valueTable.level1.usersSaleAccount.id)
        if(usersSponsors.level1 !== valueTable.level1.usersSaleAccount.id) {
            const falseSponsorsTree = await invitation.findOne({where:{sale_account_id:usersSponsors.level1}})
            console.log(falseSponsorsTree)
            if(falseSponsorsTree) {
                if(!!falseSponsorsTree.unassigned_tree_positions[owner_id]){
                    console.log(falseSponsorsTree.unassigned_tree_positions[owner_id])
                    console.log(falseSponsorsTree.unassigned_tree_positions)
                    console.log(owner_id)
                    delete falseSponsorsTree.unassigned_tree_positions[owner_id]
                    console.log(falseSponsorsTree.unassigned_tree_positions)
                    falseSponsorsTree.changed("unassigned_tree_positions",true)
                    await falseSponsorsTree.save()
                }
                if(!!falseSponsorsTree.self_tree_positions[owner_id]){
                    delete falseSponsorsTree.self_tree_positions[owner_id]
                    falseSponsorsTree.changed("self_tree_positions",true)
                    await falseSponsorsTree.save()
                }
            }
            usersSponsors.level1 = valueTable.level1.usersSaleAccount.id
            await usersSponsors.save()
        }
        

       
        console.log("OOOOOOOOOOOOOOOOOOOOOOOO")
    
        // level2
        console.log("hello");
        if(!!valueTable.level2){
            if(valueTable.level2.usersInvit.self_tree_positions[owner_id]?.level !== 2) {
                console.log("hello");
                console.log(valueTable.level2.usersInvit.self_tree_positions[owner_id])
                if(!!valueTable.level2.usersInvit.self_tree_positions[owner_id]){
                    valueTable.level2.usersInvit.self_tree_positions[owner_id].level = 2
                    valueTable.level2.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level2.usersInvit.save()
                } 
            }
            if(valueTable.level2.usersInvit.unassigned_tree_positions[owner_id]?.level !== 2) {
                console.log("hello");

                if(!!valueTable.level2.usersInvit.unassigned_tree_positions[owner_id]){
                    console.log("hello");

                    valueTable.level2.usersInvit.unassigned_tree_positions[owner_id].level = 2
                    valueTable.level2.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level2.usersInvit.save()
                }
                else {
                    console.log("hello")
                    if(usersAccount.has_saleAccount){
                    console.log("hello")
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:owner_id}})
                    if(!usersSaleAccount) {
                        usersAccount.has_saleAccount = false
                        console.log("LOS POYOS HERMANOS15");
                        await usersAccount.save()
                        // Musteri ekle
                        valueTable.level2.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level2.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level2.usersInvit.save()
                    }
                    else{
                        console.log("hello");
    
                        valueTable.level2.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 2, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level2.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level2.usersInvit.save()
                    }
                    
                }
                else{
                    valueTable.level2.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level2.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level2.usersInvit.save()
                }
            
            }
            }

            if(valueTable.level2.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]?.level !== 1 ) {
                console.log(valueTable.level2.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]);
                if(!!valueTable.level2.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level2.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id].level = 1
                    valueTable.level2.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level2.usersInvit.save()
                } 
            }
            if(valueTable.level2.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]?.level !== 1) {
                if(!!valueTable.level2.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level2.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id].level = 1
                    valueTable.level2.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level2.usersInvit.save()
                }
                else {
                    if(valueTable.level1.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level1.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level1.usersAccount.has_saleAccount = false
                        console.log("LOS POYOS HERMANOS16");
                        await valueTable.level1.usersAccount.save()
                        // Musteri ekle
                        valueTable.level2.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level2.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level2.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level2.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 1, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level2.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level2.usersInvit.save()
                    }
                }
                else{
                    valueTable.level2.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                    valueTable.level2.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level2.usersInvit.save()
                }


            }
            }
            if(usersSponsors.level2 !== valueTable.level2.usersSaleAccount.id) {
                const falseSponsorsTree = await invitation.findOne({where:{sale_account_id:usersSponsors.level2}})
                if(!!falseSponsorsTree.unassigned_tree_positions[owner_id]){
                    delete falseSponsorsTree.unassigned_tree_positions[owner_id]
                    falseSponsorsTree.changed("unassigned_tree_positions",true)
                    await falseSponsorsTree.save()
                }
                if(!!falseSponsorsTree.self_tree_positions[owner_id]){
                    delete falseSponsorsTree.self_tree_positions[owner_id]
                    falseSponsorsTree.changed("self_tree_positions",true)
                    await falseSponsorsTree.save()
                }

                usersSponsors.level2 = valueTable.level2.usersSaleAccount.id
                await usersSponsors.save()
            }
            if(valueTable.level1.usersSponsors.level1 !== valueTable.level2.usersSaleAccount.id) {
                valueTable.level1.usersSponsors.level1 = valueTable.level2.usersSaleAccount.id
                await valueTable.level1.usersSponsors.save()
            }
        }
        else{
            if(usersSponsors.level2 !== null){
                usersSponsors.level2 = null
                await usersSponsors.save()
            }
           
        }
        console.log("OOOOOOOOOOOOOOOOOOOOOOOOOO")

        // level3
        if(!!valueTable.level3){
            console.log("hello");
            if(valueTable.level3.usersInvit.self_tree_positions[owner_id]?.level !== 3 ) {
                if(!!valueTable.level3.usersInvit.self_tree_positions[owner_id]){
                    valueTable.level3.usersInvit.self_tree_positions[owner_id][level] = 3
                    valueTable.level3.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level3.usersInvit.save()
                } 
            }
            if(valueTable.level3.usersInvit.unassigned_tree_positions[owner_id]?.level !== 3) {
                if(!!valueTable.level3.usersInvit.unassigned_tree_positions[owner_id]){
                    valueTable.level3.usersInvit.unassigned_tree_positions[owner_id][level] = 3
                    valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level3.usersInvit.save()
                }
                else {
                    if(usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:owner_id}})
                    if(!usersSaleAccount) {
                        usersAccount.has_saleAccount = false
                        console.log("LOS POYOS HERMANOS18");
                        await usersAccount.save()
                        // Musteri ekle
                        valueTable.level3.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level3.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 3, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
                    }
                }
                else{
                    valueTable.level3.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
                }
            }
            }
            if(valueTable.level3.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]?.level !== 2) {
                if(!!valueTable.level3.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level3.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id][level] = 2
                    valueTable.level3.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level3.usersInvit.save()
                } 
            }
            if(valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]?.level !== 2) {
                if(!!valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id][level] = 2
                    valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level3.usersInvit.save()
                }
                else{
                     if(valueTable.level1.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level1.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level1.usersAccount.has_saleAccount = false
                        console.log("LOS POYOS HERMANOS19");
                        await valueTable.level1.usersAccount.save()
                        // Musteri ekle
                        valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 2, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
                    }
                }
            else{
                valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
            }
            }
            }
            if(valueTable.level3.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id]?.level !== 1) {
                if(!!valueTable.level3.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id]){
                    valueTable.level3.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id][level] = 1
                    valueTable.level3.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level3.usersInvit.save()
                } 
            }
            if(valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id]?.level !== 1) {
                if(!!valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id]){
                    valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id][level] = 1
                    valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level3.usersInvit.save()
                }
                else {
                    if(valueTable.level2.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level2.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level2.usersAccount.has_saleAccount = false
                        console.log("LOS POYOS HERMANOS20");
                        await valueTable.level2.usersAccount.save()
                        // Musteri ekle
                        valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 1, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
                    }
                }
            else{
                valueTable.level3.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level3.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level3.usersInvit.save()
            }
            }
            }
            if(usersSponsors.level3 !== valueTable.level3.usersSaleAccount.id) {
                const falseSponsorsTree = await invitation.findOne({where:{sale_account_id:usersSponsors.level3}})
                if(!!falseSponsorsTree.unassigned_tree_positions[owner_id]){
                    delete falseSponsorsTree.unassigned_tree_positions[owner_id]
                    falseSponsorsTree.changed("unassigned_tree_positions",true)
                    await falseSponsorsTree.save()
                }
                if(!!falseSponsorsTree.self_tree_positions[owner_id]){
                    delete falseSponsorsTree.self_tree_positions[owner_id]
                    falseSponsorsTree.changed("self_tree_positions",true)
                    await falseSponsorsTree.save()
                }

                usersSponsors.level3 = valueTable.level3.usersSaleAccount.id
                await usersSponsors.save()
            }
            if(valueTable.level2.usersSponsors.level1 !== valueTable.level3.usersSaleAccount.id) {

                valueTable.level2.usersSponsors.level1 = valueTable.level3.usersSaleAccount.id
                await valueTable.level2.usersSponsors.save()
            }
            if(valueTable.level1.usersSponsors.level2 !== valueTable.level3.usersSaleAccount.id) {
                valueTable.level1.usersSponsors.level2 = valueTable.level3.usersSaleAccount.id
                await valueTable.level1.usersSponsors.save()
            }
           
        }
        else{
            if(usersSponsors.level3 !== null) {
                usersSponsors.level3 = null
                await usersSponsors.save()
            }
          
        }
        console.log("OOOOOOOOOOOOOOOOOOOOOOOOOO")

        // level4
        if(!!valueTable.level4){
            console.log("hello");
            if(valueTable.level4.usersInvit.self_tree_positions[owner_id]?.level !== 4) {
                if(!!valueTable.level4.usersInvit.self_tree_positions[owner_id]){
                    valueTable.level4.usersInvit.self_tree_positions[owner_id][level] = 4
                    valueTable.level4.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level4.usersInvit.save()
                } 
            }
            if(valueTable.level4.usersInvit.unassigned_tree_positions[owner_id]?.level !== 4) {
                if(!!valueTable.level4.usersInvit.unassigned_tree_positions[owner_id]){
                    valueTable.level4.usersInvit.unassigned_tree_positions[owner_id][level] = 4
                    valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level4.usersInvit.save()
                }
                else {if(usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:owner_id}})
                    if(!usersSaleAccount) {
                        usersAccount.has_saleAccount = false
                        await usersAccount.save()
                        // Musteri ekle
                        valueTable.level4.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 4, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level4.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 4, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
                    }
                }
            else{
                valueTable.level4.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 4, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                await valueTable.level4.usersInvit.save()
            }}
            }
    
            if(valueTable.level4.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]?.level !== 3 ) {
                if(!!valueTable.level4.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level4.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id][level] = 3
                    valueTable.level4.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level4.usersInvit.save()
                } 
            }
            if(valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]?.level !== 3) {
                if(!!valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id][level] = 3
                    valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level4.usersInvit.save()
                }
                else {if(valueTable.level1.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level1.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level1.usersAccount.has_saleAccount = false
                        await valueTable.level1.usersAccount.save()
                        // Musteri ekle
                        valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 3, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
                    }
                }
            else{
                valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
            }}
            }
            if(valueTable.level4.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id]?.level !== 2 ) {
                if(!!valueTable.level4.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id]){
                    valueTable.level4.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id][level] = 2
                    valueTable.level4.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level4.usersInvit.save()
                } 
            }
            if(valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id]?.level !== 2) {
                if(!!valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id]){
                    valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id][level] = 2
                    valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level4.usersInvit.save()
                }
                else {if(valueTable.level2.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level2.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level2.usersAccount.has_saleAccount = false
                        await valueTable.level2.usersAccount.save()
                        // Musteri ekle
                        valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 2, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
                    }
                }
            else{
                valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                await valueTable.level4.usersInvit.save()
            }}
            }
            if(valueTable.level4.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id]?.level !== 1) {
                if(!!valueTable.level4.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id]){
                    valueTable.level4.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id][level] = 1
                    valueTable.level4.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level4.usersInvit.save()
                } 
            }
            if(valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id]?.level !== 1) {
                if(!!valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id]){
                    valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id][level] = 1
                    valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level4.usersInvit.save()
                }
                else {if(valueTable.level3.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level3.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level3.usersAccount.has_saleAccount = false
                        await valueTable.level3.usersAccount.save()
                        // Musteri ekle
                        valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 1, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level4.usersInvit.save()
                    }
                }
            else{
                valueTable.level4.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                valueTable.level4.usersInvit.changed("unassigned_tree_positions",true)
                await valueTable.level4.usersInvit.save()
            }}
            }
            if(usersSponsors.level4 !== valueTable.level4.usersSaleAccount.id) {
                const falseSponsorsTree = await invitation.findOne({where:{sale_account_id:usersSponsors.level4}})
                if(!!falseSponsorsTree.unassigned_tree_positions[owner_id]){
                    delete falseSponsorsTree.unassigned_tree_positions[owner_id]
                    falseSponsorsTree.changed("unassigned_tree_positions",true)
                    await falseSponsorsTree.save()
                }
                if(!!falseSponsorsTree.self_tree_positions[owner_id]){
                    delete falseSponsorsTree.self_tree_positions[owner_id]
                    falseSponsorsTree.changed("self_tree_positions",true)
                    await falseSponsorsTree.save()
                }

                usersSponsors.level4 = valueTable.level4.usersSaleAccount.id
                await usersSponsors.save()
            }
            if(valueTable.level3.usersSponsors.level1 !== valueTable.level4.usersSaleAccount.id) {
                valueTable.level3.usersSponsors.level1 = valueTable.level4.usersSaleAccount.id
                await valueTable.level3.usersSponsors.save()
            }
            if(valueTable.level2.usersSponsors.level2 !== valueTable.level4.usersSaleAccount.id){
                valueTable.level2.usersSponsors.level2 = valueTable.level4.usersSaleAccount.id
                await valueTable.level2.usersSponsors.save()
            }
            if(valueTable.level1.usersSponsors.level3 !== valueTable.level4.usersSaleAccount.id){
                valueTable.level1.usersSponsors.level3 = valueTable.level4.usersSaleAccount.id
                await valueTable.level1.usersSponsors.save()
            }

        }
        else{
            if(usersSponsors.level4 !== null){
                usersSponsors.level4 = null
                await usersSponsors.save()
            }
           
        }
        if(!!valueTable.level5){
            console.log("hello");
            if(valueTable.level5.usersInvit.self_tree_positions[owner_id]?.level !== 5 ) {
                if(!!valueTable.level5.usersInvit.self_tree_positions[owner_id]){
                    valueTable.level5.usersInvit.self_tree_positions[owner_id][level] = 5
                    valueTable.level5.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                } 
            }
            if(valueTable.level5.usersInvit.unassigned_tree_positions[owner_id]?.level !== 5) {
                if(!!valueTable.level5.usersInvit.unassigned_tree_positions[owner_id]){
                    valueTable.level5.usersInvit.unassigned_tree_positions[owner_id][level] = 5
                    valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                }
                else {if(usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:owner_id}})
                    if(!usersSaleAccount) {
                        usersAccount.has_saleAccount = false
                        await usersAccount.save()
                        // Musteri ekle
                        valueTable.level5.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 5, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level5.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 5, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                }
            else{
                valueTable.level5.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 5, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0  }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
            }}
            }
    
            if(valueTable.level5.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]?.level !== 4 ) {
                if(!!valueTable.level5.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level5.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id][level] = 4
                    valueTable.level5.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                } 
            }
            if(valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]?.level !== 4) {
                if(!!valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id][level] = 4
                    valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                }
                else {if(valueTable.level1.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level1.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level1.usersAccount.has_saleAccount = false
                        await valueTable.level1.usersAccount.save()
                        // Musteri ekle
                        valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 4, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 4, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance: 0
                        }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                }
            else{
                valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 4, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
                valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                await valueTable.level5.usersInvit.save()
            }}
            }
    
            if(valueTable.level5.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id]?.level !== 3 ) {
                if(!!valueTable.level5.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id]){
                    valueTable.level5.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id][level] = 3
                    valueTable.level5.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                } 
            }
            if(valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id]?.level !== 3) {
                if(!!valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id]){
                    valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id][level] = 3
                    valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                }
                else {if(valueTable.level2.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level2.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level2.usersAccount.has_saleAccount = false
                        await valueTable.level2.usersAccount.save()
                        // Musteri ekle
                        valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 3, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0, balance:0
                        }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                }
            else {
                valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
            }}
            }
    
            if(valueTable.level5.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id]?.level !== 2 ) {
                if(!!valueTable.level5.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id]){
                    valueTable.level5.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id][level] = 2
                    valueTable.level5.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                } 
            }
            if(valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id]?.level !== 2) {
                if(!!valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id]){
                    valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id][level] = 2
                    valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                }
                else {if(valueTable.level3.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level3.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level3.usersAccount.has_saleAccount = false
                        await valueTable.level3.usersAccount.save()
                        // Musteri ekle
                        valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 2, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0 , balance: 0
                        }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                }
            else{
                valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                await valueTable.level5.usersInvit.save()  
            }}
            }
    
            if(valueTable.level5.usersInvit.self_tree_positions[valueTable.level4.usersAccount.id]?.level !== 1 ) {
                if(!!valueTable.level5.usersInvit.self_tree_positions[valueTable.level4.usersAccount.id]){
                    valueTable.level5.usersInvit.self_tree_positions[valueTable.level4.usersAccount.id][level] = 1
                    valueTable.level5.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                } 
            }
            if(valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id]?.level !== 1) {
                if(!!valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id]){
                    valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id][level] = 1
                    valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                }
                else {if(valueTable.level4.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level4.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level4.usersAccount.has_saleAccount = false
                        await valueTable.level4.usersAccount.save()
                        // Musteri ekle
                        valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id] = { title: 0, level: 1, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0 , balance: 0
                        }
                        valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level5.usersInvit.save()
                    }
                }else{
                    valueTable.level5.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                    valueTable.level5.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level5.usersInvit.save()
                }}
            }
            
            if(usersSponsors.level5 !== valueTable.level5.usersSaleAccount.id) {
                const falseSponsorsTree = await invitation.findOne({where:{sale_account_id:usersSponsors.level5}})
                if(!!falseSponsorsTree.unassigned_tree_positions[owner_id]){
                    delete falseSponsorsTree.unassigned_tree_positions[owner_id]
                    falseSponsorsTree.changed("unassigned_tree_positions",true)
                    await falseSponsorsTree.save()
                }
                if(!!falseSponsorsTree.self_tree_positions[owner_id]){
                    delete falseSponsorsTree.self_tree_positions[owner_id]
                    falseSponsorsTree.changed("self_tree_positions",true)
                    await falseSponsorsTree.save()
                }

                usersSponsors.level5 = valueTable.level5.usersSaleAccount.id
                await usersSponsors.save()
            }
            if(valueTable.level4.usersSponsors.level1 !== valueTable.level5.usersSaleAccount.id) {
                valueTable.level4.usersSponsors.level1 = valueTable.level5.usersSaleAccount.id
                await valueTable.level4.usersSponsors.save()
            }
            if(valueTable.level3.usersSponsors.level2 !== valueTable.level5.usersSaleAccount.id) {
                valueTable.level3.usersSponsors.level2 = valueTable.level5.usersSaleAccount.id
                await valueTable.level3.usersSponsors.save()
            }
            if(valueTable.level2.usersSponsors.level3 !== valueTable.level5.usersSaleAccount.id) {
                valueTable.level2.usersSponsors.level3 = valueTable.level5.usersSaleAccount.id
                await valueTable.level2.usersSponsors.save()
            }
            if(valueTable.level1.usersSponsors.level4 !== valueTable.level5.usersSaleAccount.id) {
                valueTable.level1.usersSponsors.level4 = valueTable.level5.usersSaleAccount.id
                await valueTable.level1.usersSponsors.save()
            }
           
        }
        else{
            if(usersSponsors.level5 !== null) {
                usersSponsors.level5 = null
                await usersSponsors.save()
            }
           
        }

       
        // level6
        if(!!valueTable.level6){
            console.log("hello")
            if(valueTable.level6.usersInvit.self_tree_positions[owner_id]?.level !== 6 ) {
                if(!!valueTable.level6.usersInvit.self_tree_positions[owner_id]){
                    valueTable.level6.usersInvit.self_tree_positions[owner_id][level] = 6
                    valueTable.level6.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                } 
            }
            if(valueTable.level6.usersInvit.unassigned_tree_positions[owner_id]?.level !== 6) {
                if(!!valueTable.level6.usersInvit.unassigned_tree_positions[owner_id]){
                    valueTable.level6.usersInvit.unassigned_tree_positions[owner_id][level] = 6
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }
                else {if(usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:owner_id}})
                    if(!usersSaleAccount) {
                        usersAccount.has_saleAccount = false
                        await usersAccount.save()
                        // Musteri ekle
                        valueTable.level6.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 6, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level6.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 6, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0 , balance: 0
                        }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                }else{
                    valueTable.level6.usersInvit.unassigned_tree_positions[owner_id] = { title: 0, level: 6, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                }}
            }
            if(valueTable.level6.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]?.level !== 5 ) {
                if(!!valueTable.level6.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level6.usersInvit.self_tree_positions[valueTable.level1.usersAccount.id][level] = 5
                    valueTable.level6.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                } 
            }
            if(valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]?.level !== 5) {
                if(!!valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id]){
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id][level] = 5
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }
                else {if(valueTable.level1.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level1.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level1.usersAccount.has_saleAccount = false
                        await valueTable.level1.usersAccount.save()
                        // Musteri ekle
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 5, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 5, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0 , balance: 0
                        }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                }else{
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level1.usersAccount.id] = { title: 0, level: 5, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }}
            }
    
            if(valueTable.level6.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id]?.level !== 4 ) {
                if(!!valueTable.level6.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id]){
                    valueTable.level6.usersInvit.self_tree_positions[valueTable.level2.usersAccount.id][level] = 4
                    valueTable.level6.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                } 
            }
            if(valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id]?.level !== 4) {
                if(!!valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id]){
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id][level] = 4
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }
                else{ if(valueTable.level2.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level2.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level2.usersAccount.has_saleAccount = false
                        await valueTable.level2.usersAccount.save()
                        // Musteri ekle
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 4, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 4, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0 , balance: 0
                        }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                }else{
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level2.usersAccount.id] = { title: 0, level: 4, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }}
            }
            if(valueTable.level6.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id]?.level !== 3 ) {
                if(!!valueTable.level6.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id]){
                    valueTable.level6.usersInvit.self_tree_positions[valueTable.level3.usersAccount.id][level] = 3
                    valueTable.level6.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                } 
            }
            if(valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id]?.level !== 3) {
                if(!!valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id]){
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id][level] = 3
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }
                else{ if(valueTable.level3.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level3.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level3.usersAccount.has_saleAccount = false
                        await valueTable.level3.usersAccount.save()
                        // Musteri ekle
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 3, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0 , balance: 0
                        }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                }else{
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level3.usersAccount.id] = { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save() 
                }}
            }
            if(valueTable.level6.usersInvit.self_tree_positions[valueTable.level4.usersAccount.id]?.level !== 2 ) {
                if(!!valueTable.level6.usersInvit.self_tree_positions[valueTable.level4.usersAccount.id]){
                    valueTable.level6.usersInvit.self_tree_positions[valueTable.level4.usersAccount.id][level] = 2
                    valueTable.level6.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                } 
            }
            if(valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id]?.level !== 2) {
                if(!!valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id]){
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id][level] = 2
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }
                else {if(valueTable.level4.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level4.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level4.usersAccount.has_saleAccount = false
                        await valueTable.level4.usersAccount.save()
                        // Musteri ekle
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id] = { title: 0, level: 2, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0 , balance: 0
                        }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                }else{
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level4.usersAccount.id] = { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }}
            }
            if(valueTable.level6.usersInvit.self_tree_positions[valueTable.level5.usersAccount.id]?.level !== 1 ) {
                if(!!valueTable.level6.usersInvit.self_tree_positions[valueTable.level5.usersAccount.id]){
                    valueTable.level6.usersInvit.self_tree_positions[valueTable.level5.usersAccount.id][level] = 1
                    valueTable.level6.usersInvit.changed("self_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                } 
            }
            if(valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level5.usersAccount.id]?.level !== 1) {
                if(!!valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level5.usersAccount.id]){
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level5.usersAccount.id][level] = 1
                    valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                    await valueTable.level6.usersInvit.save()
                }
                else {if(valueTable.level5.usersAccount.has_saleAccount){
                    const usersSaleAccount = await saleAccount.findOne({where:{owner_id:valueTable.level5.usersAccount.id}})
                    if(!usersSaleAccount) {
                        valueTable.level5.usersAccount.has_saleAccount = false
                        await valueTable.level5.usersAccount.save()
                        // Musteri ekle
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level5.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                    
                    else{
                        valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level5.usersAccount.id] = { title: 0, level: 1, has_saleAccount: true, saleAccount_id: usersSaleAccount.id, changeable: true, position: null, point1: 0 , balance: 0
                        }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                    }
                }else{
                    valueTable.level6.usersInvit.unassigned_tree_positions[valueTable.level5.usersAccount.id] = { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance:0 }
                        valueTable.level6.usersInvit.changed("unassigned_tree_positions",true)
                        await valueTable.level6.usersInvit.save()
                }}
            }
            if(usersSponsors.level6 !== valueTable.level6.usersSaleAccount.id) {
                const falseSponsorsTree = await invitation.findOne({where:{sale_account_id:usersSponsors.level6}})
                if(!!falseSponsorsTree.unassigned_tree_positions[owner_id]){
                    delete falseSponsorsTree.unassigned_tree_positions[owner_id]
                    falseSponsorsTree.changed("unassigned_tree_positions",true)
                    await falseSponsorsTree.save()
                }
                if(!!falseSponsorsTree.self_tree_positions[owner_id]){
                    delete falseSponsorsTree.self_tree_positions[owner_id]
                    falseSponsorsTree.changed("self_tree_positions",true)
                    await falseSponsorsTree.save()
                }

                usersSponsors.level6 = valueTable.level6.usersSaleAccount.id
                await usersSponsors.save()
            }
            if(valueTable.level5.usersSponsors.level1 !== valueTable.level6.usersSaleAccount.id) {
                valueTable.level5.usersSponsors.level1 = valueTable.level6.usersSaleAccount.id
                await valueTable.level5.usersSponsors.save()
            }
            if(valueTable.level4.usersSponsors.level2 !== valueTable.level6.usersSaleAccount.id){
                valueTable.level4.usersSponsors.level2 = valueTable.level6.usersSaleAccount.id
                await valueTable.level4.usersSponsors.save()
            }
            if(valueTable.level3.usersSponsors.level3 !== valueTable.level6.usersSaleAccount.id) {
                valueTable.level3.usersSponsors.level3 = valueTable.level6.usersSaleAccount.id
                await valueTable.level3.usersSponsors.save()
            }
            if(valueTable.level2.usersSponsors.level4 !== valueTable.level6.usersSaleAccount.id) {
                valueTable.level2.usersSponsors.level4 = valueTable.level6.usersSaleAccount.id
                await valueTable.level2.usersSponsors.save()
            }
            if(valueTable.level1.usersSponsors.level5 !== valueTable.level6.usersSaleAccount.id) {
                valueTable.level1.usersSponsors.level5 = valueTable.level6.usersSaleAccount.id
                await valueTable.level1.usersSponsors.save()
            }
           
        }
        else{
            if(usersSponsors.level6 !== null) {
                usersSponsors.level6 = null
                await usersSponsors.save()
            }

        }
        return true
    }
    catch(err){
                                console.log("triggered2",err)
;importantPanic("DOOMSDAYYYYYYYYYYYYY")
    }
    
}