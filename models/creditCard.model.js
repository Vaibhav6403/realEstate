module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define('CreditCard', {
    id: {  // Unique ID for each address
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cardNumber: { type: DataTypes.STRING, allowNull: false },
    expirationDate: { type: DataTypes.STRING, allowNull: false },    
    userId: { // Add this
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'CreditCards',
    timestamps: true
  });

  return CreditCard;
};
