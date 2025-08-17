import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const missionRewardsBonusesJointable = function () {
  const missionRewardsBonusesJointable = sequelize.define('mission_rewards_bonuses_jointable', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    mission_id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    reward_id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: true,
      validate: {
        customValidator() {
          if (this.reward_id === null && this.bonus_id === null)
            throw new Error('Reward or Bonus must be set')
        },
      },

    },
    bonus_id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: true,
      validate: {
        customValidator() {
          if (this.reward_id === null && this.bonus_id === null)
            throw new Error('Reward or Bonus must be set')
        },
      },

    },
  })
  // sequelize.sync({alter:true})
  return missionRewardsBonusesJointable
}
export default missionRewardsBonusesJointable
