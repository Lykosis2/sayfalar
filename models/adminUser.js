import Sequelize from 'sequelize'
import * as bcrypt from 'bcrypt'
import sequelize from '@/components/DatabaseReferance'

const AdminUser = function () {
  const AdminUser = sequelize.define('adminuser', {
    id: {
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.DataTypes.UUID,
    },
    superAdmin: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isName(value) {
          if (value.length < 2)
            throw new Error('Please enter a valid name')

          if (value === null)
            throw new Error('Please enter a valid name')

          if (value === undefined)
            throw new Error('Please enter a valid name')

          if (value > 20)
            throw new Error('Please enter a valid name')
        },
      },

    },
    surname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isSurname(value) {
          if (value.length < 2)
            throw new Error('Please enter a valid surname')

          if (value === null)
            throw new Error('Please enter a valid surname')

          if (value === undefined)
            throw new Error('Please enter a valid surname')

          if (value > 20)
            throw new Error('Please enter a valid surname')
        },
      },
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },

    },

    phoneNumber: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        // isPhoneNumber(value){
        //     if(value.length !== 11){
        //         throw new Error("Please enter a valid phone number")
        //     }
        //     if(value === null){
        //         throw new Error("Please enter a valid phone number")
        //     }
        //     if(value === undefined){
        //         throw new Error("Please enter a valid phone number")
        //     }

        // }
      },
    },

    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,

    },
    // 2FA
    twoFaSecret: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    is2FAEnabled: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },

  },
  {
    paranoid: true,
  })
  AdminUser.beforeCreate(hashPassword)
  AdminUser.beforeUpdate(hashPassword)
  return AdminUser
}

const hashPassword = async function (user, options) {
  if (user.changed('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  }
}

export default AdminUser
