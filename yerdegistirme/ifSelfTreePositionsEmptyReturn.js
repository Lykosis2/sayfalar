export default async function ifSelfTreePositionsEmptyReturn(self_tree_positions) {
  if (Object.keys(self_tree_positions).length <= 0)
    return true
  else
    return false
}
