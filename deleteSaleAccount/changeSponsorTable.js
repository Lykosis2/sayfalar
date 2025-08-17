export default async function changeSponsorTable(saleAccount, sponsors, invitation) {
  /*
    Go to sponsors table of the saleAccount then get the ids of the sponsors
    then go to the sponsors table and delete the id from the sponsor table
    then go to the users self_tree_positions and get the ids then go to their sponsor table and change it depending on the upper sponsor and change their level
    and make sure if fullable make it full that means if 6th level sponsor has a sponsor if it becomes 5th level then make that sponsor 6th level
    and make sure sponsor tree is full if possible
    */

  const changedPositionSponsors = await getAllSponsorsDocumented()
  const changedPositionUsers = await getAllUsersDocumented()

  const allPositions = [...changeSponsorTable, ...changedPositionUsers]

  allPositions.forEach(async (user) => {
    const searchAndChangeSponsors = await changeSponsorsPlaces()
  })
}
