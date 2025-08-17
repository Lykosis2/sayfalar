import locker from "../providers/locker";
import informTheAdmin from "./informTheAdmin";
export default async function importantPanic(err) {
    // STOP EVERTHING IMMEDIATELY
    await locker.lock("importantpanic", 60 * 1000 * 60 * 24 * 365)
    // FIND ADMIN USER
    await informTheAdmin(err,"importantpanic")
    return
    
   
}
