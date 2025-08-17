export default async function documentedUsersTree(usersTree) {
  /*
    returned value should be like
    {level1:{},level2:{},level3:{},level4:{},level5:{},level6:{}} //
    */
  const returnObject = {
    level1: {},
    level2: {},
    level3: {},
    level4: {},
    level5: {},
    level6: {},
  }
  // make this async
  Object.keys(usersTree.self_tree_positions).forEach(async (key) => {
    const level = usersTree.self_tree_positions[key].level
    if (returnObject[`level${level}`] === undefined) {
      returnObject[`level${level}`] = {}
      returnObject[`level${level}`][key] === undefined ? returnObject[`level${level}`][key] = {} : null
    }

    returnObject[`level${level}`][key] = usersTree.self_tree_positions[key]
  })

  return returnObject
}
