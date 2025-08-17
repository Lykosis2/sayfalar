import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const userBonusJoinTable = function () {
  const userBonusJoinTable = sequelize.define('user_bonus_join_table', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    bonuses_and_conditions: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
      defaultValue: {

      },
    },
    missions_and_conditions: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        default: {
          user_join: {
            level: 1,
            general_user: 10,
          },
          gain_point: {
            level: 1,
            general_point: 100,
          },
        },
        custom: {

          // Example: 1:{ location: "istanbul", time: "2020-12-12 12:12:12" }

        },
      },

    },

  })

  return userBonusJoinTable
}
export default userBonusJoinTable
