import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const comment = function () {
  const comment = sequelize.define('comment', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    owner_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    product_id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    content: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,

    },
    stars: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 5,
    },
    allowed: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  }, { paranoid: true })

  return comment
}
export default comment
