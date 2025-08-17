import changeAndAddSponsors from './changeAndAddSponsors'
import finaAddedList from './finalAddedList'
import finalChangedList from './finalChangedList'


// MAJOR FLOW HERE 
export default async function putTreeToSponsor(documentedSponsors, invitation, SaleAccount, sponsors, deletedUserId, documentedUsersTree, User, deletedSaleAccountId) {
  console.log(deletedUserId);
    const usersinvit = await invitation.findOne({ where: { sale_account_id: deletedSaleAccountId } })
    console.log(usersinvit.self_tree_positions);
    console.log(Object.keys(usersinvit.self_tree_positions));
    try{
      
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
          console.log(documentedSponsors[key]);
          console.log(sponsorsTree.self_tree_positions)
          console.log(sponsorsTree.unassigned_tree_positions);
          console.log(sponsorsTree.self_tree_positions[deletedUserId]);
          console.log(finalChanged)
          await Promise.all(
            Object.keys(sponsorsTree.self_tree_positions).map(async (key) => {
              if (finalChanged.includes(key)) {
                console.log(sponsorsTree.self_tree_positions[key].level)
                if (sponsorsTree.self_tree_positions[key].level === 1)
                  return // TODO error handle this
                console.log(sponsorsTree.self_tree_positions[key].level)
                console.log(sponsorsTree.self_tree_positions[key].level)
                sponsorsTree.self_tree_positions[key].level = sponsorsTree.self_tree_positions[key].level - 1
                console.log(sponsorsTree.self_tree_positions[key].level)
              }           
            },
            ),
          )
          const checkError = await invitation.findOne({ where: { sale_account_id: documentedSponsors[key] } })
          console.log(checkError.unassigned_tree_positions);

        
          
          delete sponsorsTree[`invitation_${key}`][deletedUserId]
          delete sponsorsTree.self_tree_positions[deletedUserId]
          sponsorsTree.unassigned_tree_positions = { ...sponsorsTree.unassigned_tree_positions, ...finalAdded }
          await sponsorsTree.changed(`invitation_${key}`, true)
          await sponsorsTree.changed('self_tree_positions', true)
          await sponsorsTree.changed('unassigned_tree_positions', true)
          await sponsorsTree.save()
        }),
        
      )
    }
    catch(err){
      console.log(err);
    }
    console.log(Object.keys(usersinvit.self_tree_positions));
    try{
      await Promise.all(
        Object.keys(usersinvit.self_tree_positions).map(async (key) => {
          console.log("ola muchacos");
          console.log(key);
          console.log(sponsors)
          console.log(key);
          if(!key) return
          if(key === deletedUserId) return
          console.log(key);
          const sponsorsOfChanged = await sponsors.findOne({ where: { owner_id: key } }).catch((err) => console.log(err))
          console.log(sponsorsOfChanged);
          await changeAndAddSponsors(sponsorsOfChanged, deletedSaleAccountId, User, SaleAccount, sponsors)
        })
      )
    }
    catch(err){
      console.log(err);
    }
    const checkError = await invitation.findOne({ where: { sale_account_id: documentedSponsors.level1 } })
    console.log(checkError.unassigned_tree_positions);

  }


