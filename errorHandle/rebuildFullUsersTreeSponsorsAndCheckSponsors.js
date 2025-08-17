import Sponsors from "../../models/sponsors";
import User from "../../models/user";
import informTheAdmin from "./informTheAdmin";


const user = User();
const sponsors = Sponsors();
export default async function rebuildFullUsersTreeSponsorsAndCheckSponsors(saleAccount, levelValues, owner_id, invitation) {
    const foundUser = await user.findOne({ where: { id: owner_id } }).catch(async err => {
        console.log(err);
        await informTheAdmin(err, "rebuildFullUsersTreeSponsorsAndCheckSponsors")
        return false
    })
    if (!foundUser) {
        await informTheAdmin(err, "rebuildFullUsersTreeSponsorsAndCheckSponsors")
        return false    
    }
    const sponsorsOfUser = await sponsors.findOne({ where: { owner_id: owner_id } }).catch(async err => {
        console.log(err);
        await informTheAdmin(err, "rebuildFullUsersTreeSponsorsAndCheckSponsors")
        return false
    }
    )
    if (!sponsorsOfUser) {
        await createNon
        return false
    }

}