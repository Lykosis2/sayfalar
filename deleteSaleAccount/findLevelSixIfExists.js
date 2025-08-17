import checkAndSolveProblems from "../errorHandle/CheckTree/checkAndSolveProblems"
import importantPanic from "../errorHandle/importantPanic"

export default async function findLevelSixIfExist(sponsor, lastPersonInSponsorTree,foundSponsor) {

  if(lastPersonInSponsorTree === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || lastPersonInSponsorTree === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || lastPersonInSponsorTree === "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a") return null
  if(!foundSponsor){
    console.log("problem");
    await importantPanic("THERE IS A PROBLEM")
  }
  const returnSponsors = foundSponsor !== null ? foundSponsor.dataValues.level1: null

  return returnSponsors
}
