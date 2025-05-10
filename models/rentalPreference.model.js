module.exports = (sequelize, DataTypes) => {
  const RentalPreferences = sequelize.define('RentalPreferences', {
    desiredMoveInDate: { type: DataTypes.DATE, allowNull: false },
    preferredLocation: { type: DataTypes.INTEGER, allowNull: false },
    budget: { type: DataTypes.FLOAT, allowNull: false },

    userId: { // Add this
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'RentalPreferences',
    timestamps: true
  });

  return RentalPreferences;
};
