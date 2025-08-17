import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const hissedarBonusu = function () {
  const hissedarBonusu = sequelize.define('hissedarBonusu', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
    },
    this_months_money: {
      allowNull: false,
      type: Sequelize.DataTypes.FLOAT,
      defaultValue: 0,
    },
    last_months_money: {
      allowNull: false,
      type: Sequelize.DataTypes.FLOAT,
      defaultValue: 0,
    },

  }, { paranoid: true })
  return hissedarBonusu
}
export default hissedarBonusu
