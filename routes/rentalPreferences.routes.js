// routes/rentalPreferences.routes.js

const express = require('express');
const { editRentalPreferences } = require('../controllers/rentalPreferences.controller');

const router = express.Router();

// PUT route to edit rental preferences
router.put('/:id', editRentalPreferences);

module.exports = router;
