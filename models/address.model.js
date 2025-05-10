// models/address.model.js

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: {  // Unique ID for each address
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    street: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },

    userId: { // Foreign key to User model
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Refers to the Users table
        key: 'id', // Refers to the Users table's 'id' column
      },
      onDelete: 'CASCADE',  // Deletes all addresses when a user is deleted
    }
  }, {
    tableName: 'Addresses',
    timestamps: true,
  });

  return Address;
};
