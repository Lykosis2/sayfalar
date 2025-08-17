import changeAndAddSponsors from './changeAndAddSponsors'
import changeLevelToSix from './changeLevelToSix'

export default async function finaAddedList(level, documentedUsersTree) {
  console.log(level)
  console.log(documentedUsersTree)
  switch (level) {
    case 'level1':
      const level6 = documentedUsersTree.level6 ?? {}
      if (Object.keys(level6).length > 0) {
        const returnVal = await changeLevelToSix(level6)
        console.log(returnVal)
        return returnVal
      }
      return {}
    case 'level2':
      const level5 = documentedUsersTree.level5 ?? {}
      console.log(level5)
      if (Object.keys(level5).length > 0) {
        const returnVal = await changeLevelToSix(level5)
        console.log(returnVal)
        return returnVal
      }
      return {}
    case 'level3':
      const level4 = documentedUsersTree.level4 ?? {}
      console.log(level4)
      if (Object.keys(level4).length > 0) {
        const returnVal = await changeLevelToSix(level4)
        console.log(returnVal)

        return returnVal
      }
      return {}
    case 'level4':
      const level3 = documentedUsersTree.level3 ?? {}
      console.log(level3)
      if (Object.keys(level3).length > 0) {
        const returnVal = await changeLevelToSix(level3)
        console.log(returnVal)

        return returnVal
      }
      return {}
    case 'level5':
      const level2 = documentedUsersTree.level2 ?? {}
      console.log(level2)
      console.log(Object.keys(level2).length)
      if (Object.keys(level2).length > 0) {
        const returnVal = await changeLevelToSix(level2)
        console.log(returnVal)

        return returnVal
      }
      return {}
    case 'level6':
      const level1 = documentedUsersTree.level1 ?? {}
      console.log(level1)
      if (Object.keys(level1).length > 0) {
        const returnVal = await changeLevelToSix(level1)
        console.log(returnVal)

        return returnVal
      }
      return {}
    default:
      console.log('ola')
      console.log(level)
      return {}
  }
}
