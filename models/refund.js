import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const refund = function () {
  const refund = sequelize.define('refund', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    order_id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
    sale_account_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },
    products: {
      type: Sequelize.DataTypes.JSON, // CHANGED FROM BIGINT
      allowNull: false,
      defaultValue: 0,
    },
    active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    price: {
      type: Sequelize.DataTypes.FLOAT, // CHANGED FROM BIGINT
      allowNull: false,
      defaultValue: 0,
    },
    point1: {
      type: Sequelize.DataTypes.FLOAT, // CHANGED FROM BIGINT
      allowNull: false,
      defaultValue: 0,

    },
  })
  return refund
}

export default refund
