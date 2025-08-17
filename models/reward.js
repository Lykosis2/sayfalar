import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const reward = function () {
  const reward = sequelize.define('reward', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,

    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },

    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

  })
  return reward
}
export default reward
