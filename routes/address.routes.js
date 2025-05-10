// routes/address.routes.js
const express = require('express');
const { createAddress, editAddress, deleteAddress } = require('../controllers/address.controller');

const router = express.Router();


router.post('/', createAddress);
router.put('/:id', editAddress);
router.delete('/:id', deleteAddress);
module.exports = router;
