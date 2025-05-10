module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
      id: {  // Unique ID for each address
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: { type: DataTypes.STRING, allowNull: false }, // House, Apartment, Commercial
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: false },
      pincode: { type: DataTypes.STRING, allowNull: false },
      numberOfRooms: { type: DataTypes.INTEGER, allowNull: true },
      squareFootage: { type: DataTypes.FLOAT, allowNull: true },
      buildingType: { type: DataTypes.STRING, allowNull: true }, // Only for Apartment
      businessType: { type: DataTypes.STRING, allowNull: true }, // Only for Commercial
      price: { type: DataTypes.FLOAT, allowNull: false },
      availability: { type: DataTypes.BOOLEAN, defaultValue: true },
      userId: { type: DataTypes.INTEGER, allowNull: false }, // Creator ID
    }, {
      tableName: 'Properties',
      timestamps: true
    });
  
    return Property;
  };
  