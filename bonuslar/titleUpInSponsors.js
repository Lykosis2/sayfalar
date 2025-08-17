import locker from '../providers/locker'
import documentUsersSponsors from './uye/documentUsersSponsor'

// Test this
export default async function titleUpInSponsors(owner_id, sponsors, invitation, updatedTitle) {
  const documentedSponsors = await documentUsersSponsors(sponsors)
  console.log(documentedSponsors)
  await Promise.all(
    Object.keys(documentedSponsors).map(async (sponsor) => {
      console.log(!documentedSponsors[sponsor])
      if (!documentedSponsors[sponsor])
        return
      console.log(documentedSponsors)
      console.log(documentedSponsors[sponsor])
      console.log(sponsor)

      const sponsorsAccount = await invitation.findOne({ where: { sale_account_id: documentedSponsors[sponsor] } })
      sponsorsAccount.self_tree_positions[owner_id].title = updatedTitle
      await locker.lockAndWait(`invitation-${sponsorsAccount.id}`, 60 * 1000)
      sponsorsAccount.changed('self_tree_positions', true)
      await locker.unlock(`invitation-${sponsorsAccount.id}`)
      await sponsorsAccount.save()
    }),
  )
}
