const express = require('express');
const router = express.Router();
const { registerUser, loginUser, editUser } = require('../controllers/user.controller');
const addressRoutes =  require('./address.routes');
const rentalPreferences =  require('./rentalPreferences.routes');
const creditCard =  require('./creditCard.routes');
const property =  require('./property.routes');
const booking = require('./booking.routes');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/edit/:userId',editUser)
router.use('/address', addressRoutes); 
router.use('/rentalPreferences', rentalPreferences); 
router.use('/credit', creditCard);
router.use('/property', property);
router.use('/booking',booking);


module.exports = router;
