export default async function findAllPositions(self_tree_positions) {
  const positionArray = []
  for (const key in self_tree_positions) {
    console.log(self_tree_positions[key].position)
    if (typeof self_tree_positions[key].position === 'number')
      positionArray.push(self_tree_positions[key].position)
  }
  console.log(positionArray)
  return positionArray
}
