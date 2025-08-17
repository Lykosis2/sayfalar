import { randomInt } from 'node:crypto'
import Sequelize from 'sequelize'
import Invitation from './invitation'
import Sponsors from './sponsors'
import sequelize from '@/components/DatabaseReferance'
import locker from '@/lib/providers/locker'
import importantPanic from '../lib/errorHandle/importantPanic'
import noSponsors from '../lib/errorHandle/CheckTree/noSponsors'
import checkAndSolveProblems from '../lib/errorHandle/CheckTree/checkAndSolveProblems'
import noInvitation from '../lib/errorHandle/CheckTree/noInvitation'
import tryCreatingAgain from '../lib/errorHandle/CheckTree/treeCreateError'

const saleAccount = function () {
  const saleAccount = sequelize.define('saleAccount', {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,

    },
    owner_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      unique: true,

    },
    specialOrders: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      validate: {
        validateSpecialOrders(value) {
          if (!value)
            return
          const keys = Object.keys(value)
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const products = Object.keys(value[key])
            for (let j = 0; j < products.length; j++) {
              const product = products[j]
              const order = value[key][product]
              if (!order.id || !order.count || !order.price || !order.point1) {
              }
              else if (typeof order.id !== 'number' || typeof order.count !== 'number' || typeof order.price !== 'number' || typeof order.point1 !== 'number') {
                throw new TypeError('specialOrders validation error')
              }
            }
          }
        },
      },
    },

    // sold_products:{
    //     type : Sequelize.DataTypes.JSON,
    //     allowNull: true,
    //     defaultValue: {}
    // },
    invitation: {
      type: Sequelize.DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      autoIncrement: true,

    },
    is_company: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    //    SaleMissions:{
    //     type : Sequelize.DataTypes.JSON,
    //     allowNull: true,
    //     defaultValue: {
    //         default:{

    //             "sharePeople":0,
    //             "shareProduct":0,
    //         },
    //         locationBased:{

    //         },

    //         timeBased:{

    //         }

    //     }
    //    },
    //    SaleRewards:{
    //     type : Sequelize.DataTypes.JSON,
    //     allowNull: true,
    //     defaultValue: {

    //     }
    //    },
    //    change on iade
    confirmed_balance: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    //    change on iade
    unconfirmed_balance: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    //    change on iade
    title: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    //    change on iade
    last_months_title: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    //    change on iade
    two_month_ago_title: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    real_title: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    //    change on iade
    last_months_active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    //    change on iade
    active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    freeTime: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: '9:00-17:00',
    },

    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    //    change on iade
    self_gained_point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    two_month_ago_self_gained_point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    last_months_self_gained_point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },

    //    change on iade
    last_months_point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    //    change on iade
    real_point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    //    change on iade
    last_months_real_point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,

    },
    //    change on iade
    two_month_ago_real_point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    claimed_title_rewards: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    //    change on iade
    point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    registered_user: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,

    },
    // Müsteri Bonusu
    ekipGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    organizasyonGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    musteriGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    tanistirmaGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,

    },
    kariyerBonusuGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    liderlikBonusuGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    lastMonthsLiderlikBonusuGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    lastMonthsOrganizasyonGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    lastMonthsEkipGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    lastMonthsMusteriGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    lastMonthsTanistirmaGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    lastMonthsKariyerBonusuGeliri: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    toPayKariyerBonusu: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,

    },
    IBAN: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isIBAN(value) {
          if (!value)
            throw new Error('IBAN is required')
          if (typeof value !== 'string')
            throw new Error('IBAN must be string')
          // TR330006100519786457841326 valid
          // TR33 0006 1005 1978 6457 8413 26 valid
          if (!/TR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?/.test(value))
            throw new Error('IBAN is not valid')
        },
      },
    },
    referenceNumber: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue() {
        return randomInt(0, 100000000)
      },
      unique: true,
    },
  },

  )

  const sponsors = Sponsors()
  if(!sponsors){
    importantPanic('sponsors not found')
    return
  }
  const invitation = Invitation()
  if(!invitation){
    importantPanic('invitation not found')
    return
  }
  // const UserWeeklyMonthlyTable = userWeeklyMonthlyTable()

  saleAccount.afterCreate(async (mysaleAccount, options) => {
    const owner_id = mysaleAccount.owner_id
    const realSponsors = await sponsors.findOne({ where: { owner_id } })
    if(!realSponsors){
      await noSponsors(owner_id,sponsors,saleAccount)
    }
    if (!realSponsors.level1 && mysaleAccount.id === "2582a601-956b-4076-a6b3-bd40e11df286") {
      importantPanic("SIRKET HESABI CREATED AGAIN")
      return
    }else if(!realSponsors.level1){
      await checkAndSolveProblems(owner_id)
    }


    const firstSponsorsTree = await invitation.findOne({ where: { sale_account_id: realSponsors.level1 } })

    if(!firstSponsorsTree){
      await noInvitation(realSponsors.level1,invitation,saleAccount,sponsors)
    }

    
    const inSelfTree = !!firstSponsorsTree?.self_tree_positions?.[`${owner_id}`]
    const inUnassignedTree = !!firstSponsorsTree?.unassigned_tree_positions?.[`${owner_id}`]
    if (!firstSponsorsTree.self_tree_positions || !firstSponsorsTree.unassigned_tree_positions){
      await noInvitation(realSponsors.level1,invitation,saleAccount,sponsors)
    }
    if(!inSelfTree && !inUnassignedTree){
      await checkAndSolveProblems(owner_id)
      await importantPanic("USER NOT FOUND")
    }

    if (inSelfTree) {
      firstSponsorsTree.self_tree_positions[`${owner_id}`].has_saleAccount = true
      firstSponsorsTree.self_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
      firstSponsorsTree.self_tree_positions[`${owner_id}`].title = 1
      firstSponsorsTree.changed('self_tree_positions', true)
      await locker.lockAndWait(`invitation-${firstSponsorsTree.sale_account_id}`, 60 * 1000)
      await firstSponsorsTree.save()
      await locker.unlock(`invitation-${firstSponsorsTree.sale_account_id}`)
      
    }
    else if (inUnassignedTree) {
      firstSponsorsTree.unassigned_tree_positions[`${owner_id}`].has_saleAccount = true
      firstSponsorsTree.unassigned_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
      firstSponsorsTree.unassigned_tree_positions[`${owner_id}`].title = 1
      firstSponsorsTree.changed('unassigned_tree_positions', true)
      console.log('first sponsors tree changed')
      //await locker.lockAndWait(`invitation-${firstSponsorsTree.sale_account_id}`, 60 * 1000)
      await firstSponsorsTree.save()
      //await locker.unlock(`invitation-${firstSponsorsTree.sale_account_id}`)
    }
    if (realSponsors && realSponsors.level2) {
      const secondSponsorsTree = await invitation.findOne({ where: { sale_account_id: realSponsors.level2 } })
      const inSelfTree = !!secondSponsorsTree?.self_tree_positions?.[`${owner_id}`]
      const inUnassignedTree = !!secondSponsorsTree?.unassigned_tree_positions?.[`${owner_id}`]
      if(!secondSponsorsTree.self_tree_positions || !secondSponsorsTree.unassigned_tree_positions){
        await noInvitation(realSponsors.level2,invitation,saleAccount,sponsors)
      }
      if(!inSelfTree && !inUnassignedTree){
        await checkAndSolveProblems(owner_id)
        await importantPanic("USER NOT FOUND")
      }
      if (inSelfTree) {
        secondSponsorsTree.self_tree_positions[`${owner_id}`].has_saleAccount = true
        secondSponsorsTree.self_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        secondSponsorsTree.self_tree_positions[`${owner_id}`].title = 1
        secondSponsorsTree.changed('self_tree_positions', true)
        console.log('second sponsors tree changed')
       // await locker.lockAndWait(`invitation-${secondSponsorsTree.sale_account_id}`, 60 * 1000)
        await secondSponsorsTree.save()
       // await locker.unlock(`invitation-${secondSponsorsTree.sale_account_id}`)
      }
      else if (inUnassignedTree) {
        secondSponsorsTree.unassigned_tree_positions[`${owner_id}`].has_saleAccount = true
        secondSponsorsTree.unassigned_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        secondSponsorsTree.unassigned_tree_positions[`${owner_id}`].title = 1
        secondSponsorsTree.changed('unassigned_tree_positions', true)
       // await locker.lockAndWait(`invitation-${secondSponsorsTree.sale_account_id}`, 60 * 1000)
        await secondSponsorsTree.save()
       // await locker.unlock(`invitation-${secondSponsorsTree.sale_account_id}`)
      }
    }
    
    if (realSponsors && realSponsors.level3) {
      const thirdSponsorsTree = await invitation.findOne({ where: { sale_account_id: realSponsors.level3 } })
      const inSelfTree = !!thirdSponsorsTree?.self_tree_positions?.[owner_id]
      const inUnassignedTree = !!thirdSponsorsTree?.unassigned_tree_positions?.[owner_id]
      if(!thirdSponsorsTree.self_tree_positions || !thirdSponsorsTree.unassigned_tree_positions){
        await noInvitation(realSponsors.level3,invitation,saleAccount,sponsors)
      }
      if(!inSelfTree && !inUnassignedTree){
        await checkAndSolveProblems(owner_id)
        await importantPanic("USER NOT FOUND")
      }

      if (inSelfTree) {
        thirdSponsorsTree.self_tree_positions[`${owner_id}`].has_saleAccount = true
        thirdSponsorsTree.self_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        thirdSponsorsTree.self_tree_positions[`${owner_id}`].title = 1
        thirdSponsorsTree.changed('self_tree_positions', true)
        console.log('third sponsors tree changed')
       // await locker.lockAndWait(`invitation-${thirdSponsorsTree.sale_account_id}`, 60 * 1000)
        await thirdSponsorsTree.save()
      //  await locker.unlock(`invitation-${thirdSponsorsTree.sale_account_id}`)
      }
      else if (inUnassignedTree) {
        thirdSponsorsTree.unassigned_tree_positions[`${owner_id}`].has_saleAccount = true
        thirdSponsorsTree.unassigned_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        thirdSponsorsTree.unassigned_tree_positions[`${owner_id}`].title = 1
        thirdSponsorsTree.changed('unassigned_tree_positions', true)
        console.log('third sponsors tree changed')
      //  await locker.lockAndWait(`invitation-${thirdSponsorsTree.sale_account_id}`, 60 * 1000)
        await thirdSponsorsTree.save()
      //  await locker.unlock(`invitation-${thirdSponsorsTree.sale_account_id}`)
      }
    }
    if (realSponsors && realSponsors.level4) {
      const fourthSponsorsTree = await invitation.findOne({ where: { sale_account_id: realSponsors.level4 } })
      const inSelfTree = !!fourthSponsorsTree?.self_tree_positions?.[owner_id]
      const inUnassignedTree = !!fourthSponsorsTree?.unassigned_tree_positions?.[owner_id]
      if(!fourthSponsorsTree.self_tree_positions || !fourthSponsorsTree.unassigned_tree_positions){
        await noInvitation(realSponsors.level4,invitation,saleAccount,sponsors)
      }
      if(!inSelfTree && !inUnassignedTree){
        await checkAndSolveProblems(owner_id)
        await importantPanic("USER NOT FOUND")
      }
      
      if (inSelfTree) {
        fourthSponsorsTree.self_tree_positions[`${owner_id}`].has_saleAccount = true
        fourthSponsorsTree.self_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        fourthSponsorsTree.self_tree_positions[`${owner_id}`].title = 1
        fourthSponsorsTree.changed('self_tree_positions', true)
        //await locker.lockAndWait(`invitation-${fourthSponsorsTree.sale_account_id}`, 60 * 1000)
        await fourthSponsorsTree.save()
        //await locker.unlock(`invitation-${fourthSponsorsTree.sale_account_id}`)
      }
      if (inUnassignedTree) {
        fourthSponsorsTree.unassigned_tree_positions[`${owner_id}`].has_saleAccount = true
        fourthSponsorsTree.unassigned_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        fourthSponsorsTree.unassigned_tree_positions[`${owner_id}`].title = 1
        fourthSponsorsTree.changed('unassigned_tree_positions', true)
        console.log('fourth sponsors tree changed')
       // await locker.lockAndWait(`invitation-${fourthSponsorsTree.sale_account_id}`, 60 * 1000)
        await fourthSponsorsTree.save()
        //await locker.unlock(`invitation-${fourthSponsorsTree.sale_account_id}`)
      }
    }
    if (realSponsors && realSponsors.level5) {
      const fifthSponsorsTree = await invitation.findOne({ where: { sale_account_id: realSponsors.level5 } })
      const inSelfTree = !!fifthSponsorsTree?.self_tree_positions?.[owner_id]
      const inUnassignedTree = !!fifthSponsorsTree?.unassigned_tree_positions?.[owner_id]
      if(!fifthSponsorsTree.self_tree_positions || !fifthSponsorsTree.unassigned_tree_positions){
        await noInvitation(realSponsors.level5,invitation,saleAccount,sponsors)
      }
      if(!inSelfTree && !inUnassignedTree){
        await checkAndSolveProblems(owner_id)
        await importantPanic("USER NOT FOUND")
      }

      if (inSelfTree) {
        const fifthSponsorsTreePositions = fifthSponsorsTree.self_tree_positions
        fifthSponsorsTree.self_tree_positions[`${owner_id}`].has_saleAccount = true
        fifthSponsorsTree.self_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        fifthSponsorsTree.self_tree_positions[`${owner_id}`].title = 1
        fifthSponsorsTree.changed('self_tree_positions', true)
        console.log('fifth sponsors tree changed')
        //await locker.lockAndWait(`invitation-${fifthSponsorsTree.sale_account_id}`, 60 * 1000)
        await fifthSponsorsTree.save()
        //await locker.unlock(`invitation-${fifthSponsorsTree.sale_account_id}`)
      }
      else if (inUnassignedTree) {
        fifthSponsorsTree.unassigned_tree_positions[`${owner_id}`].has_saleAccount = true
        fifthSponsorsTree.unassigned_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        fifthSponsorsTree.unassigned_tree_positions[`${owner_id}`].title = 1
        fifthSponsorsTree.changed('unassigned_tree_positions', true)
        console.log('fifth sponsors tree changed')
        //await locker.lockAndWait(`invitation-${fifthSponsorsTree.sale_account_id}`, 60 * 1000)
        await fifthSponsorsTree.save()
        //await locker.unlock(`invitation-${fifthSponsorsTree.sale_account_id}`)
      }
    }
    if (realSponsors && realSponsors.level6) {
      const sixthSponsorsTree = await invitation.findOne({ where: { sale_account_id: realSponsors.level6 } })
      const inSelfTree = !!sixthSponsorsTree.self_tree_positions[owner_id]
      const inUnassignedTree = !!sixthSponsorsTree.unassigned_tree_positions[owner_id]
      if(!sixthSponsorsTree.self_tree_positions || !sixthSponsorsTree.unassigned_tree_positions){
        await noInvitation(realSponsors.level6,invitation,saleAccount,sponsors)
      }
      if(!inSelfTree && !inUnassignedTree){
        await checkAndSolveProblems(owner_id)
        await importantPanic("USER NOT FOUND")
      }

      await locker.lockAndWait(`invitation-${sixthSponsorsTree.id}`, 60 * 1000)
      if (inSelfTree) {
        sixthSponsorsTree.self_tree_positions[`${owner_id}`].has_saleAccount = true
        sixthSponsorsTree.self_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        sixthSponsorsTree.self_tree_positions[`${owner_id}`].title = 1
        sixthSponsorsTree.changed('self_tree_positions', true)
        console.log('sixth sponsors tree changed')
        //await locker.lockAndWait(`invitation-${sixthSponsorsTree.sale_account_id}`, 60 * 1000)
        await sixthSponsorsTree.save()
        //await locker.unlock(`invitation-${sixthSponsorsTree.sale_account_id}`)
      }
      else if (inUnassignedTree) {
        sixthSponsorsTree.unassigned_tree_positions[`${owner_id}`].has_saleAccount = true
        sixthSponsorsTree.unassigned_tree_positions[`${owner_id}`].saleAccount_id = mysaleAccount.id
        sixthSponsorsTree.unassigned_tree_positions[`${owner_id}`].title = 1
        sixthSponsorsTree.changed('unassigned_tree_positions', true)
        console.log('sixth sponsors tree changed')
        //await locker.lockAndWait(`invitation-${sixthSponsorsTree.sale_account_id}`, 60 * 1000)
        await sixthSponsorsTree.save()
        //await locker.unlock(`invitation-${sixthSponsorsTree.sale_account_id}`)
      }
    }
  })

  saleAccount.afterCreate(async (mysaleAccount, options) => {
    
    await invitation.create({ sale_account_id: mysaleAccount.id, id: mysaleAccount.invitation}).then(async (res) => {
      const currentPoint1 = res.self_tree_positions[`${mysaleAccount.owner_id}`]?.point1 || 0
      res.self_tree_positions[`${mysaleAccount.owner_id}`] = {
        has_saleAccount: true,
        saleAccount_id: mysaleAccount.id,
        level: 0,
        balance: 0,
        point1: currentPoint1,
        position: 0,
        changeable: false,
      }
      console.log("here");
      res.changed('self_tree_positions', true)
      await locker.lockAndWait(`invitation-${res.sale_account_id}`, 60 * 1000)
      await res.save()
      await locker.unlock(`invitation-${res.sale_account_id}`)
    },
    ).catch(async (err) => {
      await tryCreatingAgain(mysaleAccount,invitation)
    },
    )
    const sponsor = await sponsors.findOne({ where: { owner_id: mysaleAccount.owner_id } }).catch(async err => importantPanic(err))
    if(!sponsor){
      await noSponsors(mysaleAccount.owner_id,sponsors,saleAccount)
    }

  })

  // Dont change
  saleAccount.beforeUpdate(async (mysaleAccount, options) => {
    try{
      if (mysaleAccount.changed('self_gained_point1')) {
        if (mysaleAccount.point1 < 0)
          mysaleAccount.set({ point1: 0 })
  
        if (mysaleAccount.point2 < 0)
          mysaleAccount.set({ point2: 0 })
  
        if (mysaleAccount.point3 < 0)
          mysaleAccount.set({ point3: 0 })
  
        if (mysaleAccount.registered_user < 0)
          mysaleAccount.set({ registered_user: 0 })
  
        // BUFFER OVERFLOW PROTECTION
        if (mysaleAccount.point1 > 10000000)
          mysaleAccount.set({ point1: 10000000 })
  
        if (mysaleAccount.point2 > 10000000)
          mysaleAccount.set({ point2: 10000000 })
  
        if (mysaleAccount.point3 > 10000000)
          mysaleAccount.set({ point3: 10000000 })
  
        let updated = false
  
        if (mysaleAccount.self_gained_point1 >= 50 && !mysaleAccount.active) {
          mysaleAccount.set({ active: true })
          updated = true
  
        }
        else if (mysaleAccount.self_gained_point1 < 50 && mysaleAccount.active) {
          mysaleAccount.set({ active: false })
          updated = true  
        }
  
        if (updated) {
          await locker.lockAndWait(`saleAccount-${mysaleAccount.id}`, 60 * 1000)
          await mysaleAccount.save()
          await locker.unlock(`saleAccount-${mysaleAccount.id}`)
        }
      }
    }
    catch(err){
      await importantPanic(err)
    }
  })

  return saleAccount
}

export default saleAccount
