import { Sequelize } from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const Sponsors = function () {
  const Sponsors = sequelize.define('sponsors', {

    id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    owner_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    level1: {
      type: Sequelize.DataTypes.UUID,

    },
    level2: {
      type: Sequelize.DataTypes.UUID,

    },
    level3: {
      type: Sequelize.DataTypes.UUID,
    },
    level4: {
      type: Sequelize.DataTypes.UUID,
    },
    level5: {
      type: Sequelize.DataTypes.UUID,
    },
    level6: {
      type: Sequelize.DataTypes.UUID,
    },

  })
  return Sponsors
}

export default Sponsors
