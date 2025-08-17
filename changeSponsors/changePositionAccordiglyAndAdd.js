import locker from '@/lib/providers/locker'

export default async function changePositionAccordiglyAndAdd(randomSirkethesabi, userAsTree, userId) {
  randomSirkethesabi.unassigned_tree_positions[userId] = userAsTree
  randomSirkethesabi.changed('unassigned_tree_positions', true)
  // await randomSirkethesabi.save().catch(err => console.log(err))
}
