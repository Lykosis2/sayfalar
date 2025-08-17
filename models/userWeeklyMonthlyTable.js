import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const userWeeklyMonthlyTable = function () {
  const userWeeklyMonthlyTable = sequelize.define('user_weekly_monthly_table', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
    saleAccount_id: {
      type: Sequelize.DataTypes.UUID,
    },
    self_tree_positions: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    self_gained_point1: {
      type: Sequelize.DataTypes.FLOAT, // CHANGED FROM BIGINT
      allowNull: false,
      defaultValue: 0,
    },
    active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    real_point1: {
      type: Sequelize.DataTypes.FLOAT, // CHANGED FROM BIGINT
      allowNull: false,
      defaultValue: 0,

    },
    title: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },

  })
  return userWeeklyMonthlyTable
}

export default userWeeklyMonthlyTable
