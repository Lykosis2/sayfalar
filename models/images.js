import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const images = function () {
  const images = sequelize.define('image', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    type: {
      allowNull: false,
      unique: true,
      type: Sequelize.DataTypes.STRING,
    },
    link: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
  })

  return images
}

export default images
