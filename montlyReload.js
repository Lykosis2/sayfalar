import { Sequelize } from 'sequelize'
import payValuesForEachUser from './payValuesToEachUser'

export default async function montlyCheck(SaleAccount, user_bonus_join_table) {
  await payValuesForEachUser(SaleAccount)
  SaleAccount.update({

    point1: 0,
    point2: 0,
    point3: 0,
    registered_user: 0,
    title: 0,
    confirmed_balance: Sequelize.col('unconfirmed_balance'),
    unconfirmed_balance: 0,

  }, {
    where: {},
    individualHooks: true,
  },
  ).then((numAffected) => {
    console.log(`Updated ${numAffected[0]} records.`)
  })
    .catch((err) => {
      console.error(err)
    })
  user_bonus_join_table.update({
    bonuses_and_conditions: {},
    missions_and_conditions: {},
  },
  {
    where: {},
  })
}
