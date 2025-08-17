export default async function placeFirstPosition(invitation) {
  for (const key in invitation.unassigned_tree_positions) {
    invitation.unassigned_tree_positions[key].position = 1

    invitation.self_tree_positions = { ...invitation.unassigned_tree_positions }
    invitation.unassigned_tree_positions = {}

    await invitation.save()
  }
}
