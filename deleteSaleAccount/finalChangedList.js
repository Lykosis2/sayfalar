import importantPanic from "../errorHandle/importantPanic";

export default async function finalChangedList(level, documentedUsersTree) {
  console.log(level);
  console.log(documentedUsersTree);
  try{

    switch (level) {
      case 'level1':
        const level1 = Object.keys(documentedUsersTree.level1) ?? []
        const level2 = Object.keys(documentedUsersTree.level2) ?? []
        const level3 = Object.keys(documentedUsersTree.level3) ?? []
        const level4 = Object.keys(documentedUsersTree.level4) ?? []
        const level5 = Object.keys(documentedUsersTree.level5) ?? []
        console.log(level1)
        return [...level1, ...level2, ...level3, ...level4, ...level5]
      case 'level2':
        const llevel1 = Object.keys(documentedUsersTree.level1) ?? []
        const llevel2 = Object.keys(documentedUsersTree.level2) ?? []
        const llevel3 = Object.keys(documentedUsersTree.level3) ?? []
        const llevel4 = Object.keys(documentedUsersTree.level4) ?? []
        console.log(llevel1)
        return [...llevel1, ...llevel2, ...llevel3, ...llevel4]
      case 'level3':
        const lllevel1 = Object.keys(documentedUsersTree.level1) ?? []
        const lllevel2 = Object.keys(documentedUsersTree.level2) ?? []
        const lllevel3 = Object.keys(documentedUsersTree.level3) ?? []
        return [...lllevel1, ...lllevel2, ...lllevel3]
      case 'level4':
        const llllevel1 = Object.keys(documentedUsersTree.level1) ?? []
        const llllevel2 = Object.keys(documentedUsersTree.level2) ?? []
        return [...llllevel1, ...llllevel2]
      case 'level5':
        const lllllevel1 = Object.keys(documentedUsersTree.level1) ?? []
        return [...lllllevel1]
      default:
        return []
    }
  }
  catch(err){

    console.log(err)
    await importantPanic(err)
    return []
  }
}
