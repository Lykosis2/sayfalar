import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2'; // Needed to fix sequelize issues with WebPack

//  const sequelize = new Sequelize('prismatry', 'root', 'cagan6185', {
//    host: 'localhost',
//    dialect: 'mysql',
//    logging: false,
//    port: 3310,
//  })

//  export default sequelize

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: false,
  dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Set this to true if you want to enforce SSL certificate validation
    }, // Enable SSL/TLS
  },
})

export default sequelize
