// TODO CHECK THIS PART
export default async function handleMultiplePlacementInTree(invitation, IsLeftSideBig) {
  // Take unassigned_tree_positions and self_tree_positions

  // IMPLEMENT THIS PART

  // let positionArray =await findAllPositions(invitation.self_tree_positions) // this is might working as well
  // const unassignedTreePositionsKeys= Object.keys(invitation.unassigned_tree_positions)
  // const size = unassignedTreePositionsKeys.length
  // console.log(positionArray);
  // let possiblePositions =await  findWhichPositionAvailable(positionArray)
  // console.log(possiblePositions);
  // let leftSide = []
  // let rightSide = []
  // const leftSideCalculate = async () => {
  //     return new Promise((resolve, reject) => {
  //       for (const a in possiblePositions) {
  //         if (findLeftSideOfTree(possiblePositions[a])) leftSide.push(possiblePositions[a])
  //         else rightSide.push(possiblePositions[a])
  //       }
  //       resolve()
  //     })
  //   }
  // await leftSideCalculate()

  //   console.log(leftSide);
  //   console.log(rightSide);
  //   await Promise.all(
  //       unassignedTreePositionsKeys.map(async(key)=>{
  //         if (possiblePositions.length <= 0) {
  //           possiblePositions = await findWhichPositionAvailable(positionArray)
  //         }

  //         await leftSideCalculate()
  //         console.log(leftSide);
  //         console.log(rightSide);
  //         console.log(possiblePositions);
  //         if(IsLeftSideBig){
  //             console.log(leftSide.length);
  //             console.log(rightSide.length);

  //             if(rightSide.length > 0){
  //                 const putObject = {...invitation.unassigned_tree_positions[key]}
  //                 console.log(putObject);
  //                 putObject.position = rightSide[0]
  //                 console.log(putObject);
  //                 invitation.self_tree_positions = {...invitation.self_tree_positions,...putObject}
  //                 console.log(rightSide);
  //                 rightSide.shift()
  //                 console.log(rightSide);
  //                 invitation.changed('self_tree_positions', true)
  //                 invitation.changed('unassigned_tree_positions', true)
  //                 console.log(putObject.position);
  //                 possiblePositions.splice(possiblePositions.indexOf(putObject.position), 1);
  //                 positionArray.push(putObject.position)
  //                 leftSide = []
  //                 rightSide = []

  //                 await invitation.save()

  //             }

  //             else if(leftSide.length > 0){

  //                 const putObject = {...invitation.unassigned_tree_positions[key]}
  //                 console.log(putObject);
  //                 putObject.position = leftSide[0]
  //                 invitation.self_tree_positions = {...invitation.self_tree_positions,...putObject}
  //                 console.log(putObject);
  //                 console.log(leftSide);
  //                 leftSide.shift()
  //                 console.log(leftSide);
  //                 invitation.changed('self_tree_positions', true)
  //                 invitation.changed('unassigned_tree_positions', true)
  //                 positionArray.push(putObject.position)
  //                 console.log(putObject.position);
  //                 possiblePositions.splice(possiblePositions.indexOf(putObject.position), 1);
  //                 leftSide = []
  //                 rightSide = []
  //                 await invitation.save()

  //             }

  //         }
  //         else{
  //             if(leftSide.length > 0){
  //                 const putObject = {...invitation.unassigned_tree_positions[key]}
  //                 putObject.position = leftSide[0]
  //                 invitation.self_tree_positions = {...invitation.self_tree_positions,...putObject}
  //                 leftSide.shift()
  //                 invitation.changed('self_tree_positions', true)
  //                 invitation.changed('unassigned_tree_positions', true)
  //                 positionArray.push(putObject.position)
  //                 console.log(putObject.position);
  //                 possiblePositions.splice(possiblePositions.indexOf(putObject.position), 1);
  //                 leftSide = []
  //                 rightSide = []

  //                 await invitation.save().catch((err)=>console.log(err))

  //             }
  //             else if(rightSide.length > 0){
  //                 const putObject = {...invitation.unassigned_tree_positions[key]}
  //                 putObject.position = rightSide[0]
  //                 invitation.self_tree_positions = {...invitation.self_tree_positions,...putObject}
  //                 rightSide.shift()
  //                 invitation.changed('self_tree_positions', true)
  //                 invitation.changed('unassigned_tree_positions', true)
  //                 positionArray.push(putObject.position)
  //                 console.log(putObject.position);
  //                 possiblePositions.splice(possiblePositions.indexOf(putObject.position), 1);
  //                 leftSide = []
  //                 rightSide = []

  //                 await invitation.save()

  //             }

  //         }
  //       })
  //   )

  // console.log(positionArray);
  // let availablePositions =await findWhichPositionAvailable(positionArray)
  // console.log(availablePositions);
  // console.log(invitation.unassigned_tree_positions);
  // Object.keys(invitation.unassigned_tree_positions).forEach((key,index)=>{
  //     invitation.unassigned_tree_positions[key].position = availablePositions[0]
  //     console.log(availablePositions[0])
  //     availablePositions = findWhichPositionAvailable([...positionArray,availablePositions[0]])
  //     invitation.self_tree_positions[key] = invitation.unassigned_tree_positions[key]
  //     invitation.unassigned_tree_positions[key] = null
  //     //userTreePositions = {...userTreePositions,...unassignedTreePositions[key]} // this is might working as well
  //     invitation.changed('self_tree_positions', true)
  //     invitation.changed('unassigned_tree_positions', true)
  //     invitation.save()
  // })

}
