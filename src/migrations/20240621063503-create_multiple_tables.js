'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('User',{
      id:{
        allowNull:false , 
        primaryKey :true , 
        autoIncrement:true , 
        type:Sequelize.INTEGER
      },
      username:{
        type:Sequelize.STRING(60), 
        allowNull:false, 

      },
      password :{
        type :Sequelize.STRING(60),
        allowNull:false,

      }, 
      email :{
        type:Sequelize.STRING(60),
        allowNull:false 
      }, 
      tel:{
        type:Sequelize.STRING(10),
        allowNull:true
      }

    })

    // await queryInterface.createTable("Role",{
    //  id:{
    //   autoIncrement:true , 
    //   primaryKey:true , 
    //   allowNull:false ,
    //   type:Sequelize.INTEGER 
    //  },
    //  name:{
    //   type :Sequelize.STRING(60), 
    //   allowNull:false ,
    //  },
    //  description:{
    //   type :Sequelize.STRING(150) , 
    //   allowNull:true ,
    //  }
     
    // })

    await queryInterface.createTable("Crytocurrentcy",{
      id:{
        autoIncrement:true , 
        primaryKey:true , 
        allowNull:false ,
        type:Sequelize.INTEGER 
       },
       user_id :{
          type:Sequelize.INTEGER , 
          references:{
            model:'User', 
            key:'id'
          },
          allowNull:false,
          onUpdate:"CASCADE", 
          onDelete:'CASCADE',
       },
       name:{
        type :Sequelize.STRING(60), 
        allowNull:false ,
       },
       symbol:{
        type :Sequelize.STRING(60), 
        allowNull:false ,
       }
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('User');
    await queryInterface.dropTable('Crytocurrentcy');

  }
};
