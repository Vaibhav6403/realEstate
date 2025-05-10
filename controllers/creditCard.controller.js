const { CreditCard } = require('../config/db');

// Create a new credit card
const addCreditCard = async (req, res) => {
  
  const {  userId, cardNumber, expirationDate } = req.body;

  try {
    const creditCard = await CreditCard.create({
      userId,
      cardNumber,
      expirationDate,
    });

    return res.status(201).json({ message: 'Credit card added successfully', creditCard });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Edit an existing credit card
const editCreditCard = async (req, res) => {
  const { userId } = req.params;
  const { cardNumber, expirationDate, id } = req.body;

  try {
    const creditCard = await CreditCard.findOne({ where: { id, userId } });

    if (!creditCard) {
      return res.status(404).json({ error: 'Credit card not found or unauthorized' });
    }

    // Update fields if provided
    creditCard.cardNumber = cardNumber || creditCard.cardNumber;
    creditCard.expirationDate = expirationDate || creditCard.expirationDate;
  

    await creditCard.save();

    return res.status(200).json({ message: 'Credit card updated successfully', creditCard });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a credit card
const deleteCreditCard = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const creditCard = await CreditCard.findOne({ where: { id, userId } });

    if (!creditCard) {
      return res.status(404).json({ error: 'Credit card not found or unauthorized' });
    }

    await creditCard.destroy();

    return res.status(204).json({ message: 'Credit card deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCreditCard,
  editCreditCard,
  deleteCreditCard
};
