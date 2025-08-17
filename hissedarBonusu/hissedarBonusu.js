import { Op } from 'sequelize'
import changeMonthsInHissedarBonusu from '../bonuslar/changeMonthsInHissedarBonusuorPay'
import minioClient from '../providers/minio'
import sequelize from '../../components/DatabaseReferance'

// HALIL TODO : CALL THIS ONCE A MONTH MAKE LOCKS AND UNLOCKS HALIL
export default async function giveHissedarBonusu(HissedarBonusu, UserWeeklyMonthlyTable,SaleAccount) {
  const totalPrice = await changeMonthsInHissedarBonusu(HissedarBonusu)
  console.log(totalPrice)
  const users = {}
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  oneMonthAgo.setHours(0, 0, 0, 0)
  const top10Users = await sequelize.query(`
  SELECT * FROM (
    SELECT *, 
           RANK() OVER (PARTITION BY user_id ORDER BY real_point1 DESC) as user_rank
    FROM user_weekly_monthly_tables
    WHERE date >= :oneMonthAgo
  ) as ranked
  WHERE user_rank = 1
  ORDER BY real_point1 DESC
  LIMIT 10
`, {
  replacements: { oneMonthAgo: oneMonthAgo },
  model: UserWeeklyMonthlyTable,
  mapToModel: true // This ensures the results are mapped to the model
}).catch(err => console.log(err));
  console.log(top10Users)
  let totalPoint1 = 0
  const toPay = {}
  await Promise.all(
    top10Users.map((user) => {
      console.log(user.saleAccount_id);
      users[[user.saleAccount_id]] = user.real_point1
      totalPoint1 += user.real_point1
    }),
  )
  await Promise.all(
    Object.keys(users).map(async(user) => {
      const usersSaleAccount = await SaleAccount.findOne({ where: { id: user } })
      toPay[user] = {price: totalPoint1 !== 0 ? (users[user] / totalPoint1) * totalPrice : 0,iban:!usersSaleAccount?.IBAN?"":usersSaleAccount.IBAN}
    }),
  )

  await minioClient.putObject(process.env.MINIO_BUCKET_PRIVATE, 'bonus/hissedarBonusu/this_months.csv', JSON.stringify(toPay))
  return true
}
