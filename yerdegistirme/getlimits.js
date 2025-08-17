import informTheAdmin from '../errorHandle/informTheAdmin'
import findLeftSideOfTree from '../findLeftSideOfTree'
import findSmallBranch from '../findSmallBranch'
import findWhichPositionAvailable from '../findWhichPositionAvailable'
import findAllPositions from './findAllPositions'
import User from '@/models/user'

// Optimize this function
export default async function getLimits(tree) {
  const user = User()
  try{

    const getPositions = await findAllPositions(tree)
    const result = await findWhichPositionAvailable(getPositions)
    const leftSide = []
    const rightSide = []
    const leftSideChangeables = []
    const rightSideChangeables = []
    const changeAbles = []
    const leftSideCalculate = async () => {
      return new Promise((resolve, reject) => {
        for (const a in result) {
          if (findLeftSideOfTree(result[a]))
            leftSide.push(result[a])
        }
        resolve()
      })
    }
    await leftSideCalculate()
  
    const rightSideCalculate = async () => {
      return new Promise((resolve, reject) => {
        result.forEach((item) => {
          if (!leftSide.includes(item))
            rightSide.push(item)
        })
        resolve(true)
      })
    }
    await rightSideCalculate()
    const res = findSmallBranch(tree)
    console.log(res)
    await Promise.all(
      Object.keys(tree).map(async (key) => {
        console.log(tree[key].position)
        if (tree[key].changeable) {
          if (findLeftSideOfTree(tree[key].position)) {
            console.log(key)
  
            const name = (await user.findByPk(key)).dataValues.name
            console.log(name)
            leftSideChangeables.push({ ...tree[key], ...{ id: key, name } })
          }
          else {
            console.log(key)
            const name = await (await user.findByPk(key)).dataValues.name
            console.log(name)
            rightSideChangeables.push({ ...tree[key], ...{ id: key, name } })
          }
          changeAbles.push({ ...tree[key], ...{ id: key } })
        }
      }),
    )
    console.log(rightSideChangeables)
    console.log(leftSideChangeables)
  
    if (res[2])
      return { bigSide: leftSide.length, smallSide: rightSide.length, changeAbles, bigSideChangeables: leftSideChangeables, shortSideChangeables: rightSideChangeables, positions: getPositions.sort((a, b) => b - a) }
  
    return { bigSide: rightSide.length, smallSide: leftSide.length, changeAbles, bigSideChangeables: rightSideChangeables, shortSideChangeables: leftSideChangeables, positions: getPositions.sort((a, b) => b - a) }
  }
  catch(e){
    console.log(e)
    await informTheAdmin(e,'getLimits')
    return { bigSide: 0, smallSide: 0, changeAbles: [], bigSideChangeables: [], shortSideChangeables: [], positions: [] }
  }
}
