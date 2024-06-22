"use strict";
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./dbConnect')

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  tel: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  delete_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'user',
  timestamps: false
});

const Cryptocurrency = sequelize.define("Cryptocurrency", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  user_id:{
    type:DataTypes.INTEGER , 
    allowNull:false
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  delete_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'cryptocurrency',
  timestamps: false
});

const Wallet = sequelize.define('Wallet', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cryptocurrency_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  update_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'wallet',
  timestamps: false
});

const Exchange = sequelize.define('Exchange', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  from_cryptocurrency_id: { type: DataTypes.INTEGER, allowNull: false },
  to_cryptocurrency_id: { type: DataTypes.INTEGER, allowNull: false },
  min_rate: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  },
  rate: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  update_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'exchange',
  timestamps: false
});

const Transaction = sequelize.define('Transaction', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  from_user_id: { type: DataTypes.INTEGER, allowNull: false },
  to_user_id: { type: DataTypes.INTEGER, allowNull: false },
  from_cryptocurrency_id: { type: DataTypes.INTEGER, allowNull: false },
  to_cryptocurrency_id: { type: DataTypes.INTEGER, allowNull: false },
  rate: {
    type: DataTypes.DECIMAL,
  },
  amount: {
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'transaction',
  timestamps: false
});

//Associations
User.hasMany(Wallet, { foreignKey: "user_id", onDelete: 'CASCADE' });
Wallet.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Cryptocurrency, { foreignKey: 'user_id' });
Cryptocurrency.belongsTo(User, { foreignKey: "user_id" });

Cryptocurrency.hasMany(Wallet, { foreignKey: "cryptocurrency_id" });
Wallet.belongsTo(Cryptocurrency, { foreignKey: "cryptocurrency_id" });


User.hasMany(Exchange, { foreignKey: "user_id" });
Exchange.belongsTo(User, { foreignKey: "user_id" });

Cryptocurrency.hasMany(Exchange, { foreignKey: "from_cryptocurrency_id" });
Cryptocurrency.hasMany(Exchange, { foreignKey: "to_cryptocurrency_id" });
Exchange.belongsTo(Cryptocurrency, { foreignKey: "from_cryptocurrency_id" });
Exchange.belongsTo(Cryptocurrency, { foreignKey: "to_cryptocurrency_id" });

User.hasMany(Transaction, { foreignKey: "from_user_id", onDelete: 'CASCADE' });
User.hasMany(Transaction, { foreignKey: "to_user_id", onDelete: 'CASCADE' });
Cryptocurrency.hasMany(Transaction, { foreignKey: "from_cryptocurrency_id" });
Cryptocurrency.hasMany(Transaction, { foreignKey: "to_cryptocurrency_id" });
Transaction.belongsTo(Cryptocurrency, { foreignKey: "from_cryptocurrency_id" });
Transaction.belongsTo(Cryptocurrency, { foreignKey: "to_cryptocurrency_id" });
Transaction.belongsTo(User, { foreignKey: "from_user_id" });
Transaction.belongsTo(User, { foreignKey: "to_user_id" });

const Migrate = async () => {
  await User.sync();
  await Cryptocurrency.sync();
  await Wallet.sync();
  
  await Exchange.sync();
  await Transaction.sync();
};

module.exports = { User, Wallet, Cryptocurrency,Exchange, Transaction,Migrate };
