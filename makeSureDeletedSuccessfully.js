import finaAddedList from "./deleteSaleAccount/finalAddedList"
import finalChangedList from "./deleteSaleAccount/finalChangedList"

export default async function makeSureDeletedSuccessfully(deletedUserOwnerId, deletedUserSaleAccountId, User, SaleAccount, sponsors,invitation,oldSponsorsTrees,documentedSponsors,documentedUsersTree) {

    const canFindSaleAccount = await SaleAccount.findOne({ where: { id: deletedUserSaleAccountId } })
    if (canFindSaleAccount) {
        console.log("hey")
        return false
    }
    const canFindInvitation = await invitation.findOne({ where: { sale_account_id: deletedUserSaleAccountId } })
    if (canFindInvitation) {
        console.log("hey")
        return false
    }
    const usersSponsors = await sponsors.findOne({ where: { owner_id: deletedUserOwnerId } })
    if(!usersSponsors){
        console.log("hey")
        return false
    }
    if (usersSponsors.level1 !== "2582a601-956b-4076-a6b3-bd40e11df286") {
        console.log("hey")
        return false
    }
    if (!!usersSponsors.level2) {
        console.log("hey")
        return false
    }
    if (!!usersSponsors.level3) {
        console.log("hey")
        return false
    }
    if (!!usersSponsors.level4) {
        console.log("hey")
        return false
    }
    if (!!usersSponsors.level5) {
        console.log("hey")
        return false
    }
    if (!!usersSponsors.level6) {
        console.log("hey")
        return false
    }

    const allSponsors = await sponsors.findAll()

    for (let i = 0; i < allSponsors.length; i++) {
        const sponsor = allSponsors[i];
        if (sponsor.level1 === deletedUserSaleAccountId) {

            console.log("hey")
            return false
        }
        if (sponsor.level2 === deletedUserSaleAccountId) {

            console.log("hey")
            return false
        }
        if (sponsor.level3 === deletedUserSaleAccountId) {

            console.log("hey")
            return false
        }
        if (sponsor.level4 === deletedUserSaleAccountId) {

            console.log("hey")
            return false
        }
        if (sponsor.level5 === deletedUserSaleAccountId) {

            console.log("hey")
            return false
        }
        if (sponsor.level6 === deletedUserSaleAccountId) {

            console.log("hey")
            return false
        }
    }
    const myUser=  await User.findOne({where:{id:deletedUserOwnerId}})
    if(!myUser){
        console.log("hey")
        return false
    }
    if(myUser.sponsor !== 80562){
        console.log("hey")
        return false
    }

    // check according to past self_tree_positions and sponsors 

    // Make its in tree 

    
        await Promise.all(
          Object.keys(documentedSponsors).map(async (key) => {
            if (!documentedSponsors[key])
              return
            const sponsorsTree = await invitation.findOne({ where: { sale_account_id: documentedSponsors[key] } })
            const finalAdded = await finaAddedList(key, documentedUsersTree) // obejct of user ids as level6
            console.log(finalAdded);
            const finalChanged = await finalChangedList(key, documentedUsersTree) // array of user ids to be changed
            if (finalChanged.length === 0 && finalAdded.length === 0)
              return
    
            // TODO FIX THIS
            // TODO FIX THIS
    
            // TODO FIX THIS
            // TODO FIX THIS
            //Looks at users sponsors but not to people who that user is sponsor of
            
            console.log(finalChanged)
            const treeChecked = async () => {
                const keys = Object.keys(sponsorsTree.self_tree_positions);
                const checks = await Promise.all(keys.map(async (key2) => {
                  if (finalChanged.includes(key2)) {
                    console.log(oldSponsorsTrees[key].self_tree_positions[key2].level);
                    console.log(sponsorsTree.self_tree_positions[key2].level);
                    console.log(oldSponsorsTrees[key].sale_account_id);
                    console.log(sponsorsTree.sale_account_id);
                    
                    if (sponsorsTree.self_tree_positions[key2].level !== oldSponsorsTrees[key].self_tree_positions[key2].level - 1) {
                      console.log("hey");
                      return false;
                    } else {
                      console.log("hey");
                      return true;
                    }
                  }
                  return true; 
                }));
              
                return checks.every(check => check);
              };
              
              // Usage
              treeChecked().then(result => {
                console.log(result);
                if(!result){
                    console.log("hey");
                    return false
                }
              });
            console.log("hey");
            console.log(sponsorsTree.unassigned_tree_positions);

            const unassignedChecked =async ()=> {
                const keys = Object.keys(sponsorsTree.unassigned_tree_positions);
                const checks = await Promise.all(keys.map(async (key2) => {
                  console.log(finalAdded);
                  if (Object.keys(finalAdded).includes(key2)) {
                    if (!sponsorsTree.unassigned_tree_positions[key2]) {
                      console.log("hey");
                      return false;
                    } else {
                      console.log("hey");
                      return true;
                    }
                  }
                  return true; // Return true for keys not in finalAdded to mimic `every` behavior
                }));
                
                return checks.every(check => check); // Check if all are true
              
            }
            unassignedChecked().then((res)=>{
                console.log(res);
                if(!res){
                    console.log("hey");
                    return false
                }
            }
            )
            
            
          }),
          
        )

        console.log("hey");
   
    return true

    // then go to old sponsors table and check if their places are correct for old table 
}