export default async function placeFirstSixPositions(invitation, position) {
  const processInvitation = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        // handle more than 1 unassigned tree positions
        if (Object.keys(invitation.unassigned_tree_positions).length > 1) {
          console.log('error')
          resolve(false)
        }
        // for 1 unassigned tree position
        for (const key in invitation.unassigned_tree_positions) {
          invitation.unassigned_tree_positions[key].position = position
          console.log(position)
          invitation.self_tree_positions = { ...invitation.self_tree_positions, ...invitation.unassigned_tree_positions }
          invitation.changed('self_tree_positions', true)
          invitation.unassigned_tree_positions = {}
          invitation.changed('unassigned_tree_positions', true)
          await invitation.save()
        }
        resolve(position)
      }
      catch (error) {
        reject(false)
      }
    })
  }
  return await processInvitation()
}
