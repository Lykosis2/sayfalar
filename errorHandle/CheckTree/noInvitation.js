import noSponsor from "../noSponsor"
import tryCreatingAgain from "./treeCreateError"

export default async function noInvitation(saleAccountId,invitation,saleAccount,sponsors) {
    const usersInvit = await invitation.findOne({
        where: {
            sale_account_id: saleAccountId,
        },
    })
    if (!usersInvit) {
        const usersSaleAccount = await saleAccount.findOne({
            where: {
                id: saleAccountId,
            },
        })
        const usersSponsors = await sponsors.findOne({
            where: {
                owner_id: usersSaleAccount.owner_id,
            },
        })
        if(!usersSponsors){
            await noSponsor(sponsors,usersSaleAccount.owner_id)
        }
        if(!usersSaleAccount){
            await importantPanic("Sale account not found")
        }
        await invitation.create({ sale_account_id: usersSaleAccount.id, id: usersSaleAccount.invitation }).then(async (res) => {
            const currentPoint1 = res.self_tree_positions[`${usersSaleAccount.owner_id}`]?.point1 || 0
            await locker.lockAndWait(`invitation-${res.id}`, 60 * 1000)
            res.self_tree_positions[`${usersSaleAccount.owner_id}`] = {
              has_saleAccount: true,
              saleAccount_id: usersSaleAccount.id,
              level: 0,
              balance: 0,
              point1: currentPoint1,
              position: 0,
              changeable: false,
            }
            res.changed('self_tree_positions', true)
            const allSponsors = await sponsors.findAll()
            await Promise.all(
                
                allSponsors.map(async element => {
                    if(element.level1 === usersSaleAccount.id){
                        const foundSaleAccount  = await saleAccount.findOne({where:{
                            owner_id:element.owner_id
                        }})
                        if(!foundSaleAccount){
                            res.unassigned_tree_positions[`${element.owner_id}`] = {
                                has_saleAccount: false,
                                saleAccount_id: null,
                                level: 1,
                                balance: 0,
                                point1: 0,
                                position:null,
                                changeable: false,
                        }
                    }
                    else {
                        res.unassigned_tree_positions[`${element.owner_id}`] = {
                            has_saleAccount: true,
                            saleAccount_id: foundSaleAccount.id,
                            level: 1,
                            balance: 0,
                            point1: 0,
                            position:null,
                            changeable: false,
                    }
                    
                    }
    
                    }
                    if (element.level2 === usersSaleAccount.id){
                        const foundSaleAccount  = await saleAccount.findOne({where:{
                            owner_id:element.owner_id
                        }})
                        if(!foundSaleAccount){
                            res.unassigned_tree_positions[`${element.owner_id}`] = {
                                has_saleAccount: false,
                                saleAccount_id: null,
                                level: 2,
                                balance: 0,
                                point1: 0,
                                position:null,
                                changeable: false,
                        }
                    }
                    else {
                        res.unassigned_tree_positions[`${element.owner_id}`] = {
                            has_saleAccount: true,
                            saleAccount_id: foundSaleAccount.id,
                            level: 2,
                            balance: 0,
                            point1: 0,
                            position:null,
                            changeable: false,
                    }
                    
                    }
                    }
                    if (element.level3 === usersSaleAccount.id){
                        const foundSaleAccount  = await saleAccount.findOne({where:{
                            owner_id:element.owner_id
                        }})
                        if(!foundSaleAccount){
                            res.unassigned_tree_positions[`${element.owner_id}`] = {
                                has_saleAccount: false,
                                saleAccount_id: null,
                                level: 3,
                                balance: 0,
                                point1: 0,
                                position:null,
                                changeable: false,
                        }
                    }
                    else {
                        res.unassigned_tree_positions[`${element.owner_id}`] = {
                            has_saleAccount: true,
                            saleAccount_id: foundSaleAccount.id,
                            level: 3,
                            balance: 0,
                            point1: 0,
                            position:null,
                            changeable: false,
                    }
                    
                    }
                    }
                    if (element.level4 === usersSaleAccount.id){
                        const foundSaleAccount  = await saleAccount.findOne({where:{
                            owner_id:element.owner_id
                        }})
                        if(!foundSaleAccount){
                            res.unassigned_tree_positions[`${element.owner_id}`] = {
                                has_saleAccount: false,
                                saleAccount_id: null,
                                level: 4,
                                balance: 0,
                                point1: 0,
                                position:null,
                                changeable: false,
                        }
                    }
                    else {
                        res.unassigned_tree_positions[`${element.owner_id}`] = {
                            has_saleAccount: true,
                            saleAccount_id: foundSaleAccount.id,
                            level: 4,
                            balance: 0,
                            point1: 0,
                            position:null,
                            changeable: false,
                    }
                    
                    }
                    }
                    if (element.level5 === usersSaleAccount.id){
                        const foundSaleAccount  = await saleAccount.findOne({where:{
                            owner_id:element.owner_id
                        }})
                        if(!foundSaleAccount){
                            res.unassigned_tree_positions[`${element.owner_id}`] = {
                                has_saleAccount: false,
                                saleAccount_id: null,
                                level: 5,
                                balance: 0,
                                point1: 0,
                                position:null,
                                changeable: false,
                        }
                    }
                    else {
                        res.unassigned_tree_positions[`${element.owner_id}`] = {
                            has_saleAccount: true,
                            saleAccount_id: foundSaleAccount.id,
                            level: 5,
                            balance: 0,
                            point1: 0,
                            position:null,
                            changeable: false,
                    }
                    
                    }
                    }
                    if (element.level6 === usersSaleAccount.id){
                        const foundSaleAccount  = await saleAccount.findOne({where:{
                            owner_id:element.owner_id
                        }})
                        if(!foundSaleAccount){
                            res.unassigned_tree_positions[`${element.owner_id}`] = {
                                has_saleAccount: false,
                                saleAccount_id: null,
                                level: 6,
                                balance: 0,
                                point1: 0,
                                position:null,
                                changeable: false,
                        }
                    }
                    else {
                        res.unassigned_tree_positions[`${element.owner_id}`] = {
                            has_saleAccount: true,
                            saleAccount_id: foundSaleAccount.id,
                            level: 6,
                            balance: 0,
                            point1: 0,
                            position:null,
                            changeable: false,
                    }
                    
                    }
                    }   
                })
            )
            await res.save()
            await locker.unlock(`invitation-${res.id}`)
          },
          ).catch(async (err) => {
            await tryCreatingAgain(usersSaleAccount,invitation)
          })

    }
    else{
        await importantPanic("Invitation already exists agac PROBLEMMMMMMM ")
    }

}