export default async function changeDuplicatesPlaces(invitation, duplicateId, place) {
  console.log(duplicateId)
  console.log(invitation.self_tree_positions[duplicateId])
  invitation.self_tree_positions[duplicateId].position = place
  invitation.changed('self_tree_positions', true)
  await invitation.save()
  return place
}
