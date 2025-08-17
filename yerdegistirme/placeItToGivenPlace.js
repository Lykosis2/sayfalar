export default async function placeItToGivenPlace(invitation, place) {
  for (const key in invitation.unassigned_tree_positions) {
    invitation.unassigned_tree_positions[key].position = place
    if (key) {
      invitation.self_tree_positions = { ...invitation.self_tree_positions, ...invitation.unassigned_tree_positions }
      invitation.unassigned_tree_positions = {} // TODO CHECK THIS PART
      invitation.changed('self_tree_positions', true)
      invitation.changed('unassigned_tree_positions', true)
      await invitation.save()
    }
  }
  return place
}
