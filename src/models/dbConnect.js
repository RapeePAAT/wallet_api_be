const {Sequelize , DataTypes} = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect:process.env.DATABASE_TYPE ,
    port:process.env.DATABASE_PORT,
    operatorAlias:false,
    logging:false
  });





module.exports = sequelize

