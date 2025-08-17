import pLimit from "p-limit";
import flagedBehavior from "./flagedBehavior";
import locker from "./providers/locker";
import Invitation from "../models/invitation";
import sequelize from "../components/DatabaseReferance";
import saleAccount from "../models/saleAccount";

const invitation = Invitation()
const SaleAccount = saleAccount()
export default async function flagedBehaviorForAll() {
    const allLocks = await locker.showAllLocks()

    const foundLocks = allLocks.filter(lock=>lock.includes("flaged-")).map(lock=>lock.replace("flaged-",""))
    const findUnassignedTree = await sequelize.query(
        "SELECT * FROM `invitations` WHERE JSON_LENGTH(unassigned_tree_positions) > 0",
        { model: invitation, type: sequelize.QueryTypes.SELECT }
    );
    const lowerThanSelfPoint = await sequelize.query(
        "SELECT * FROM saleAccounts WHERE self_gained_point1 > real_point1",
        { model: SaleAccount, type: sequelize.QueryTypes.SELECT }
    );
    const lowerThanSelfPointIds = lowerThanSelfPoint.map(inv => inv.id); // Replace 'id' with the appropriate unique identifier

    const unassignedTreeIds = findUnassignedTree.map(inv => inv.sale_account_id); // Replace 'id' with the appropriate unique identifier

    const flagedLocks = Array.from(new Set([...foundLocks, ...unassignedTreeIds, ...lowerThanSelfPointIds]));
    const processLock = async (lock) => {
        await flagedBehavior(lock);
        await locker.unflag(lock);
    };


    const processAllLocks = async (flagedLocks) => {
        const limit = pLimit(1000);
        const limitedTasks = flagedLocks.map(lock => 
            limit(() => processLock(lock))
        );
        await Promise.all(limitedTasks);
    };
    processAllLocks(flagedLocks)
    .then(() => console.log('All locks processed concurrently'))
    .catch(error => console.error('An error occurred:', error));

}