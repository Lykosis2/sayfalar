export default async function documentUsersSponsors(sponsors) {
  /*
    retuned value should be like
    {level1:sponsorid,
    level2:sponsorid,
    level3:sponsorid,
    level4:sponsorid,
    level5:sponsorid,
    level6:sponsorid}

    */
  const returnObject = {
    level1: sponsors.level1 ?? null,
    level2: sponsors.level2 ?? null,
    level3: sponsors.level3 ?? null,
    level4: sponsors.level4 ?? null,
    level5: sponsors.level5 ?? null,
    level6: sponsors.level6 ?? null,

  }
  return returnObject
}
