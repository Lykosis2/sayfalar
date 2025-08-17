import Sequelize from 'sequelize'
import { z } from 'zod'
import Sponsors from './sponsors'
import saleAccount from './saleAccount'
import product from './product'
import sequelize from '@/components/DatabaseReferance'

const order = async function () {
  const order = sequelize.define('order', {
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
    surname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,

    },
    is_saleAccount: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    saleAccount_id: {

      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      validator: {
        validateSaleAccountID(value) {
          if (this.is_saleAccount && value === null)
            throw new Error('saleAccount_id cannot be null when is_saleAccount is true')
        },
      },
    },
    owner_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
    iban: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      validate: {
        isIBAN(value) {
          if (!value)
            return
          if (typeof value !== 'string')
            throw new Error('IBAN must be string')
          // TR330006100519786457841326 valid
          // TR33 0006 1005 1978 6457 8413 26 valid
          if (!/TR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?/.test(value))
            throw new Error('IBAN is not valid')
        },
      },
    },
    sponsorChangeId: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    products: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      validate: {
        isProductsAndKv(value) {
          if (!value)
            throw new Error('Please enter a valid products')

          // check for additional fields and check if fields defined and string:
          // address, city, country, postalCode, title
          const productsSchema = z.record(z.object({
            count: z.number(),
            size: z.number().optional(),
            special: z.number().optional(),
            price: z.number().optional(),
            point1: z.number().optional(),
          }))

          const result = productsSchema.safeParse(value)
          if (!result.success)
            throw new Error('Please enter a valid products')
        },
      },
    },
    arrivedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    usedCargoFirm: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,

    },
    followNumber: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    price: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    paymentMethod: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    addressData: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      validate: {
        isAddress(value) {
          console.log(value)
          if (!value)
            throw new Error('Please enter a valid address')

          // check for additional fields and check if fields defined and string:
          // address, city, country, postalCode, title
          const addressSchema = z.object({
            address: z.string(),
            city: z.string(),
            district: z.string(),
            neighborhood: z.string().optional(), // TODO: remove optional??
            postalCode: z.string(),
            title: z.string().optional(), // TODO: remove optional??
          })

          const result = addressSchema.safeParse(value)
          if (!result.success)
            throw new Error('Please enter a valid address')
        },
      },
    },
    timeSpan: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    randomString: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

  }, {
    paranoid: true,
  })

  // sequelize.sync({ alter: true }).catch((e) => console.log(e))

  const SaleAccount = saleAccount()

  const sponsors = Sponsors()

  const Product = product()

  return order
}
export default order
