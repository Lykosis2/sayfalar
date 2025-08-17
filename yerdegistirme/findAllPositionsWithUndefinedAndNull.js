export default async function findAllPositionsWithUndefinedAndNull(self_tree_positions) {
  const positionArray = []
  for (const key in self_tree_positions) {
    if (typeof self_tree_positions[key].position === 'number')
      positionArray.push(self_tree_positions[key].position)
  }
  return positionArray
}
