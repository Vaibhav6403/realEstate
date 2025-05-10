// controllers/address.controller.js

const { Address } = require('../config/db');
const sequelize = require('sequelize')

// Create an address for a user
const createAddress = async (req, res) => {
  const { userId, street, city, state, postalCode, country } = req.body;

  try {
    const address = await sequelize.query(
  `INSERT INTO Addresses (userId, street, city, state, "postalCode", country, "createdAt", "updatedAt")
   VALUES (:userId, :street, :city, :state, :postalCode, :country, NOW(), NOW())`,
  {
    replacements: { userId, street, city, state, postalCode, country },
    type: sequelize.QueryTypes.INSERT
  }
);

    return res.status(201).json(address);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Edit an address for a user
const editAddress = async (req, res) => {
  const { id } = req.params;  // address ID from URL
  const { street, city, state, postalCode, country } = req.body;

  try {
    const address = await Address.findOne({ where: { id } });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.postalCode = postalCode || address.postalCode;
    address.country = country || address.country;

    await address.save();

    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete an address for a user
const deleteAddress = async (req, res) => {
  const { id } = req.params;  // address ID from URL

  try {
    const address = await Address.findOne({ where: { id } });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await address.destroy();

    return res.status(204).json({ message: 'Address deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createAddress, editAddress, deleteAddress };
