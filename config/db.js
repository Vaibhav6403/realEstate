const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('real_estate_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

// Import models and instantiate with sequelize
const User = require('../models/user.model')(sequelize, DataTypes);
const AgentDetails = require('../models/agent.model')(sequelize, DataTypes);
const CreditCard = require('../models/creditCard.model')(sequelize, DataTypes);
const Address = require('../models/address.model')(sequelize, DataTypes);
const RentalPreferences = require('../models/rentalPreference.model')(sequelize, DataTypes);
const Property = require('../models/Property.model')(sequelize, DataTypes);
const Booking = require('../models/booking.model')(sequelize, DataTypes);

// Define associations
User.hasMany(Address, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(CreditCard, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(RentalPreferences, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(AgentDetails, { foreignKey: 'userId', onDelete: 'CASCADE' });
Property.hasMany(Booking, { foreignKey: 'propertyId' });
Booking.belongsTo(Property, { foreignKey: 'propertyId' });
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(CreditCard, { foreignKey: 'creditCardId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Property, { foreignKey: 'propertyId' });

// Test the connection to the database
const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Sync Sequelize models with database (creates tables if not exist)
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false });  // Use `force: true` for reset (dev only)
    console.log('✅ Models synchronized with the database!');
  } catch (error) {
    console.error('❌ Error syncing models:', error);
  }
};

// Export the sequelize instance and the functions
module.exports = {
  sequelize,
  authenticateDatabase,
  syncModels,
  User,
  Address,
  AgentDetails,
  CreditCard,
  RentalPreferences,
  Property,
  Booking
};
