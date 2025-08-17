import locker from "./providers/locker";
import redis from "./providers/redis"

export default async function getImportantPanic() {
    const locks = await locker.showAllLocks()
    console.log(locks);
    const val = await locker.isLocked('importantpanic')
    console.log(val);

    return val
}