import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const Invitation = function () {
  const start = performance.now()

  const Invitation = sequelize.define('invitation', {
    id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    sale_account_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },
    invitation_level1: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    invitation_level2: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    invitation_level3: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    invitation_level4: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    invitation_level5: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    invitation_level6: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    self_tree_positions: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},

    },
    unassigned_tree_positions: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    real_point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    // long_tree:{
    //   type:Sequelize.DataTypes.BOOLEAN,
    //   allowNull:false,
    //   defaultValue:false
    // },
    // long_tree_positions:{
    //   type:Sequelize.DataTypes.JSON,
    //   allowNull:false,
    //   defaultValue:false
    // },
    // short_tree_positions:{
    //   type:Sequelize.DataTypes.JSON,
    //   allowNull:false,
    //   defaultValue:false
    // }
  })
  Invitation.afterUpdate(async (invitation, options) => {
    if (invitation.changed('unassigned_tree_positions')) {
      // changes the position from null to 1 if it is the first one
      // console.log("triggered");
      // if (await ifUnassignedTreeEmptyReturn(invitation.unassigned_tree_positions)) {
      //   console.log('unassigned_tree_positions is empty');
      //   return
      // }

      // if (await ifSelfTreePositionsEmptyReturn(invitation.self_tree_positions)) {
      //   console.log('self_tree_positions is empty');
      //   placeFirstPosition(invitation)
      // }

      // // make it so assign it to a place automatically then make it so user can change it in 1 week
      // else {
      //   const positionArray = await findAllPositions(invitation.self_tree_positions)
      //   console.log(positionArray);
      //   const maxNumber = Math.max(...positionArray)
      //   console.log(maxNumber);

      //   // Make assesments accırding to the trees first 6 positions
      //   // BUG IN HERE TODO: FIX IT
      //   if (maxNumber < 6) {
      //     // handle more than 1 unassigned tree positions
      //     if(Object.keys(invitation.unassigned_tree_positions).length > 1){
      //       // handleMoreThanOneUnassignedTreePositions(invitation,positionArray)
      //       // implement this logic
      //       console.log("more than 1 unassigned tree positions");
      //       await handleMultiplePlacementInTree(invitation,positionArray)
      //       return
      //     }

      //     const position = Math.max(...positionArray) + 1
      //     const madeCorrectly = await placeFirstSixPositions(invitation,position)
      //     if(typeof madeCorrectly === "number"){
      //       console.log("placed in position " + position);
      //     }

      //     /* 4Test this part and make sure it works */
      //     const doneCorrect = await checkPositionsForTree(invitation,positionArray,madeCorrectly)
      //     // test this part
      //     if(!doneCorrect[0]){
      //      await handleDuplicatesOrNulls(invitation,positionArray,doneCorrect[1])
      //     }
      //     /* 4Test this part and make sure it works */

      //   }

      //   else {
      //     // KISA DALI BUL
      //     const kisaDal = findSmallBranch(invitation.self_tree_positions)
      //     console.log(kisaDal)
      //     // True ise saga
      //     if(Object.keys(invitation.unassigned_tree_positions).length > 1){
      //       // ERROR IN THIS PART
      //       console.log(positionArray);
      //       await handleMultiplePlacementInTree(invitation,kisaDal[2])
      //       return
      //     }

      //     if (kisaDal[2]) {
      //       console.log('sag')

      //       // Sagdaki bos olanları bul
      //       const result = await findWhichPositionsAvailable(positionArray)
      //       const rightSide = []
      //       for (const a in result) {
      //         if (!findLeftSideOfTree(result[a]))
      //           rightSide.push(result[a])
      //       }

      //       if (rightSide.length <= 0) {
      //         // Result[0] a koy
      //         //Sola koy sagda yer yok
      //         const placedPosition = await placeItToGivenPlace(invitation, result[0])
      //         console.log(placedPosition);
      //                   /* 4Test this part and make sure it works */

      //         const doneCorrect = await checkPositionsForTree(invitation,positionArray,placedPosition)
      //         if(!doneCorrect[0]){
      //           await handleDuplicatesOrNulls(invitation,positionArray,doneCorrect[1])
      //          }
      //     /* 4Test this part and make sure it works */

      //       }
      //       else {
      //         // rightSide[0] a koy
      //         const placedPosition = await placeItToGivenPlace(invitation, rightSide[0])
      //         console.log(placedPosition);
      //                   /* 4Test this part and make sure it works */

      //         const doneCorrect = await checkPositionsForTree(invitation,positionArray,placedPosition)
      //         if(!doneCorrect[0]){
      //           await handleDuplicatesOrNulls(invitation,positionArray,doneCorrect[1])
      //          }
      //                    /* 4Test this part and make sure it works */

      //       }
      //     }
      //     else {
      //       const result = await findWhichPositionsAvailable(positionArray)
      //       const leftSide = []
      //       const rightSide = []
      //       const leftSideCalculate = async () => {
      //         return new Promise((resolve, reject) => {
      //           for (const a in result) {
      //             if (findLeftSideOfTree(result[a]))
      //               leftSide.push(result[a])
      //           }
      //           resolve()
      //         })
      //       }
      //       await leftSideCalculate()

      //       const rightSideCalculate = async () => {
      //         return new Promise((resolve,reject)=>{
      //           result.forEach(item => {
      //             if (!leftSide.includes(item)) {
      //               rightSide.push(item);
      //             }
      //           });
      //           resolve(true)
      //         })
      //       }
      //       await rightSideCalculate()
      //       console.log(leftSide);

      //       if (leftSide.length > 0) {
      //         // leftSide[0] a koy
      //         const placedPosition = await placeItToGivenPlace(invitation, leftSide[0])
      //         console.log(placedPosition);
      //                   /* 4Test this part and make sure it works */

      //         const doneCorrect = await checkPositionsForTree(invitation,positionArray,placedPosition)
      //         console.log(doneCorrect);
      //         if(!doneCorrect[0]){
      //          // await handleDuplicatesOrNulls(invitation,positionArray,doneCorrect[1])
      //          console.log("helo");
      //          }
      //                    /* 4Test this part and make sure it works */

      //       }
      //       else {
      //         // rightSide[0] a koy
      //         const placedPosition = await placeItToGivenPlace(invitation, rightSide[0])
      //         console.log(placedPosition);
      //                   /* 4Test this part and make sure it works */

      //         const doneCorrect = await checkPositionsForTree(invitation,positionArray,placedPosition)
      //         console.log(doneCorrect);
      //         if(!doneCorrect[0]){
      //           await handleDuplicatesOrNulls(invitation,positionArray,doneCorrect[1])
      //          }
      //                    /* 4Test this part and make sure it works */

      //       }
      //     }

      //     // kISA DALDA EN KUCUK SAYIYA KOY
      //   }

      //   console.log(positionArray)
      // }

      // flag the tree
      // call unassignedToSelfAssigned
    }
  })
  Invitation.beforeUpdate(async (invitation, options) => {
    // DO THIS PART IN 15 MINUTES IF CHANGED
    // const SaleAccount = saleAccount()
    //  if (invitation.changed('self_tree_positions')) {
    //    console.log('self tree positions changed')
    //    const points = findSmallBranch(invitation.self_tree_positions)
    //    const saleAccoutofUser = await SaleAccount.findByPk(invitation.sale_account_id)
    //    if (points[2]) {
    //      saleAccoutofUser.real_point1 = points[0] * 0.4 + points[1] * 0.6 + points[3]
    //      await saleAccoutofUser.save()
    //    }
    //    else {
    //      saleAccoutofUser.real_point1 = points[0] * 0.6 + points[1] * 0.4 + points[3]
    //      await saleAccoutofUser.save()
    //    }
    //  }
  },

  )
  const end = performance.now()
  console.log(end - start)

  return Invitation
}

export default Invitation
