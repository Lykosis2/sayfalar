import Sequelize from 'sequelize'
import * as bcrypt from 'bcrypt'
import Sponsors from './sponsors'
import saleAccount from './saleAccount'
import Invitation from './invitation'
import sequelize from '@/components/DatabaseReferance'
import changeSponsors from '@/lib/changeSponsors/changeSponsors'
import changeSirketSponsors from '@/lib/changeSponsors/changeSirketSponsors'
import locker from '@/lib/providers/locker'
import importantPanic from '../lib/errorHandle/importantPanic'
import checkAndSolveProblems from '../lib/errorHandle/CheckTree/checkAndSolveProblems'

const User = function () {
  const User = sequelize.define('user', {
    id: {
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.DataTypes.UUID,
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
    profilepicture: {
      type: Sequelize.DataTypes.STRING,
      //  default:""   Our default picture
      allowNull: true,
      defaultValue: 'https://next-ecommerce-lykosis.s3.eu-north-1.amazonaws.com/1682962475194.png',
      validate: {
        isPicture(value) {
          if (!value.endsWith('.png') && !value.endsWith('.jpg') && !value.endsWith('.jpeg'))
            throw new Error('Please enter a valid picture')

          if (value.length > 80)
            throw new Error('Please enter a valid picture')

          if (value.length < 70)
            throw new Error('Please enter a valid picture')

          if (value.length === null)
            throw new Error('Please enter a valid picture')

          if (value.length === undefined)
            throw new Error('Please enter a valid picture')

          if (!value.startsWith('https://next-ecommerce-lykosis.s3.eu-north-1.amazonaws.com'))
            throw new Error('Please enter a valid picture')
        },
      },

    },

    gender: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isGender(value) {
          if (value > 1 || value < 0)
            throw new Error('Please select a valid gender')

          if (value === null)
            throw new Error('Please select a valid gender')

          if (value === undefined)
            throw new Error('Please select a valid gender')
        },
      },
      get() {
        const rawValue = this.getDataValue('gender')
        if (rawValue === 0)
          return 'Erkek'

        if (rawValue === 1)
          return 'Kadın'
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

    age: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isAge(value) {
          if (value < 0)
            throw new Error('Please enter a valid age')

          if (value === null)
            throw new Error('Please enter a valid age')

          if (value === undefined)
            throw new Error('Please enter a valid age')

          if (value === 0)
            throw new Error('Please enter a valid age')
        },
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,

    },
    favorites: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        favorites: [],
      },
      validate: {
        isFavorites(value) {
          if (!value)
            throw new Error('Please enter a valid favorites')

          if (!Array.isArray(value.favorites))
            throw new Error('Please enter a valid favorites')

          if (value.favorites.length > 300)
            throw new Error('Too many favorites')

          for (let i = 0; i < value.favorites.length; i++) {
            const element = value.favorites[i]
            if (typeof element !== 'number')
              throw new Error('Please enter a valid favorites')
          }
        },
      },
    },
    addressData: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
      validate: {
        // isAddress(value) {
        //   console.log(value);
        //   if (!value)
        //     throw new Error('Please enter a valid address')

        //   // check for additional fields and check if fields defined and string:
        //   // address, city, country, postalCode, title
        //   const addressSchema = z.object({
        //     address: z.string(),
        //     isPersonal: z.boolean(),
        //     city: z.string(),
        //     district: z.string(),
        //     neighborhood: z.string(),
        //     postalCode: z.string(),
        //     title: z.string(),
        //     latitude: z.number().optional(),
        //     longitude: z.number().optional(),
        //   })

        //   const addressData = Object.values(value)

        //   if (addressData.length > 5)
        //     throw new Error('Too many addresses')

        //   for (let i = 0; i < addressData.length; i++) {
        //     console.log(addressData[i]);
        //     const address = addressData[i]
        //     console.log(address);
        //     const result = addressSchema.safeParse(address)
        //     if (!result.success)
        //       throw new Error('Please enter a valid address')
        //   }
        // },
      },
    },
   

    Preference: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        mail: true,
        sms: true,
      },
      validate: {
        isPreference(value) {
          if (!value)
            throw new Error('Please enter a valid preference')

          if (value.mail == null)
            throw new Error('Please enter a valid preference')

          if (value.sms == null)
            throw new Error('Please enter a valid preference')
        },
      },
    },
    PastOrders: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    },
    CurrentOrder: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    },
    tcNumber: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    sponsor: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 80562,
    },
    has_saleAccount: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
  })

  const SaleAccount = saleAccount()
  if(!SaleAccount){
    importantPanic("SaleAccount is not defined").then(()=>{
      return null
    })
  }
  const sponsors = Sponsors()
  if(!sponsors){
    importantPanic("Sponsors is not defined").then(()=>{
      return null
    }
    )
  }
  const invitation = Invitation()
  if(!invitation){
    importantPanic("Invitation is not defined").then(()=>{
      return null
    }
    )
  }
  
  User.beforeCreate(async (user, options) => {
    try{  
      const sponsorisvalid = await SaleAccount.findOne({ where: { referenceNumber: user.sponsor } })
      if (!sponsorisvalid) {
        user.setDataValue('sponsor', 80562)
      }
    }
    catch(err){
      // Logicly impossible if falls here that means there is a really big problem
      await importantPanic("User sponsor is not defined") 
    }
  },
  )

  // Hash the password and add lat long before create to the adresses and update it
  User.beforeCreate(hashPassword)
  User.beforeCreate(addLatLong)
  User.beforeUpdate(hashPassword)
  User.beforeUpdate(addLatLong)

  // TODO: Parse phone number to be always saved in the same format

  // SaleAccount creation
  User.beforeUpdate(async (user, options) => {
    try{
      if (user.changed('sponsor')) {
        console.log("MAFYA LOS POYOS HERMANOS")
        console.log("LEGACY OF LOS POYOS HERMANOS")
        console.log(user.sponsor);
        console.log("fix didnt happen")
        
        if (user.sponsor === '72729454' || user.sponsor === '86180486' || user.sponsor === '89960994') {
          await changeSirketSponsors(invitation, user.id, sponsors, user.sponsor,user,SaleAccount)
          return true
        }
        const sponsorisvalid = await SaleAccount.findOne({ where: { referenceNumber: user.sponsor } })
        console.log(sponsorisvalid)
        if (!sponsorisvalid) {
          const randomNumbers = ['72729454', '86180486', '89960994']
          const randomNumber = Math.floor(Math.random() * 3)
          user.sponsor = randomNumbers[randomNumber]
          user.changed('sponsor', true)
          await user.save().catch(err => console.log(err))
        }
        else {
          if(sponsorisvalid.id === "2582a601-956b-4076-a6b3-bd40e11df286") return
          const givenSponsor = await changeSponsors(invitation, user.id, sponsors, user.sponsor, SaleAccount,user) // null as the sponsorId
        }
      }
    }
    catch(err){
      await checkAndSolveProblems(user.id)
      await importantPanic("User sponsor is not defined")
    }
  })

  // Users account creation
  User.afterCreate(async (user, options) => {
    try{
      const levelValues = await determineLevels(User, user, SaleAccount)
      console.log(levelValues);
      if (!levelValues || !levelValues.level1 || levelValues.level2 === undefined || levelValues.level3 === undefined || levelValues.level4 === undefined || levelValues.level5 === undefined || levelValues.level6 === undefined){
        const usersSponsors = await sponsors.create({ owner_id: user.id, level1: '2582a601-956b-4076-a6b3-bd40e11df286', level2: null, level3: null, level4: null, level5: null, level6: null })
        await changeSaleAccountSponsors(SaleAccount,{level1: '2582a601-956b-4076-a6b3-bd40e11df286', level2: null, level3: null, level4: null, level5: null, level6: null } , user.id, invitation,sponsors,user,usersSponsors)
      }
      const usersSponsors = await sponsors.create({ owner_id: user.id, level1: levelValues.level1, level2: levelValues.level2, level3: levelValues.level3, level4: levelValues.level4, level5: levelValues.level5, level6: levelValues.level6 })
      await changeSaleAccountSponsors(SaleAccount, levelValues, user.id, invitation,sponsors,user,usersSponsors)
    }
    catch(err){
      console.log(err);
      await importantPanic("User id is not defined")
    }
  })

  return User
}

const hashPassword = async function (user, options) {
  try{
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      user.password = hashedPassword
    }
  }
    catch(err){
      const hashDefaultPassword = await bcrypt.hash('lykosislife:123', 10)
      user.password = hashDefaultPassword
      await informTheAdmin(err)
    }
}

const addLatLong = async function (user, options) {
  try{
    if (user.changed('addressData')) {
      await Promise.all(
        user.addressData.adresses.map(async (address) => {
          const latLong = await getLatLongFromAddress(address.address)
          address.latitude = latLong.latitude
          address.longitude = latLong.longitude
        }),
      )
    }
  }
  catch(err){
    // Default lat long is denizli on error
    await Promise.all(
      user.addressData.adresses.map(async (address) => {
        const latLong = { latitude: 37.783333, longitude: 29.094715}
        address.latitude = latLong.latitude
        address.longitude = latLong.longitude
      }),
    )
    await informTheAdmin(err)
  }
}

async function getLatLongFromAddress(address) {
  // Define the Nominatim API endpoint URL
  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`

  // Make a GET request to the Nominatim API
  ofetch(apiUrl)
    .then((data) => {
    // Check if the response contains any results
      if (data.length > 0) {
      // Extract the latitude and longitude from the first result
        const firstResult = data[0]
        const latitude = Number.parseFloat(firstResult.lat)
        const longitude = Number.parseFloat(firstResult.lon)

        return { latitude, longitude }
      }
      else {
        // Denizlis lat lng
        return { latitude: 37.783333, longitude: 29.094715 }
      }
    })
}

// REVIEW DONE NO PROBLEMS
const determineLevels = async function (user,userAccount,saleAccount) {
  const levelValues = {

  }  
  const firstSponsor = await saleAccount.findOne({where:{referenceNumber:userAccount?.sponsor}})
  if(!firstSponsor){
      await importantPanic('First sponsor not found','fixTree')
      return res.status(400).json({message:'User not found'})
  }
if(firstSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || firstSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || firstSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a" || firstSponsor.id === "2582a601-956b-4076-a6b3-bd40e11df286"){
  levelValues['level1'] = firstSponsor?.id 
  levelValues['level2'] = null
  levelValues['level3'] = null
  levelValues['level4'] = null
  levelValues['level5'] = null
  levelValues['level6'] = null
  return levelValues
}
levelValues['level1'] = firstSponsor?.id
const userAccountOfFirstSponsor = await user.findOne({where:{id:firstSponsor?.owner_id}})
const secondSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfFirstSponsor?.sponsor}})
if(!secondSponsor){
  levelValues['level2'] = null
  levelValues['level3'] = null
  levelValues['level4'] = null
  levelValues['level5'] = null
  levelValues['level6'] = null
  return levelValues
}
if(secondSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || secondSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || secondSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
  levelValues['level2'] = secondSponsor?.id
  levelValues['level3'] = null
  levelValues['level4'] = null
  levelValues['level5'] = null
  levelValues['level6'] = null
  return levelValues
}
levelValues['level2'] = secondSponsor?.id
const userAccountOfSecondSponsor = await user.findOne({where:{id:secondSponsor?.owner_id}})
const thirdSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfSecondSponsor?.sponsor}})
if(!thirdSponsor){
  levelValues['level3'] = null
  levelValues['level4'] = null
  levelValues['level5'] = null
  levelValues['level6'] = null
  return levelValues
}
if(thirdSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || thirdSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || thirdSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
  levelValues['level3'] = thirdSponsor?.id
  levelValues['level4'] = null
  levelValues['level5'] = null
  levelValues['level6'] = null
  return levelValues
}
levelValues['level3'] = thirdSponsor?.id
const userAccountOfThirdSponsor = await user.findOne({where:{id:thirdSponsor?.owner_id}})
const fourthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfThirdSponsor?.sponsor}})
if(!fourthSponsor){
  levelValues['level4'] = null
  levelValues['level5'] = null
  levelValues['level6'] = null
  return levelValues
}
if(fourthSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || fourthSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || fourthSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
  levelValues['level4'] = fourthSponsor?.id
  levelValues['level5'] = null
  levelValues['level6'] = null
  return levelValues
}
levelValues['level4'] = fourthSponsor?.id
const userAccountOfFourthSponsor = await user.findOne({where:{id:fourthSponsor?.owner_id}})
const fifthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfFourthSponsor?.sponsor}})
if(!fifthSponsor){
  levelValues['level5'] = null
  levelValues['level6'] = null
  return levelValues
}
if(fifthSponsor.id === "6456d13d-2ba0-4eff-b520-dfd2718b31d4" || fifthSponsor.id === "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac" || fifthSponsor.id ==="c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"){
  levelValues['level5'] = fifthSponsor?.id
  levelValues['level6'] = null
  return levelValues
}
levelValues['level5'] = fifthSponsor?.id
const userAccountOfFifthSponsor = await user.findOne({where:{id:fifthSponsor?.owner_id}})
const sixthSponsor = await saleAccount.findOne({where:{referenceNumber:userAccountOfFifthSponsor?.sponsor}})
if(!sixthSponsor){
  levelValues['level6'] = null
  return levelValues
}
levelValues['level6'] = sixthSponsor?.id

let validLevels = [];
let isValid = true;
     for (let i = 6; i >= 1; i--) {
          const levelKey = `level${i}`;
          const levelValue = levelValues[levelKey];
          
            if (levelValue !== null) {
              for (let j = i - 1; j >= 1; j--) {
                const lowerLevelKey = `level${j}`;
                const lowerLevelValue = levelValues[lowerLevelKey];
          
                if (lowerLevelValue === null) {
                  isValid = false;
                  break;
                }
              }
              if (isValid) {
                validLevels.unshift(levelValue);
              }
            }
          }
        if(!isValid) {
          await importantPanic("isValid is false")
            return false
        }
        if(validLevels.length <= 0 ) {
            importantPanic("validLevels.length is 0")
            return false
        }

        const sirketHesaplari = [
            "6456d13d-2ba0-4eff-b520-dfd2718b31d4",
            "c0470e22-3f7d-4fd4-8b53-bfc6641c15ac",
            "c6e7e8c3-9527-41a0-b2ce-6e91708ffb0a"
          ];

        const startIndex = validLevels.findIndex(element => sirketHesaplari.includes(element));
        if (startIndex !== -1 && startIndex < validLevels.length - 1) {
            const elementsAfter = validLevels.slice(startIndex + 1).reduce((acc, element, index) => {
              acc[`level${startIndex + 2 + index}`] = element;
              return acc;
            }, {});
           if(Object.keys(elementsAfter).length > 0){
            await checkAndSolveProblems(userAccount.id)
           }
        }
return levelValues
}

// Last test will be done in Saturday if needed add .changed(true) here
const changeSaleAccountSponsors = async function (saleAccount, levelValues, owner_id, invitation,sponsors,usersAccount,usersSponsors) {
  try{
    const returnVal = {}
      const thissaleAccount = await saleAccount.findOne({ where: { id: levelValues.level1 } })
      if(!thissaleAccount){
        await checkAndSolveProblems(owner_id)
        return {}
      }
      thissaleAccount.registered_user += 1
      const level1 = await invitation.findOne({ where: { sale_account_id: thissaleAccount.id } })
      level1.invitation_level1 = { ...level1.invitation_level1, [owner_id]: 'Beginner' } 
      level1.unassigned_tree_positions = { ...level1.unassigned_tree_positions, [owner_id]: { title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
      returnVal.level1 = { sponsor: level1.id, owner_id, title: 0, level: 1, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
      await locker.lockAndWait(`invitation-${level1.sale_account_id}`, 30 * 1000)
      await level1.save()
      await locker.unlock(`invitation-${level1.sale_account_id}`)
      await locker.lockAndWait(`saleAccount-${levelValues.level1}`, 30 * 1000)
      await thissaleAccount.save()
      await locker.unlock(`saleAccount-${levelValues.level1}`)
      await locker.flag(levelValues.level1)
    if (levelValues.level2) {
      const thissaleAccount = await saleAccount.findOne({ where: { id: levelValues.level2 } })
      if(!thissaleAccount){
        await checkAndSolveProblems(owner_id)
        return {}
      }
      thissaleAccount.registered_user += 1
      const level2 = await invitation.findOne({ where: { sale_account_id: thissaleAccount.id } })
      level2.invitation_level2 = { ...level2.invitation_level2, [owner_id]: 'Beginner' } // Todo revise this part
      level2.unassigned_tree_positions = { ...level2.unassigned_tree_positions, [owner_id]: { title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
      returnVal.level2 = { sponspor: level2.id, owner_id, title: 0, level: 2, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
      await locker.lockAndWait(`invitation-${level2.sale_account_id}`, 30 * 1000)
      await level2.save()
      await locker.unlock(`invitation-${level2.sale_account_id}`)
      await locker.lockAndWait(`saleAccount-${levelValues.level2}`, 30 * 1000)
      await thissaleAccount.save()
      await locker.unlock(`saleAccount-${levelValues.level2}`)
      await locker.flag(levelValues.level2)
    }
    if (levelValues.level3) {
      const thissaleAccount = await saleAccount.findOne({ where: { id: levelValues.level3 } })
      if(!thissaleAccount){
        await checkAndSolveProblems(owner_id)
        return {}
      }
      thissaleAccount.registered_user += 1
      const level3 = await invitation.findOne({ where: { sale_account_id: thissaleAccount.id } })
      level3.invitation_level3 = { ...level3.invitation_level3, [owner_id]: 'Beginner' }
      level3.unassigned_tree_positions = { ...level3.unassigned_tree_positions, [owner_id]: { title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
      returnVal.level3 = { sponsor: level3.id, owner_id, title: 0, level: 3, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
      await locker.lockAndWait(`invitation-${level3.sale_account_id}`, 30 * 1000)
      await level3.save()
      await locker.unlock(`invitation-${level3.sale_account_id}`)
      await locker.lockAndWait(`saleAccount-${levelValues.level3}`, 30 * 1000)
      await thissaleAccount.save()
      await locker.unlock(`saleAccount-${levelValues.level3}`)
      await locker.flag(levelValues.level3)
    }
    if (levelValues.level4) {
      const thissaleAccount = await saleAccount.findOne({ where: { id: levelValues.level4 } })
      if(!thissaleAccount){
        await checkAndSolveProblems(owner_id)
        return {}
      }
      thissaleAccount.registered_user += 1
      const level4 = await invitation.findOne({ where: { sale_account_id: thissaleAccount.id } })
      level4.invitation_level4 = { ...level4.invitation_level4, [owner_id]: 'Beginner' }
      level4.unassigned_tree_positions = { ...level4.unassigned_tree_positions, [owner_id]: { title: 0, level: 4, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
      returnVal.level4 = { sponsor: thissaleAccount.id, owner_id, title: 0, level: 4, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
      await locker.lockAndWait(`invitation-${level4.sale_account_id}`, 30 * 1000)
      await level4.save()
      await locker.unlock(`invitation-${level4.sale_account_id}`)
      await locker.lockAndWait(`saleAccount-${levelValues.level4}`, 30 * 1000)
      await thissaleAccount.save()
      await locker.unlock(`saleAccount-${levelValues.level4}`)
      await locker.flag(levelValues.level4)
    }
    if (levelValues.level5) {
      const thissaleAccount = await saleAccount.findOne({ where: { id: levelValues.level5 } })
      if(!thissaleAccount){
        await checkAndSolveProblems(owner_id)
        return {}
      }
      thissaleAccount.registered_user += 1
      const level5 = await invitation.findOne({ where: { sale_account_id: thissaleAccount.id } })
      await locker.lockAndWait(`invitation-${level5.id}`, 30 * 1000)
      level5.invitation_level5 = { ...level5.invitation_level5, [owner_id]: 'Beginner' }
      level5.unassigned_tree_positions = { ...level5.unassigned_tree_positions, [owner_id]: { title: 0, level: 5, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
      returnVal.level5 = { sponsor: thissaleAccount.id, owner_id, title: 0, level: 5, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
      await locker.lockAndWait(`invitation-${level5.sale_account_id}`, 30 * 1000)
      await level5.save()
      await locker.unlock(`invitation-${level5.sale_account_id}`)
      await locker.lockAndWait(`saleAccount-${levelValues.level5}`, 30 * 1000)
      await thissaleAccount.save()
      await locker.unlock(`saleAccount-${levelValues.level5}`)
      await locker.flag(levelValues.level5)
    }
    if (levelValues.level6) {
      const thissaleAccount = await saleAccount.findOne({ where: { id: levelValues.level6 } })
      if(!thissaleAccount){
        await checkAndSolveProblems(owner_id)
        return {}
      }
      thissaleAccount.registered_user += 1
      const level6 = await invitation.findOne({ where: { sale_account_id: thissaleAccount.id } })
      await locker.lockAndWait(`invitation-${level6.id}`, 30 * 1000)
      level6.invitation_level6 = { ...level6.invitation_level6, [owner_id]: 'Beginner' }
      level6.unassigned_tree_positions = { ...level6.unassigned_tree_positions, [owner_id]: { title: 0, level: 6, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 } }
      returnVal[level6] = { sponsor: thissaleAccount.id, owner_id, title: 0, level: 6, has_saleAccount: false, saleAccount_id: null, changeable: true, position: null, point1: 0, balance: 0 }
      await locker.lockAndWait(`invitation-${level6.sale_account_id}`, 30 * 1000)
      await level6.save()
      await locker.unlock(`invitation-${level6.sale_account_id}`)
      await locker.lockAndWait(`saleAccount-${levelValues.level6}`, 30 * 1000)
      await thissaleAccount.save()
      await locker.unlock(`saleAccount-${levelValues.level6}`)
      await locker.flag(levelValues.level6)
    }
    return returnVal
  }
  catch(err){
    await checkAndSolveProblems(owner_id)
    return {}
  }
}

export default User

// return User.create({name:"Cagan",surname:"Parlapan",profilePicture:"https://next-ecommerce-lykosis.s3.eu-north-1.amazonaws.com/1682962475194.png",gender:0,email:"caganparlapan@gmail.com",phoneNumber:12345678910,tcNumber:14582444114,age:20,password:"12345678",Preference:"Preference",balance:0,comments:["comment1","comment2"]})
// .then((user)=>{
//     console.log(user.toJSON())
// }
// )
// .catch((err)=>console.log(err));

/*

*/
