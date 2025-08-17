import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const product = function () {
  const product = sequelize.define('product', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    // 1 for sale account
    special: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    stock: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    point1: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    point2: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    point3: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    barcodeNo: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    stars: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,

    },
    popularity: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    gender: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    size: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ages: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
      defaultValue: { lowerAge: 0, upperAge: 65 }, // { ages: [] }
    },
    // category: {
    //   type: Sequelize.DataTypes.JSON,
    //   allowNull: true,
    //   defaultValue: {},
    // },
    attributes: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
    comments: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },

  }
  , { paranoid: true },
  )

  return product
}

export default product
