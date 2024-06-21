"use strict";
const {Sequelize , DataTypes} = require('sequelize');

const sequelize = require('./dbConnect')

const User = sequelize.define('User',{
    id:{
        allowNull:false , 
        primaryKey :true , 
        autoIncrement:true , 
        type:DataTypes.INTEGER
      },
      username:{
        type:DataTypes.STRING(60), 
        allowNull:false, 

      },
      password :{
        type :DataTypes.STRING(60),
        allowNull:false,

      }, 
      email :{
        type:DataTypes.STRING(60),
        allowNull:false 
      }, 
      tel:{
        type:DataTypes.STRING(10),
        allowNull:true
      }
},{
    tableName:'User',
    timestamps:false
})

const Crytocurrentcy = sequelize.define("Crytocurrentcy",{
  id:{
    primaryKey:true , 
    allowNull:false , 
    autoIncrement :true , 
    type:DataTypes.INTEGER , 
  }, 
  name:{
    type :DataTypes.STRING(60),
    allowNull:false , 

  },
  Symbol:{
    type :DataTypes.STRING(60) , 
    allowNull:false , 
  }

})
User.hasMany(Crytocurrentcy , {})

module.exports = {User , sequelize}