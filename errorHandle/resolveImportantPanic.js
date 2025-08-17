import locker from "../providers/locker";

export default async function resolveImportantPanic() {
    await locker.unlock("importantpanic")
    return
}