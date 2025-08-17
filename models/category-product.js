import Sequelize from 'sequelize'
import sequelize from '@/components/DatabaseReferance'

const categoryProduct = function () {
  const categoryProduct = sequelize.define('category_product', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    category_id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
  })
  
  return categoryProduct
}
export default categoryProduct
