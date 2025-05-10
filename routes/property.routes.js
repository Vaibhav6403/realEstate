const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.controller');


router.post('/', propertyController.createProperty);
router.put('/:id', propertyController.editProperty);
router.delete('/:id', propertyController.deleteProperty);
router.get('/:id', propertyController.getPropertyById);
router.get('/', propertyController.listProperties);
router.get('/user/:userId', propertyController.getPropertiesByUser);

module.exports = router;
