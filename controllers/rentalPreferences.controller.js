// controllers/rentalPreferences.controller.js

const { RentalPreferences } = require('../config/db');

// Edit rental preferences for a user
const editRentalPreferences = async (req, res) => {
    console.log(req.body)
  const { id } = req.params;  // rental preferences ID from URL
  const { desiredMoveInDate, preferredLocation, budget } = req.body;
  try {
    // Find rental preferences by userId (from JWT) and id
    const rentalPreferences = await RentalPreferences.findOne({
      where: {  userId: id }  // Ensure the preferences belong to the authenticated user
    });

    if (!rentalPreferences) {
      return res.status(404).json({ error: 'Rental preferences not found ' });
    }

    // Update the rental preferences
    rentalPreferences.desiredMoveInDate = desiredMoveInDate || rentalPreferences.desiredMoveInDate;
    rentalPreferences.preferredLocation = preferredLocation || rentalPreferences.preferredLocation;
    rentalPreferences.budget = budget || rentalPreferences.budget;

    await rentalPreferences.save();

    return res.status(200).json(rentalPreferences);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { editRentalPreferences };
