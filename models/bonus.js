import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const bonus = function () {
  const bonus = sequelize.define('bonus', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
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
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    // END CONDITION
    // nullable

  })

  return bonus
}
export default bonus
