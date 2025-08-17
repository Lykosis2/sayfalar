export default async function checkInput(userInvitation, changed) {
  console.log(changed)
  const result = changed.every((element) => {
    console.log(element)
    console.log(userInvitation.self_tree_positions[element.id].position)
    console.log(element.position)
    return userInvitation.self_tree_positions[element.id].position === element.position
  })
  return result
}
