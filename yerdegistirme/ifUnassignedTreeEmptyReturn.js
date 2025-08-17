export default async function ifUnassignedTreeEmptyReturn(unassigned_tree_positions) {
  console.log(unassigned_tree_positions)
  if (Object.keys(unassigned_tree_positions).length <= 0) {
    console.log('unassigned_tree_positions is empty')
    console.log(unassigned_tree_positions)
    return true
  }
  else {
    console.log('unassigned_tree_positions is not empty')
    return false
  }
}
