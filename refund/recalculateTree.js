import importantPanic from "../errorHandle/importantPanic"
import findSmallBranch from "../findSmallBranch"
import locker from "../providers/locker"
import recalculateDoneCorrectly from "./recalculateDoneCorrectly"
import recalculateEslestirmeBonusu from "./recalculateEslestirmeBonusu"
import recalculateKariyerBonusu from "./recalculateKariyerBonusu"
import recalculateLiderlikBonusu from "./recalculateLiderlikBonusu"

//Last part handle this part and test this part 
export default async function recalculateTree(usersWeeklyMonthlyTable,usersSaleAccount){
    if(!usersWeeklyMonthlyTable) return false
    if(!usersSaleAccount) return false
    const start = performance.now()
    console.log(usersSaleAccount.owner_id);
    const sum = Object.values(usersWeeklyMonthlyTable.self_tree_positions).reduce((a,b)=>a+b.point1,0)
    console.log(sum);
    if(usersWeeklyMonthlyTable.self_gained_point1 < 50) {
        usersWeeklyMonthlyTable.active = false
        usersSaleAccount.last_months_active = false
        usersSaleAccount.last_months_self_gained_point1 = usersWeeklyMonthlyTable.self_gained_point1
        await locker.lockAndWait(`saleAccount-${usersSaleAccount.id}`, 60 * 1000)
        await usersSaleAccount.save()
        await locker.unlock(`saleAccount-${usersSaleAccount.id}`)

        await locker.lockAndWait(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`, 60 * 1000)
        await usersWeeklyMonthlyTable.save()
        await locker.unlock(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`)
        return false
    }
    console.log(usersWeeklyMonthlyTable.self_tree_positions[usersSaleAccount.owner_id]);
    if(usersWeeklyMonthlyTable.self_tree_positions[usersSaleAccount.owner_id].point1 < 100) {
        usersWeeklyMonthlyTable.active = false
        usersSaleAccount.last_months_active = false
        usersSaleAccount.last_months_self_gained_point1 = usersWeeklyMonthlyTable.self_gained_point1

        await locker.lockAndWait(`saleAccount-${usersSaleAccount.id}`, 60 * 1000)
        await usersSaleAccount.save()
        await locker.unlock(`saleAccount-${usersSaleAccount.id}`)

        await locker.lockAndWait(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`, 60 * 1000)
        await usersWeeklyMonthlyTable.save()
        await locker.unlock(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`)

        return false
    }
    const self_tree_positions = usersWeeklyMonthlyTable.self_tree_positions
    const points  = findSmallBranch(self_tree_positions)
    
    if (points[2]) {
        usersWeeklyMonthlyTable.real_point1 = points[0] * 0.4 + points[1] * 0.6 + points[3]
        console.log(points[0] * 0.4 + points[1] * 0.6 + points[3]);
        console.log(usersSaleAccount.last_months_real_point1);
        usersSaleAccount.last_months_real_point1 = points[0] * 0.4 + points[1] * 0.6 + points[3]
        console.log(usersSaleAccount.last_months_real_point1);
        await locker.lockAndWait(`saleAccount-${usersSaleAccount.id}`, 60 * 1000)
        await usersSaleAccount.save()
        await locker.unlock(`saleAccount-${usersSaleAccount.id}`)

        await locker.lockAndWait(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`, 60 * 1000)
        await usersWeeklyMonthlyTable.save()
        await locker.unlock(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`)
    }
       else {
        usersWeeklyMonthlyTable.real_point1 = points[0] * 0.6 + points[1] * 0.4 + points[3]
        console.log(usersSaleAccount.last_months_real_point1);
        usersSaleAccount.last_months_real_point1 = points[0] * 0.6 + points[1] * 0.4 + points[3]
        console.log(usersSaleAccount.last_months_real_point1);

        await locker.lockAndWait(`saleAccount-${usersSaleAccount.id}`, 60 * 1000)
        await usersSaleAccount.save()
        await locker.unlock(`saleAccount-${usersSaleAccount.id}`)

        await locker.lockAndWait(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`, 60 * 1000)
        await usersWeeklyMonthlyTable.save()
        await locker.unlock(`userWeeklyMonthlyTable-${usersWeeklyMonthlyTable.id}`)
    }

    const recalculatedEslestirmeBonusu = await recalculateEslestirmeBonusu(usersSaleAccount, usersWeeklyMonthlyTable)
    console.log(recalculatedEslestirmeBonusu)

  const recalculatedLiderlikBonusu = await recalculateLiderlikBonusu(usersSaleAccount, usersWeeklyMonthlyTable)
  console.log(recalculatedLiderlikBonusu)

  const recalculatedKariyerBonusu = await recalculateKariyerBonusu(usersSaleAccount, usersWeeklyMonthlyTable)
  console.log(recalculatedKariyerBonusu)

  const recalculatedDoneCorrectly = await recalculateDoneCorrectly(usersSaleAccount, usersWeeklyMonthlyTable)
  console.log(recalculatedDoneCorrectly)
   

  if(!recalculatedDoneCorrectly){
    await importantPanic("recalculate false")
  }


    }
