import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const category = function () {
  const category = sequelize.define('category', {
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
    attributes: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    },
    // parent_id: {
    //   type: Sequelize.DataTypes.BIGINT,
    //   allowNull: true,
    //   defaultValue: null,
    // },

  })

  return category
}

export default category
