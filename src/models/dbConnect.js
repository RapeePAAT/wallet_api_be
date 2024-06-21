const {Sequelize , DataTypes} = require('sequelize');

const sequelize = new Sequelize ('test9', 'postgres', '63043623', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize

