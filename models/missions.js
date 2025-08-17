import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const mission = function () {
  const mission = sequelize.define('mission', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.DataTypes.BIGINT,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },

    conditions: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
    },

    expireDate: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
  })
  return mission
}
export default mission
