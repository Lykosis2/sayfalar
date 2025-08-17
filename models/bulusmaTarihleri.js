import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const bulusmaTarihi = function () {
  const bulusmaTarihi = sequelize.define('bulusmaTarihi', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
    },
    time: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
    },
    link: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
    title: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
  }, { paranoid: true })
  return bulusmaTarihi
}
export default bulusmaTarihi
