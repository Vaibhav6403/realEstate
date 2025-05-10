module.exports = (sequelize, DataTypes) => {
  const AgentDetails = sequelize.define('AgentDetails', {
    jobTitle: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    agencyName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    contactInfo: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },

    userId: { // Foreign key to User model
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  // Refers to the Users table
        key: 'id',       // Refers to the Users table's 'id' column
      },
      onDelete: 'CASCADE',  // Deletes the agent details when the associated user is deleted
    }
  }, {
    tableName: 'AgentDetails',
    timestamps: true
  });

  // Define the relationship (a user has one AgentDetails)
  AgentDetails.belongsTo(sequelize.models.User, { foreignKey: 'userId' });

  return AgentDetails;
};
