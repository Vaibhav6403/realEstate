const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');


router.post('/', bookingController.createBooking);


router.get('/user/:userId', bookingController.getBookingsByUser);


router.get('/agent/:agentId', bookingController.getBookingsByAgent);


router.delete('/:id', bookingController.cancelBooking);

module.exports = router;
