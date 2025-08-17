export default async function deleteFromOldTable(documentedSponsors, UserWeeklyMonthlyTable, deletedUserId) {
  await Promise.all(
    Object.keys(documentedSponsors).map(async (key) => {
      if (!documentedSponsors[key])
        return
      console.log(key)
      console.log(documentedSponsors[key])
      console.log(documentedSponsors)

      const sponsorsTree = await UserWeeklyMonthlyTable.findOne({
        where: {
          user_id: documentedSponsors[key],
          createdAt: {
            [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30)),
            // TODO MAKE SURE THIS WORKS
          },
        },
      })
      if (!sponsorsTree)
        return
      console.log(sponsorsTree)
      if (!sponsorsTree.self_tree_positions)
        return
      delete sponsorsTree.self_tree_positions[deletedUserId]
      sponsorsTree.changed('self_tree_positions', true)
      await sponsorsTree.save()
    }),
  )
}
