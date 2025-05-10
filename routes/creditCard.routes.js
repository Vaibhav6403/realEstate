const express = require('express');
const creditCardController = require('../controllers/creditCard.controller');

const router = express.Router();
// Add new credit card
router.post('/', creditCardController.addCreditCard);

// Edit existing credit card
router.put('/:userId', creditCardController.editCreditCard);

// Delete credit card
router.delete('/:userId', creditCardController.deleteCreditCard);

module.exports = router;
