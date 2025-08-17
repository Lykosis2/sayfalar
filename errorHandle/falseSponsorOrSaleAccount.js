import rebuildFullUsersTreeSponsorsAndCheckSponsors from "./rebuildFullUsersTreeSponsorsAndCheckSponsors"

export default async function falseSponsorOrSaleAccount(err, saleAccount, levelValues, owner_id, invitation,errorLayer) {
    switch (errorLayer) {
        case 0:
            return await rebuildFullUsersTreeSponsorsAndCheckSponsors(saleAccount, levelValues, owner_id, invitation)
        case 1:
            return await checkUsersSponsorTableAndSponsorsTree(saleAccount, levelValues, owner_id, invitation,1)
        case 2:
            return await checkUsersSponsorTableAndSponsorsTree(saleAccount, levelValues, owner_id, invitation,2)
        case 3:
            return await checkUsersSponsorTableAndSponsorsTree(saleAccount, levelValues, owner_id, invitation,3)
        case 4:
            return await checkUsersSponsorTableAndSponsorsTree(saleAccount, levelValues, owner_id, invitation,4)
        case 5:
            return await checkUsersSponsorTableAndSponsorsTree(saleAccount, levelValues, owner_id, invitation,5)
        case 6:
            return await checkUsersSponsorTableAndSponsorsTree(saleAccount, levelValues, owner_id, invitation,6)
        default:
            return await rebuildFullUsersTreeSponsorsAndCheckSponsors(saleAccount, levelValues, owner_id, invitation)

    }

}