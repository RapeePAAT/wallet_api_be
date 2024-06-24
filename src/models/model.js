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
    require: true,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    require: true,
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: true,
    require: false
  },
  tel: {
    type: DataTypes.STRING(10),
    allowNull: true,
    require: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: 'user',
    require: false
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true,
  },
  symbol: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true,
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },

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

const DigitalAsset = sequelize.define('digitalasset', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  cryptocurrency_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  balance: {
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
  tableName: 'digitalasset',
  timestamps: false
});

const ExchangeRate = sequelize.define('exchangerate', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  from_cryptocurrency_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cryptocurrency,
      key: 'id',
    }
  },
  to_cryptocurrency_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cryptocurrency,
      key: 'id',
    }
  },
  rate: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  update_at: {
    type: DataTypes.DATE
  }


}, { timestamps: false, tableName: "exchangerate" })

const Transaction = sequelize.define('Transaction', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  from_user_id: {
    type: DataTypes.INTEGER, allowNull: false, references: {
      model: User,
      key: 'id',
    }
  },
  to_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  },
  from_cryptocurrency_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cryptocurrency,
      key: 'id',
    }
  },
  to_cryptocurrency_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cryptocurrency,
      key: 'id',
    }
  },
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


// asset key
User.hasMany(DigitalAsset, { foreignKey: "user_id" })
DigitalAsset.belongsTo(User, { foreignKey: "user_id" })

Cryptocurrency.hasMany(DigitalAsset, { foreignKey: "cryptocurrency_id", onDelete: "CASCADE" })
DigitalAsset.belongsTo(Cryptocurrency, { foreignKey: "cryptocurrency_id" })

//exhchangerate
User.hasMany(ExchangeRate, { foreignKey: 'user_id' })
ExchangeRate.belongsTo(User, { foreignKey: "user_id" })

Cryptocurrency.hasMany(ExchangeRate, { foreignKey: 'from_cryptocurrency_id', as: 'FromCryptoRateId' });
Cryptocurrency.hasMany(ExchangeRate, { foreignKey: 'to_cryptocurrency_id', as: 'ToCryptoRateId' });

ExchangeRate.belongsTo(Cryptocurrency,{ foreignKey: 'from_cryptocurrency_id', as: 'FromCryptoRateId' });
ExchangeRate.belongsTo(Cryptocurrency,{ foreignKey: 'to_cryptocurrency_id', as: 'ToCryptoRateId' });


//transaction key
User.hasMany(Transaction, { foreignKey: "from_user_id" ,as:"FromUser", onDelete: 'CASCADE' });
User.hasMany(Transaction, { foreignKey: "to_user_id",as:"ToUser", onDelete: 'CASCADE' });
Cryptocurrency.hasMany(Transaction, { foreignKey: "from_cryptocurrency_id" , as:"FromCryptoId"});
Cryptocurrency.hasMany(Transaction, { foreignKey: "to_cryptocurrency_id" ,as:"ToCryptoID"});
Transaction.belongsTo(Cryptocurrency, { foreignKey: "from_cryptocurrency_id",as:"FromCryptoId" });
Transaction.belongsTo(Cryptocurrency, { foreignKey: "to_cryptocurrency_id" ,as:"ToCryptoId"});
Transaction.belongsTo(User, { foreignKey: "from_user_id" , as:"FromUser"});
Transaction.belongsTo(User, { foreignKey: "to_user_id",as:"ToUser" });

const Migrate = async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  await User.sync({force:true});
  await Cryptocurrency.sync({force:true});
  await Wallet.sync({force:true});
  await DigitalAsset.sync({force:true});
  await ExchangeRate.sync({force:true});
  await Transaction.sync({force:true});
};

module.exports = { User, Wallet, Cryptocurrency, DigitalAsset, ExchangeRate, Transaction,  Migrate };
