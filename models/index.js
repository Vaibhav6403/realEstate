// models/index.js

const User = require('./user.model');
const AgentDetails = require('./agent.model');
const CreditCard = require('./creditCard.model');
const Address = require('./address.model');
const RentalPreferences = require('./rentalPreference.model');

// Define associations here
User.hasMany(Address, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(CreditCard, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(RentalPreferences, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(AgentDetails, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = { User, Address, CreditCard, RentalPreferences, AgentDetails };
