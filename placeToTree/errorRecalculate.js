import findLeftSideOfTree from '../findLeftSideOfTree'
import findMax from '../findMax'
import findWhichPositionAvailable from '../findWhichPositionAvailable'

export default async function errorRecalculate(problemArray, positionArray, IsLeftBig) {
  const keyArray = problemArray
  const countOfKeys = keyArray.length
  let totalEmptyPositions = await findWhichPositionAvailable(positionArray)
  let finalPositions = []
  while (finalPositions.length < countOfKeys) {
    const tempList = []

    if (IsLeftBig) {
      for (const value of totalEmptyPositions.reverse()) {
        if (finalPositions.length + tempList.length >= countOfKeys) {
          finalPositions = [...finalPositions, ...tempList]
          // console.log(finalPositions);
          return finalPositions
        }
        if (findLeftSideOfTree(value))
          tempList.push(value)

        else
          tempList.unshift(value)
      }
      // totalEmptyPositions.reverse().forEach((value)=>{
      //     if(finalPositions.length + tempList.length >= countOfKeys){
      //         return
      //     }
      //     if(findLeftSideOfTree(value)){
      //          tempList.push(value)
      //     }
      //     else{
      //         tempList.unshift(value)
      //     }
      // })
    }
    else {
      for (const value of totalEmptyPositions) {
        if (finalPositions.length + tempList.length >= countOfKeys) {
          finalPositions = [...finalPositions, ...tempList]
          // console.log(finalPositions);
          return finalPositions
        }
        if (findLeftSideOfTree(value))
          tempList.unshift(value)

        else
          tempList.push(value)
      }
      // totalEmptyPositions.forEach((value)=>{
      //     if(finalPositions.length + tempList.length >= countOfKeys){
      //         return
      //     }
      //     if(findLeftSideOfTree(value)){
      //         tempList.unshift(value)
      //     }
      //     else{
      //         tempList.push(value)
      //     }
      // })
    }
    finalPositions = [...finalPositions, ...tempList]
    tempList.length = 0
    if (finalPositions.length + tempList.length >= countOfKeys) {
      // console.log(finalPositions);
      return finalPositions
    }
    const max = findMax([...positionArray, ...totalEmptyPositions])
    const closestPowerOf2 = 2 ** Math.ceil(Math.log2(max + 3))
    const targetVal = closestPowerOf2 - 2
    const newArray = Array.from({ length: targetVal - max }, (_, index) => max + index + 1)
    totalEmptyPositions = [...newArray]
  }
  return []
}
